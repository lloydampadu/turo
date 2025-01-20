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

const SizePicker = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  console.log(sizes);

  const renderItem = ({ item: size }) => (
    <TouchableOpacity
      onPress={() => setSelectedSize(size)}
      style={[styles.colorCircle, selectedSize === size && styles.selected]}
    >
      <Text style={[, selectedSize === size && styles.selected]}>{size}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={sizes}
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => (
        <ReusableText
          text={"Sizes:"}
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
    // width: 50,
    // height: 40,
    alignItems: "center",
  },
  colorCircle: {
    // width: 40,
    paddingHorizontal: 10,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
  selected: {
    borderColor: "black",
    backgroundColor: "black",
    color: "white",
  },
});

export default SizePicker;
