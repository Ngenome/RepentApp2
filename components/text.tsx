import { StyleProp, TextStyle } from "react-native";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import { POD } from "../helpers";
import useColorScheme from "../hooks/useColorScheme";
import { Text } from "./Themed";

export const SmText: React.FC<{
  styles?: StyleProp<TextStyle>;
  color?: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={[
        {
          color: POD(props.color, Colors[colorScheme].text),
          fontFamily: fonts.Regular,
          fontSize: fontSizes.sm,
        },
        props.styles,
      ]}
      {...props}
    >
      {props.children}
    </Text>
  );
};
export const XSText: React.FC<{
  styles?: StyleProp<TextStyle>;
  color?: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={[
        {
          color: POD(props.color, Colors[colorScheme].text),
          fontFamily: fonts.Regular,
          fontSize: fontSizes.xs,
        },
        props.styles,
      ]}
      {...props}
    >
      {props.children}
    </Text>
  );
};
export const DangerText: React.FC<{
  styles?: StyleProp<TextStyle>;
  color?: string;
  fontSize?: number;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={[
        {
          color: POD(props.color, Colors[colorScheme].danger),
          fontFamily: fonts.Regular,
          fontSize: POD(props.fontSize, fontSizes.xs),
        },
        props.styles,
      ]}
      {...props}
    >
      {props.children}
    </Text>
  );
};
export const MDText: React.FC<{
  styles?: StyleProp<TextStyle>;
  color?: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={[
        {
          color: POD(props.color, Colors[colorScheme].text),
          fontFamily: fonts.Regular,
          fontSize: fontSizes.md,
        },
        props.styles,
      ]}
      {...props}
    >
      {props.children}
    </Text>
  );
};
