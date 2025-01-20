import { HomeSheet, MapHeader } from "../../components/index";
import uidata from "../../constants/uidata";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MapListings } from "../../components";

const Page = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />

      {/* <MapHeader /> */}
      <Stack.Screen
        options={{
          header: () => <MapHeader />,
        }}
      />

      <MapListings />

      <HomeSheet listings={uidata.productListings} />
    </View>
  );
};

export default Page;
