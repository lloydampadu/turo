import { StyleSheet, Platform } from "react-native";
import { COLORS } from "./theme";

export default StyleSheet.create({
  droidSafeArea: {
    // flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: COLORS.black,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "mon-b",
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
