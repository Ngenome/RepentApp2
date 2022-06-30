import { View, Text } from "./Themed";
import React from "react";
import { windowHeight, windowWidth } from "../constants/Layout";
import sizes from "../constants/sizes";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import { Touchable, TouchableOpacity } from "react-native";

const EventAttendanceView: React.FC<{
  eventTitle: string;
  eventDate: string;
  attendanceCount?: number;
  onPress: any;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginVertical: windowHeight / 70,
      }}
    >
      <View
        darkColor={Colors["dark"].viewBackground}
        lightColor={Colors["light"].viewBackground}
        style={{
          width: sizes.width.card.full,
          //   marginVertical: windowHeight / 70,
          height: windowHeight / 9,
          borderRadius: sizes.radius.sm,
          padding: sizes.padding.sm,
          justifyContent: "space-between",
        }}
      >
        <View
          darkColor={Colors["dark"].viewBackground}
          lightColor={Colors["light"].viewBackground}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: fonts.Regular,
              fontSize: fontSizes.sm - 1,
            }}
          >
            {props.eventTitle}
          </Text>

          <Text
            style={{
              fontFamily: fonts.Bold,
              fontSize: fontSizes.xs,
              color: Colors[colorScheme].tint,
            }}
          >
            {props.eventDate}
          </Text>
        </View>
        <View
          darkColor={Colors["dark"].viewBackground}
          lightColor={Colors["light"].viewBackground}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: fonts.Bold,
              fontSize: fontSizes.xs + 1,
              color: Colors[colorScheme].tint,
            }}
          >
            {props.attendanceCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventAttendanceView;
