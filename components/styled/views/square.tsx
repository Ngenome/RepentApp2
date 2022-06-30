import { StyleProp, ViewStyle } from "react-native";
import { windowWidth } from "../../../constants/Layout";
import sizes from "../../../constants/sizes";
import { POD } from "../../../helpers";
import { View } from "../../Themed";

const Square: React.FC<{
  children?: any;
  style?: StyleProp<ViewStyle>;
  horizontal?: boolean;
  vertical?: boolean;
  color?: string;
  width?: number;
  margin?: any;
  rounded?: number;
}> = (props) => {
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: POD(props.color, "red"),
          width: POD(props.width, windowWidth / 3),
          height: POD(props.width, windowWidth / 3),
          marginRight: POD(props.margin?.r, 2),
          marginLeft: POD(props.margin?.l, 2),
          marginTop: POD(props.margin?.t, 2),
          marginBottom: POD(props.margin?.b, 2),
          ...(props.rounded && {
            borderRadius: POD(props.rounded, sizes.radius.sm),
          }),
          ...(props.vertical && { justifyContent: "center" }),
          ...(props.horizontal && { alignItems: "center" }),
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};
export default Square;
