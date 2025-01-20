import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";
import ReusableText from "../Reusable/ReusableText";
import { SIZES } from "../../constants/theme";

const ColorPicker = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colorHandler = (color) => {
    setSelectedColor(color);
  };

  const renderItem = ({ item: color }) => (
    <TouchableOpacity
      style={[selectedColor === color && styles.wrapper]}
      onPress={() => colorHandler(color)}
    >
      <View style={[styles.colorCircle, { backgroundColor: color }]} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={colors}
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => (
        <ReusableText
          text={"Color:"}
          family={"regular"}
          size={SIZES.medium}
          color={"black"}
        />
      )}
      horizontal
      renderItem={renderItem}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  wrapper: {
    borderWidth: 1,
    borderRadius: 99,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    margin: 4,
    borderWidth: 3,
    borderColor: "transparent",
  },
  selected: {
    borderColor: "black",
  },
});

export default ColorPicker;
