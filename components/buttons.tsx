import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import { windowWidth } from "../constants/Layout";
import { POD } from "../helpers";
import useColorScheme from "../hooks/useColorScheme";
import { View, Text } from "./Themed";

export const CenteredButton: React.FC<{
  onPress: any;
  hRatio: number;
  radiusRatio: number;
  bgColor: string;
  wRatio: number;
  style?: StyleProp<ViewStyle>;
  left?: any;
  font?: string;
  color?: string;
  fontSize?: number;
  title: string;
  right?: any;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          {
            height: windowWidth / props.hRatio,
            borderRadius: windowWidth / props.radiusRatio,
            backgroundColor: props.bgColor,
            width: windowWidth / props.wRatio,
            justifyContent: "center",
            flexDirection: "row",

            alignContent: "center",
            alignItems: "center",
          },
          props.style,
        ]}
      >
        {props.left}
        <Text
          style={{
            fontFamily: props.font ? props.font : fonts.Regular,
            color: POD(props.color, Colors.common.text.foreground),
            fontSize: props.fontSize ? props.fontSize : windowWidth / 30,
            textAlign: "left",
          }}
        >
          {props.title}
        </Text>
        {props.right}
      </View>
    </TouchableOpacity>
  );
};
