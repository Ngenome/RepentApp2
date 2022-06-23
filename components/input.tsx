import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "../constants/Layout";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { POD } from "../helpers";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import useColorScheme from "../hooks/useColorScheme";
export const LabelledInput: React.FC<{
  label: string;
  onChangeText: any;
  placeholder: string;
  hRatio: number;
  wRatio: number;
  radiusRatio: number;
  style: StyleProp<ViewStyle>;
}> = ({
  label,
  onChangeText,
  placeholder,
  hRatio,
  wRatio,
  radiusRatio,
  style,
}) => {
  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: fonts.Regular,
          color: Colors.light.text,
          fontSize: windowHeight / 48,
        }}
      >
        {label}
      </Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          height: windowHeight / hRatio,
          width: windowWidth / wRatio,
          backgroundColor: Colors.light.text,
          fontFamily: fonts.Regular,

          borderRadius: windowWidth / radiusRatio,
        }}
      />
    </View>
  );
};

export const IconSelector: React.FC<{
  name: any;
  size: number;
  color: string;
  family: string;
}> = ({ name, size, color, family }) => {
  if (/fontawesome5/i.test(family)) {
    return <FontAwesome5 name={name} size={POD(size, 24)} color={color} />;
  }
  if (/fontawesome/i.test(family)) {
    return <FontAwesome name={name} size={POD(size, 24)} color={color} />;
  }

  if (/ionicons/i.test(family)) {
    return <Ionicons name={name} size={POD(size, 24)} color={color} />;
  }

  if (/fontisto/i.test(family)) {
    return <Fontisto name={name} size={POD(size, 24)} color={color} />;
  }
  if (/entypo/i.test(family)) {
    return <Entypo name={name} size={POD(size, 24)} color={color} />;
  }
  if (/AntDesign/i.test(family)) {
    return <AntDesign name={name} size={POD(size, 24)} color={color} />;
  }
  if (/MaterialIcons/i) {
    return <MaterialIcons name={name} size={POD(size, 24)} color={color} />;
  }
  if (/MaterialCommunityIcons/i.test(family)) {
    return (
      <MaterialCommunityIcons name={name} size={POD(size, 24)} color={color} />
    );
  }
  if (/Feather/i.test(family)) {
    return <Feather name={name} size={POD(size, 24)} color={color} />;
  }

  return <></>;
};

export const IconInput: React.FC<{
  h?: number;
  w?: number;
  fontFamily?: string;
  name: string;
  family: string;
  iconSize: number;
  visibility?: boolean;
  setVisibility?: any;
  visibilityIcon?: boolean;
  change: any;
  placeholder: string;
  fontSize?: number;
  iconColor: string;
  TextInputProps?: TextInputProps;
  label?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
}> = ({
  h,
  w,
  fontFamily,
  name,
  family,
  iconSize,
  visibility,
  setVisibility,
  visibilityIcon,
  change,
  placeholder,
  fontSize,
  iconColor,
  TextInputProps,
  label,
  wrapperStyle,
}) => {
  const colorScheme = useColorScheme();
  return (
    <View style={wrapperStyle}>
      <Text
        style={{
          fontFamily: fonts.Regular,
          fontSize: fontSizes.xs,
          color: Colors[colorScheme].text,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          height: POD(h, windowHeight / 22),
          width: POD(w, windowWidth / 1.2),
          elevation: 4,
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.8,
          shadowRadius: 40,
          // borderWidth: 1,
          borderColor: "gray",
          borderRadius: 20,
          //   marginVertical: 12,
          marginTop: 5,
          backgroundColor: Colors[colorScheme].viewBackground,
        }}
      >
        <View
          style={{
            width: POD(w, windowWidth / 1.2 - 17),
            height: POD(h, windowHeight / 17 - 1),
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: windowWidth * 0.09,
            }}
          >
            <IconSelector
              color={iconColor}
              name={name}
              family={family}
              size={iconSize}
            />
          </View>

          <TextInput
            style={{
              color: Colors[colorScheme].light,
              fontFamily: fontFamily,
              fontSize: POD(fontSize, 12),
              width: POD(w, windowWidth / 1.4 - 40),
              height: POD(h, windowHeight / 17 - 1),
              marginLeft: windowWidth * 0.01,
            }}
            placeholder={placeholder}
            placeholderTextColor={Colors[colorScheme].light}
            {...TextInputProps}
            onChangeText={change}
          />

          {visibilityIcon && (
            <TouchableOpacity onPress={() => setVisibility(!visibility)}>
              <MaterialIcons
                name={visibility ? "visibility-off" : "visibility"}
                size={windowWidth / 20}
                color={Colors.light.tint}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
