import React, { useState } from "react";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import { windowHeight, windowWidth } from "../constants/Layout";
import { padWithZero } from "../helpers/fillWithZeros";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";

export const EventCard: React.FC<{
  title: string;
  description: string;
  date: string;
}> = (props) => {
  const eventDate = new Date(props.date);
  const colorScheme = useColorScheme();
  return (
    <View
      darkColor={Colors["dark"].viewBackground}
      lightColor={Colors["light"].viewBackground}
      style={{
        height: windowHeight / 4,
        marginBottom: windowHeight / 20,
        width: windowWidth / 1.1,
        padding: windowWidth / 30,
        borderRadius: windowWidth / 20,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.Bold,
          color: Colors[colorScheme].tint,
        }}
      >
        {props.title}
      </Text>
      <View
        style={{
          flexGrow: 1,
          marginTop: windowHeight / 20,
          justifyContent: "center",
        }}
        darkColor={Colors["dark"].viewBackground}
        lightColor={Colors["light"].viewBackground}
      >
        <Text
          style={{
            fontFamily: fonts.Regular,
            color: Colors[colorScheme].text,
          }}
        >
          {props.description}
        </Text>
      </View>
      <View
        style={{
          padding: windowWidth / 30,
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: windowWidth / 20,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.Regular,
            color: Colors[colorScheme].tint,
          }}
        >
          Date: {eventDate.getDate()}/{eventDate.getMonth()}
        </Text>
        <Text
          style={{
            fontFamily: fonts.Regular,
            color: Colors[colorScheme].tint,
          }}
        >
          {eventDate.getHours()}:{padWithZero(eventDate.getMinutes(), 2)} hrs
        </Text>
      </View>
    </View>
  );
};
