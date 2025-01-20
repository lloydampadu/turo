import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { ReusableText } from "../components";
import { SIZES } from "../constants/theme";
import useStoreRegion from "./../context/useStoreRegion";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [currentLocation, setCurrentLocation] = useState(null);

  const setInitialRegion = useStoreRegion((state) => state.setInitialRegion);

  const [loaded] = useFonts({
    light: require("../assets/fonts/light.otf"),
    regular: require("../assets/fonts/regular.otf"),
    medium: require("../assets/fonts/medium.otf"),
    bold: require("../assets/fonts/bold.otf"),
    xtrabold: require("../assets/fonts/xtrabold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Function to fetch the current location
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    // Store the current location in AsyncStorage
    const storeLocation = async () => {
      try {
        await AsyncStorage.setItem(
          "currentLocation",
          JSON.stringify(currentLocation)
        );
      } catch (error) {
        console.log("Error storing location:", error);
      }
    };

    if (currentLocation) {
      storeLocation();
    }
  }, [currentLocation]);

  useEffect(() => {
    // Retrieve the stored location from AsyncStorage
    const getStoredLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem("currentLocation");
        if (storedLocation !== null) {
          setInitialRegion(JSON.parse(storedLocation));
        }
      } catch (error) {
        console.log("Error retrieving stored location:", error);
      }
    };

    getStoredLocation();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/filter"
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="listings/[id]"
            options={{
              // headerTransparent: true,
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ position: "absolute", left: -15 }}
                >
                  <Ionicons name="chevron-back-outline" size={28} />
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name="(add product)/add"
            options={{
              // headerShown: tru,
              animation: "slide_from_bottom",
              headerTitle: () => (
                <ReusableText
                  text={"Post Cloth"}
                  family={"bold"}
                  size={SIZES.medium}
                  color={"black"}
                />
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close" size={28} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => router.push("(add product)/selectCategories")}
                >
                  <ReusableText
                    text={"Next"}
                    family={"medium"}
                    size={SIZES.large}
                    color={"blue"}
                  />
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name="orderPage"
            options={{
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ position: "absolute", left: -15 }}
                >
                  <Ionicons name="chevron-back-outline" size={28} />
                </TouchableOpacity>
              ),
            }}
          />

          <Stack.Screen
            name="(add product)/selectCategories"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
