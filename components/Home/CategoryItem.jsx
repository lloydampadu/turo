import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
import ReusableText from "../Reusable/ReusableText";

const CategoryItem = ({ category, selected }) => {
  return (
    <View
      style={{
        marginRight: 20,
        padding: 5,
        alignItems: "center",
        width: 80,
        justifyContent: "center",
        borderRadius: SIZES.xSmall - 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: category.value == selected ? COLORS.black : "transparent",
        shadowColor: SHADOWS.medium,
      }}
    >
      <ReusableText
        text={category.emoji}
        family={"regular"}
        size={SIZES.small}
        color={COLORS.black}
      />
      <ReusableText
        text={category.title}
        family={"regular"}
        size={SIZES.small}
        color={COLORS.black}
      />
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
