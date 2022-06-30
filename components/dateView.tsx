import { View, Text } from "../components/Themed";
import React from "react";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { windowHeight, windowWidth } from "../constants/Layout";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";

const DateView: React.FC<{ date: Date; showDate: any }> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        marginTop: windowHeight / 650,
      }}
    >
      <Text>Date</Text>
      <View
        darkColor={Colors["dark"].viewBackground}
        lightColor={Colors["light"].viewBackground}
        style={{
          height: windowHeight / 22,
          // justifyContent: "center",
          padding: windowWidth / 100,
          marginTop: windowWidth / 100,
          width: windowWidth / 1.2,
          flexDirection: "row",
          borderRadius: windowWidth / 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={props.showDate}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <MaterialIcons
            name="date-range"
            color={Colors[colorScheme].tint}
            size={windowWidth / 15}
            style={{
              marginLeft: windowWidth / 50,
            }}
          />
          <Text
            darkColor={Colors["dark"].light}
            lightColor={Colors["light"].light}
            style={{
              width: windowWidth / 1.4,
              marginLeft: windowWidth / 40,
            }}
          >
            {props.date.toString()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateView;

export const TimeView: React.FC<{ time: Date; showTime: any }> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        marginTop: windowHeight / 650,
      }}
    >
      <Text>Time</Text>
      <View
        darkColor={Colors["dark"].viewBackground}
        lightColor={Colors["light"].viewBackground}
        style={{
          height: windowHeight / 22,
          padding: windowWidth / 100,
          marginTop: windowWidth / 100,
          width: windowWidth / 1.2,
          flexDirection: "row",
          borderRadius: windowWidth / 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={props.showTime}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FontAwesome5
            name="clock"
            color={Colors[colorScheme].tint}
            size={windowWidth / 15}
            style={{
              marginLeft: windowWidth / 50,
            }}
          />
          <Text
            darkColor={Colors["dark"].light}
            lightColor={Colors["light"].light}
            style={{
              width: windowWidth / 1.4,
              marginLeft: windowWidth / 40,
            }}
          >
            {props.time.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
