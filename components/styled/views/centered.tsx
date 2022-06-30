import { StyleProp, ViewStyle } from "react-native";
import { windowWidth } from "../../../constants/Layout";
import { View } from "../../Themed";

const Centered: React.FC<{
  children?: any;
  style?: StyleProp<ViewStyle>;
  horizontal?: boolean;
  vertical?: boolean;
}> = (props) => {
  return (
    <View
      {...props}
      style={[
        {
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
export default Centered;
