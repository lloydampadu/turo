import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import StoreHeader from "../../components/Store/StoreHeader";
import StoreBody from "../../components/Store/StoreBody";
import uidata from "../../constants/uidata";

const Page = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <StoreHeader item={uidata.profile} />,
        }}
      />

      <StoreBody />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
