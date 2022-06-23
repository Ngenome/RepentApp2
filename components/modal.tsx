import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import { windowHeight, windowWidth } from "../constants/Layout";
import sizes from "../constants/sizes";
import useColorScheme from "../hooks/useColorScheme";
import { CenteredButton } from "./buttons";
import { Text, View } from "./Themed";

const SuccessModal: React.FC<{
  setModalVisible: any;
  modalVisible: boolean;
  name: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: "rgba(100,100,100,0.2)",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",

            alignItems: "center",
            height: windowHeight / 1.7,
            width: windowWidth / 1.2,
            backgroundColor: Colors[colorScheme].viewBackground,
            borderRadius: windowHeight / 40,
          }}
        >
          <View
            style={{
              height: windowHeight / 6,
              width: windowHeight / 6,
              backgroundColor: Colors[colorScheme].viewBackground,
              borderRadius: windowHeight / 4,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="done"
              size={windowHeight / 7}
              color={Colors[colorScheme].success}
            />
          </View>
          <Text
            style={{
              fontFamily: fonts.Regular,
              color: Colors[colorScheme].text,
              fontSize: windowWidth / 30,
            }}
          >
            You successfully added {props.name}
          </Text>

          <CenteredButton
            hRatio={12}
            wRatio={2.4}
            radiusRatio={sizes.radius.sm}
            title="Add another member"
            font={fonts.Regular}
            color={Colors[colorScheme].text}
            bgColor={Colors[colorScheme].tint}
            style={{
              marginTop: windowHeight / 20,
            }}
            onPress={() => {
              props.setModalVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
