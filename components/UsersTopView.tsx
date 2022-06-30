import Colors from "../constants/Colors";
import { windowHeight, windowWidth } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { SmText, XSText } from "./text";
import { View } from "./Themed";

const UsersTopView: React.FC<{}> = (props) => {
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
        <SmText>Name</SmText>
      </View>
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "scroll",
          width: windowWidth * 0.15,
        }}
      >
        <SmText color={Colors[colorScheme].tint}>Age</SmText>
      </View>
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "scroll",
          width: windowWidth * 0.15,
        }}
      >
        <SmText>Group</SmText>
      </View>
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "scroll",
          width: windowWidth * 0.3,
        }}
      >
        <SmText>Residence</SmText>
      </View>
    </View>
  );
};
export default UsersTopView;

export const UsersAttendanceTopView: React.FC<{}> = (props) => {
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
        height: windowHeight * 0.04,
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
          flexGrow: 1,
        }}
      >
        <XSText>Name</XSText>
      </View>

      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          overflow: "scroll",
          width: windowWidth * 0.42,
        }}
      >
        <XSText>Time</XSText>
      </View>
    </View>
  );
};
