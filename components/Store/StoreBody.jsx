import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import NetworkImage from "../Reusable/NetworkImage";
import ReusableText from "../Reusable/ReusableText";

const StoreBody = () => {
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        marginHorizontal: 12,
        marginTop: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <NetworkImage
            source={
              "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRyZXNzfGVufDB8fDB8fHww"
            }
            width={80}
            height={80}
            radius={99}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <ReusableText
            text={678798}
            family={"bold"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Posts"}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <ReusableText
            text={6778}
            family={"bold"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"Followers"}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <ReusableText
            text={657}
            family={"bold"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <ReusableText
            text={"wallet"}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.black}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push(`/(add product)/add`)}
        style={{
          position: "absolute",
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          bottom: 40,
          right: 12,
        }}
      >
        <Ionicons name={"add-outline"} size={36} />
      </TouchableOpacity>
    </View>
  );
};

export default StoreBody;

const styles = StyleSheet.create({});
