import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SIZES } from "../../constants/theme";
import uidata from "../../constants/uidata";
import CategoryItem from "./CategoryItem";
import useHeaderCategory from "../../context/useHeaderCategory";

const CategoryList = ({}) => {
  const setSelectedItems = useHeaderCategory((state) => state.setSelectedItems);
  const [selected, setSelected] = useState("games");

  const handleSelectedCategory = (item) => {
    if (selected !== item.value) {
      setSelectedItems({
        _id: item._id,
        value: item.value,
        category: "category",
        title: item.title,
      });

      setSelected(item.value);
    }
  };

  return (
    <FlatList
      data={uidata.categories}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.card}
      scrollEnabled
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectedCategory(item)}>
          <CategoryItem category={item} selected={selected} />
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  card: {
    paddingTop: SIZES.width > 700 ? 22 : 10,
    paddingLeft: SIZES.width > 700 ? 22 : 10,
    marginBottom: SIZES.width > 700 ? 22 : 10,
  },
});
