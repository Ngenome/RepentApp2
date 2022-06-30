import { StyleProp, ViewStyle } from "react-native";
import { windowWidth } from "../../../constants/Layout";
import { View } from "../../Themed";

const Row: React.FC<{
  children?: any;
  style?: StyleProp<ViewStyle>;
  center?: boolean;
  between?: boolean;
  around?: boolean;
  even?: boolean;
  reverse?: boolean;
}> = (props) => {
  return (
    <View
      {...props}
      style={[
        {
          ...(props.center && { justifyContent: "center" }),
          ...(props.between && { justifyContent: "space-between" }),
          ...(props.around && { justifyContent: "space-around" }),
          ...(props.even && { justifyContent: "space-evenly" }),

          ...(props.reverse
            ? { flexDirection: "row-reverse" }
            : { flexDirection: "row" }),
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
};
export default Row;
