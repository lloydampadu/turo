import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import ReusableText from "../Reusable/ReusableText.jsx";

import { SIZES, COLORS, SHADOWS } from "../../constants/theme.js";
import { EvilIcons } from "@expo/vector-icons";
import uidata from "../../constants/uidata.js";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const HomeListItem = ({ item, onPress1 }) => {
  const renderItem = ({ item }) => (
    <Pressable
      key={item._id}
      // onPress={() => navigation.navigate("product-nav", item)}
      onPress={() => router.push(`listings/${item._id}`)}
      style={{ marginHorizontal: 2 }}
    >
      <Image
        source={{ uri: item.medium_url }}
        style={styles.image}
        backgroundColor={COLORS.gray}
      />
    </Pressable>
  );

  console.log("item", item);
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
          // onPress={() => navigation.navigate("user-details", { item })}
        >
          <Image
            source={{ uri: item.logoUrl }}
            style={{
              width: 30,
              aspectRatio: 1,
              borderRadius: 99,
            }}
          />

          <ReusableText
            text={item.title}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 30,
            borderRadius: 99,
            aspectRatio: 1,
            opacity: 0.3,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPress1}
        >
          <EvilIcons name="close" color={"black"} size={29} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={uidata.productListings}
        // maxToRenderPerBatch={5}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeListItem;

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: SIZES.width > 700 ? 180 : 130,
    backgroundColor: "white",
    left: SIZES.width > 700 ? 30 : 10,
    right: SIZES.width > 700 ? 30 : 10,
    borderRadius: SIZES.xSmall - 5,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  image: {
    width: SIZES.width > 700 ? 200 : 130,
    aspectRatio: 1,
  },
});
