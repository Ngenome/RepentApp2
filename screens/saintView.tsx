import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Styled from "../components/styled/views";
import Centered from "../components/styled/views/centered";
import Row from "../components/styled/views/row";
import { MDText, SmText } from "../components/text";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import { windowHeight, windowWidth } from "../constants/Layout";
import sizes from "../constants/sizes";
import useColorScheme from "../hooks/useColorScheme";

const SaintView = () => {
  const colorScheme = useColorScheme();
  return (
    <Centered>
      <View
        style={{
          backgroundColor: Colors[colorScheme].tint,
          height: windowHeight / 6,
          borderRadius: sizes.radius.sm,
          padding: sizes.padding.sm,
        }}
      >
        <SmText
          styles={{
            fontFamily: fonts.Regular,
          }}
        >
          Group 5
        </SmText>
      </View>
      <View></View>

      <Styled.Row>
        <Centered
          horizontal
          vertical
          style={{
            backgroundColor: Colors[colorScheme].danger,
            height: windowHeight / 6,
            borderRadius: sizes.radius.sm,
            width: windowWidth / 3,
            padding: sizes.padding.sm,
          }}
        >
          <FontAwesome5 name="walking" color="white" size={windowWidth / 10} />
          <SmText
            styles={{
              fontFamily: fonts.Regular,
            }}
          >
            Low Attendance
          </SmText>
        </Centered>
        <Styled.Square
          horizontal
          vertical
          color="blue"
          rounded={sizes.radius.sm}
        >
          <SmText
            styles={{
              fontFamily: fonts.Regular,
            }}
          >
            Usher
          </SmText>
        </Styled.Square>
      </Styled.Row>
    </Centered>
  );
};

export default SaintView;
