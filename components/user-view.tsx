import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import Colors from "../constants/Colors";
import { windowHeight, windowWidth } from "../constants/Layout";
import { POD } from "../helpers";
import useColorScheme from "../hooks/useColorScheme";
import { DangerText, SmText, XSText } from "./text";
import { View } from "./Themed";

const UserView: React.FC<{
  first_name: string;
  last_name: string;
  age: string;
  group: string;
  residence: string;
}> = (props) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("SaintViewScreen", {
          saint: {
            first_name: props.first_name,
            last_name: props.last_name,
            age: props.age,
            group: props.group,
            residence: props.residence,
          },
        });
      }}
      style={{
        marginTop: windowHeight * 0.01,
      }}
    >
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
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
    </Pressable>
  );
};
export default UserView;

export const UserAttendanceView: React.FC<{
  first_name: string;
  height?: number;
  width?: number;
  saintId: number;
  timeList: any;
  last_name: string;
  group: string;
}> = ({ first_name, last_name, group, timeList, saintId, height, width }) => {
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
        width: POD(width, windowWidth),
        height: POD(height, windowHeight * 0.03),
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          flexDirection: "row",
          overflow: "hidden",
          width: windowWidth * 0.32,
          flexGrow: 1,
        }}
      >
        <XSText>{first_name} </XSText>

        <XSText>{last_name}</XSText>
      </View>

      <View
        darkColor={Colors.dark.viewBackground}
        lightColor={Colors.light.viewBackground}
        style={{
          flexDirection: "row",
          overflow: "hidden",
          width: windowWidth * 0.42,
        }}
      >
        <XSText color={Colors[colorScheme].tint}>
          {timeList[saintId].time !== null ? (
            <DangerText>{timeList[saintId].time} </DangerText>
          ) : (
            "_"
          )}
        </XSText>
      </View>
    </View>
  );
};
