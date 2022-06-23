import { View, Text } from "../components/Themed";
import React from "react";
import { ActivityIndicator } from "react-native";
import { windowWidth } from "../constants/Layout";

export default function Loading() {
  return (
    <View>
      <ActivityIndicator animating={true} size={windowWidth * 0.1} />
    </View>
  );
}
