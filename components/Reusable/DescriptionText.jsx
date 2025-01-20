import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS, TEXT } from "../../constants/theme";

const DescriptionText = ({ text }) => {
  const [lines, setLines] = useState(2); // Initial number of lines

  const toggleLines = () => {
    setLines(lines === 2 ? null : 2); // Toggle between null and 2 lines
  };

  return (
    <Pressable onPress={toggleLines}>
      <Text numberOfLines={lines} style={styles.description}>
        {text}
      </Text>
    </Pressable>
  );
};

export default DescriptionText;

const styles = StyleSheet.create({
  description: {
    fontFamily: "regular",
    textAlign: "justify",
    color: "gray",
  },
});
