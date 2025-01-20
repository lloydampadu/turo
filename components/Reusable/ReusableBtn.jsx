import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZES } from "../../constants/theme";

const ReusableBtn = ({
  onPress,
  btnText,
  textColor,
  width,
  backgroundColor,
  borderWidth,
  borderColor,
  fontSize,
  height,
  borderRadius,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(
        width,
        backgroundColor,
        borderWidth,
        borderColor,
        height,
        borderRadius
      )}
    >
      <Text style={styles.btnText(textColor, fontSize)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  btnText: (textColor, fontSize) => ({
    fontFamily: "medium",
    fontSize: fontSize,
    color: textColor,
  }),
  btnStyle: (
    width,
    backgroundColor,
    borderWidth,
    borderColor,
    height,
    borderRadius
  ) => ({
    width: width,
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    height: height,
    borderRadius: borderRadius,
    borderColor: borderColor,
    borderWidth: borderWidth,
  }),
});
