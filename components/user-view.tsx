import Colors from "../constants/Colors";
import { windowHeight, windowWidth } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { SmText, XSText } from "./text";
import { View } from "./Themed";

const UserView: React.FC<{
  first_name: string;
  last_name: string;
  age: string;
  group: string;
  residence: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      darkColor={Colors.dark.viewBackground}
      lightColor={Colors.light.viewBackground}
      style={{
        marginTop: windowHeight * 0.01,
        borderRadius: windowWidth * 0.02,
        alignItems: "center",
        padding: windowWidth * 0.01,
        width: windowWidth,
        height: windowHeight * 0.07,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "hidden",
          width: windowWidth * 0.3,
        }}
      >
        <XSText>{props.first_name}</XSText>
        <XSText>{props.last_name}</XSText>
      </View>
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "scroll",
          width: windowWidth * 0.15,
        }}
      >
        <XSText color={Colors[colorScheme].tint}>{props.age}</XSText>
      </View>
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "scroll",
          width: windowWidth * 0.15,
        }}
      >
        <XSText>{props.group}</XSText>
      </View>
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "scroll",
          width: windowWidth * 0.3,
        }}
      >
        <XSText>{props.residence}</XSText>
      </View>
    </View>
  );
};
export default UserView;
