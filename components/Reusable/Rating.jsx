import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WidthSpacer from "./WidthSpacer";
import ReusableText from "./ReusableText";
import { SIZES } from "../../constants/theme";

const Rating = ({ rating }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,
      }}
    >
      <MaterialCommunityIcons name="star" size={20} color={"#FD9942"} />

      <ReusableText
        text={"4.5 (783 reviews)"}
        family={"regular"}
        size={SIZES.regular}
        color={"gray"}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
