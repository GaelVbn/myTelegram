import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  return <Redirect href={"/(home)/(tabs)"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
