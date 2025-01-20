import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import CategoryList from "./CategoryList";
import GlobalStyle from "../../constants/GlobalStyle";
import { router } from "expo-router";

const MapHeader = () => {
  return (
    <SafeAreaView
      style={[
        { zIndex: 999, backgroundColor: "white", position: "absolute" },
        GlobalStyle.droidSafeArea,
      ]}
    >
      <View
        style={{
          backgroundColor: "white",
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: {
            width: 1,
            height: 10,
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 12,
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("search")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              flexDirection: "row",
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 5,
              alignItems: "center",
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "black",
              borderRadius: SIZES.xSmall - 5,
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowRadius: 8,
              shadowOffset: {
                width: 1,
                height: 1,
              },
            }}
          >
            <View>
              <Ionicons name="search" size={26} />
            </View>
            <View style={{ flexDirection: "row", marginLeft: 5 }}>
              {/* <Text style={{ fontFamily: "regular", marginRight: 5 }}> </Text> */}
              <Text style={{ color: COLORS.gray2, fontFamily: "regular" }}>
                Shop Anything
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: "bold",
                  marginHorizontal: 5,
                }}
              >
                ·
              </Text>

              <Text style={{ color: COLORS.gray2, fontFamily: "regular" }}>
                Anytime
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: "bold",
                  marginHorizontal: 5,
                }}
              >
                ·
              </Text>
              <Text style={{ color: COLORS.gray2, fontFamily: "regular" }}>
                Anywhere
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("(modals)/filter")}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#A2A0A2",
              borderRadius: SIZES.small - 5,
            }}
          >
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <CategoryList />
      </View>
    </SafeAreaView>
  );
};

export default MapHeader;

const styles = StyleSheet.create({});
