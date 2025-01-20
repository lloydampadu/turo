import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import ReusableText from "./ReusableText";
import reusable from "./reusable.style";

const AppBar = ({
  color,
  title,
  color1,
  icon,
  onPress,
  onPress1,
  top,
  left,
  right,
}) => {
  return (
    <View style={styles.overlay(top, left, right)}>
      <View style={reusable.rowWithSpace("space-between")}>
        <TouchableOpacity style={styles.box(color)} onPress={onPress}>
          <AntDesign name="left" size={26} />
        </TouchableOpacity>

        <ReusableText
          text={title}
          family={"medium"}
          size={SIZES.large}
          color={COLORS.black}
        />

        <TouchableOpacity style={styles.box(color1)} onPress={onPress1}>
          <AntDesign name={icon} size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  overlay: (top, left, right) => ({
    position: "absolute",
    top: top,
    left: left,
    right: right,
    justifyContent: "center",
    zIndex: 999,
  }),

  box: (color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignContent: "center",
    justifyContent: "center",
  }),

  box1: (color1) => ({
    backgroundColor: color1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignContent: "center",
    justifyContent: "center",
  }),
});
