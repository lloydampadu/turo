import React from "react";
import { Tabs } from "expo-router";
import { COLORS } from "../../constants/theme";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome5,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCoffee, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.black,
        tabBarLabelStyle: {
          fontFamily: "regular",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={26} />
            // <FontAwesomeIcon icon={faCoffee} size={30} color="#900" />
          ),
        }}
      />

      <Tabs.Screen
        name="store"
        options={{
          tabBarLabel: "Store",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "storefront" : "storefront-outline"}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
