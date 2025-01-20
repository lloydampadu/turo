import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalStyle from "../../constants/GlobalStyle";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, SIZES } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const StoreHeader = ({ item }) => {
  return (
    <SafeAreaView style={[, GlobalStyle.droidSafeArea]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 12,
        }}
      >
        <View>
          <ReusableText
            text={item.name}
            family={"bold"}
            size={SIZES.large}
            color={COLORS.black}
          />
        </View>
        <View style={{ flexDirection: "row", gap: SIZES.medium }}>
          <Ionicons name="notifications-outline" size={26} />
          <Ionicons name="settings-outline" size={26} />
          <Ionicons name="grid-outline" size={26} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoreHeader;

const styles = StyleSheet.create({});
