import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { COLORS, SIZES } from "../../constants/theme";
import DescriptionText from "../Reusable/DescriptionText";
import HeightSpacer from "../Reusable/HeightSpacer";
import ReusableText from "../Reusable/ReusableText";
import useHeaderCategory from "../../context/useHeaderCategory";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Sheet = ({ listings }) => {
  const snapPoints = useMemo(
    () => ["8%", SIZES.height > 700 ? "85%" : "80%"],
    []
  );

  const listRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const selectedItems = useHeaderCategory((state) => state.selectedItems);

  const renderRow = ({ item }) => (
    <View style={{ marginTop: 25, gap: 5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: item.xl_picture_url }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 99,
              }}
              backgroundColor={COLORS.gray}
            />

            <View
              style={{
                position: "absolute",
                height: 18,
                width: 18,
                backgroundColor: "#55c718",
                borderColor: "white",
                borderRadius: 99,
                borderWidth: 3,
                right: 0,
                top: -4,
              }}
            />
          </View>

          <View style={{ gap: 5 }}>
            <ReusableText
              text={item.host_name}
              family={"medium"}
              size={SIZES.medium}
              color={COLORS.black}
            />
            <ReusableText
              text={`${item.picture_url.width}m walkaway from you`}
              family={"regular"}
              size={SIZES.regular}
              color={"gray"}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-outline" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push(`listings/${item._id}`)}
        style={{ position: "relative" }}
      >
        <Image
          source={{ uri: item.xl_picture_url }}
          style={{
            width: "100%",
            height: SIZES.height / 2.6,
          }}
          backgroundColor={COLORS.gray}
        />

        {item.multi ? (
          <View
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "white",
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Ionicons name="copy-outline" size={24} />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );

  const showMap = () => {
    bottomSheetRef.current?.collapse();
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      style={{ borderRadius: 0 }}
      handleIndicatorStyle={{ backgroundColor: COLORS.gray }}
      index={1}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <BottomSheetFlatList
          ref={listRef}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReusableText
                text={selectedItems.title}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.black}
              />
            </View>
          )}
          data={listings}
          style={styles.card}
          renderItem={renderRow}
        />

        <View style={styles.absoluteBtn}>
          <TouchableOpacity style={styles.btn} onPress={showMap}>
            <ReusableText
              text={"Map"}
              family={"medium"}
              size={SIZES.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },

  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: COLORS.black,
    padding: 16,
    paddingHorizontal: 26,
    borderRadius: 5,
  },
});

export default Sheet;
