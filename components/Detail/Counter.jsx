import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ReusableText from "../Reusable/ReusableText";
import { SIZES } from "../../constants/theme";
import WidthSpacer from "../Reusable/WidthSpacer";

const Counter = ({ count, setCount }) => {
  console.log("count", count);

  const increment = () => {
    if (count < 15) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: 1,
          }}
          onPress={decrement}
        >
          <Ionicons name="remove-outline" size={24} />
        </TouchableOpacity>

        <ReusableText
          text={count}
          family={"regular"}
          size={SIZES.large}
          color={"black"}
        />

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 5,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: 1,
          }}
          onPress={increment}
        >
          <Ionicons name="add" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
