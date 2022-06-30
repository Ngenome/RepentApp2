import { FontAwesome } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import { windowHeight, windowWidth } from "../constants/Layout";
import { POD } from "../helpers";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "./Themed";

export const SearchBar: React.FC<{
  onSearch: any;
  onChangeText: any;
  placeholder?: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      darkColor={Colors.dark.viewBackground}
      lightColor={Colors.light.viewBackground}
      style={{
        height: windowHeight / 20,
        width: windowWidth / 2.3,
        flexDirection: "row",
        borderRadius: windowWidth * 0.04,
        padding: windowWidth * 0.01,
        // marginTop: windowHeight * 0.01,
        justifyContent: "space-between",
      }}
    >
      <TextInput
        placeholder={POD(props.placeholder, "Search a member")}
        style={{
          fontFamily: fonts.Regular,
          fontSize: fontSizes.xs,
          width: "80%",
          color: Colors[colorScheme].tint,
        }}
        placeholderTextColor={Colors[colorScheme].text}
        onChangeText={props.onChangeText}
      />
      <TouchableOpacity
        style={{
          // padding: windowWidth / 80,
          margin: 2,
        }}
        onPress={props.onSearch}
      >
        <FontAwesome
          name="search"
          color={Colors[colorScheme].tint}
          size={windowHeight / 40}
        />
      </TouchableOpacity>
    </View>
  );
};
