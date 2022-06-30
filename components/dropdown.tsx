import { Entypo } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import { windowHeight, windowWidth } from "../constants/Layout";
import sizes from "../constants/sizes";
import useColorScheme from "../hooks/useColorScheme";
import { IconSelector } from "./input";
import { Text, View } from "./Themed";

export const DropdownSelect: React.FC<{
  onSelect: any;
  data: any;
  label: string;
  iconName: string;
  iconFamily: string;
  searchPlaceholder: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        marginTop: windowHeight * 0.01,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.Regular,
          fontSize: fontSizes.xs,
          marginBottom: windowHeight * 0.008,
        }}
      >
        {props.label}
      </Text>
      <View
        style={{
          borderRadius: windowWidth * 0.1,
          elevation: 4,
          height: windowHeight * 0.046,
          backgroundColor: Colors[colorScheme].viewBackground,
          width: windowWidth * 0.835,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconSelector
          color={Colors[colorScheme].tint}
          name={props.iconName}
          family={props.iconFamily}
          size={windowWidth * 0.075}
        />
        <SelectDropdown
          data={props.data}
          onSelect={props.onSelect}
          searchInputStyle={{
            width: windowWidth * 0.8,
            backgroundColor: Colors[colorScheme].viewBackground,
          }}
          searchInputTxtColor={Colors[colorScheme].tint}
          searchPlaceHolder={props.searchPlaceholder}
          search={true}
          buttonTextAfterSelection={(selectedItem: any, index: any) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected

            return selectedItem;
          }}
          rowTextForSelection={(item: any, index: any) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown

            return item;
          }}
          renderDropdownIcon={() => {
            return (
              <Entypo
                name="chevron-down"
                size={24}
                color={Colors[colorScheme].text}
              />
            );
          }}
          //   defaultButtonText={props.data[0]}
          //   defaultValueByIndex={0}
          buttonStyle={{
            height: windowHeight * 0.044,

            backgroundColor: Colors[colorScheme].viewBackground,
            width: windowWidth * 0.7,
          }}
          buttonTextStyle={{
            fontFamily: fonts.Regular,
            fontSize: fontSizes.xs,
            color: Colors[colorScheme].text,
          }}
          rowTextStyle={{
            fontFamily: fonts.Regular,
            fontSize: fontSizes.xs,
            color: Colors[colorScheme].text,
          }}
          dropdownStyle={{
            backgroundColor: Colors[colorScheme].translucentBackground,
            width: windowWidth * 0.8,
            borderRadius: windowWidth * 0.04,
          }}
        />
      </View>
    </View>
  );
};

export const ObjectDropdownSelect: React.FC<{
  onSelect: any;
  data: any;
  label: string;
  searchPlaceholder: string;
  itemValue: string;
  iconName: string;

  iconFamily: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={
        {
          // margin: windowHeight * 0.01,
        }
      }
    >
      <Text
        style={{
          fontFamily: fonts.Regular,
          fontSize: fontSizes.xs,
          marginBottom: windowHeight * 0.008,
        }}
      >
        {props.label}
      </Text>
      <View
        style={{
          borderRadius: windowWidth * 0.1,
          elevation: 4,
          height: windowHeight * 0.046,
          backgroundColor: Colors[colorScheme].viewBackground,
          width: windowWidth * 0.835,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconSelector
          color={Colors[colorScheme].tint}
          name={props.iconName}
          family={props.iconFamily}
          size={windowWidth * 0.075}
        />
        <SelectDropdown
          data={props.data}
          onSelect={props.onSelect}
          searchInputStyle={{
            width: windowWidth * 0.8,
            backgroundColor: Colors[colorScheme].viewBackground,
          }}
          searchInputTxtColor={Colors[colorScheme].tint}
          searchPlaceHolder={props.searchPlaceholder}
          search={true}
          buttonTextAfterSelection={(selectedItem: any, index: any) => {
            return selectedItem[props.itemValue];
          }}
          rowTextForSelection={(item: any, index: any) => {
            return item[props.itemValue];
          }}
          rowStyle={{
            borderBottomColor: Colors[colorScheme].tint,
          }}
          renderDropdownIcon={() => {
            return (
              <Entypo
                name="chevron-down"
                size={24}
                color={Colors[colorScheme].text}
              />
            );
          }}
          buttonStyle={{
            height: windowHeight * 0.044,

            backgroundColor: Colors[colorScheme].viewBackground,
            width: windowWidth * 0.7,
          }}
          buttonTextStyle={{
            fontFamily: fonts.Regular,
            fontSize: fontSizes.xs,
            color: Colors[colorScheme].text,
          }}
          rowTextStyle={{
            fontFamily: fonts.Regular,
            fontSize: fontSizes.xs,
            color: Colors[colorScheme].text,
          }}
          dropdownStyle={{
            backgroundColor: Colors[colorScheme].translucentBackground,
            width: windowWidth * 0.8,
            borderRadius: windowWidth * 0.04,
          }}
        />
      </View>
    </View>
  );
};

export const ObjectDropdownSelectWithValues: React.FC<{
  onSelect: any;
  data: any;
  label: string;
  searchPlaceholder: string;
  itemValues: Array<string>;
  iconName: string;
  iconFamily: string;
}> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={
        {
          // margin: windowHeight * 0.01,
        }
      }
    >
      <Text
        style={{
          fontFamily: fonts.Regular,
          fontSize: fontSizes.xs,
          marginBottom: windowHeight * 0.008,
        }}
      >
        {props.label}
      </Text>
      <View
        style={{
          borderRadius: windowWidth * 0.1,
          elevation: 4,
          height: windowHeight * 0.046,
          backgroundColor: Colors[colorScheme].viewBackground,
          width: windowWidth * 0.835,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconSelector
          color={Colors[colorScheme].tint}
          name={props.iconName}
          family={props.iconFamily}
          size={windowWidth * 0.075}
        />
        <SelectDropdown
          data={props.data}
          onSelect={props.onSelect}
          searchInputStyle={{
            width: windowWidth * 0.8,
            backgroundColor: Colors[colorScheme].viewBackground,
          }}
          searchInputTxtColor={Colors[colorScheme].tint}
          searchPlaceHolder={props.searchPlaceholder}
          search={true}
          buttonTextAfterSelection={(selectedItem: any, index: any) => {
            return `${selectedItem[props.itemValues[0]]} ${
              selectedItem[props.itemValues[1]]
            }`;
          }}
          rowTextForSelection={(item: any, index: any) => {
            return `${item[props.itemValues[0]]} ${item[props.itemValues[1]]}`;
          }}
          rowStyle={{
            borderBottomColor: Colors[colorScheme].tint,
          }}
          renderDropdownIcon={() => {
            return (
              <Entypo
                name="chevron-down"
                size={24}
                color={Colors[colorScheme].text}
              />
            );
          }}
          //   defaultButtonText={props.data[0][props.itemValue]}
          //   defaultValueByIndex={0}
          buttonStyle={{
            height: windowHeight * 0.044,
            padding: sizes.padding.sm,
            backgroundColor: Colors[colorScheme].viewBackground,
            width: windowWidth * 0.7,
          }}
          buttonTextStyle={{
            fontFamily: fonts.Regular,
            fontSize: fontSizes.xs,
            color: Colors[colorScheme].text,
          }}
          rowTextStyle={{
            fontFamily: fonts.Regular,
            fontSize: fontSizes.xs,
            color: Colors[colorScheme].text,
          }}
          dropdownStyle={{
            backgroundColor: Colors[colorScheme].translucentBackground,
            width: windowWidth * 0.8,
            borderRadius: windowWidth * 0.04,
          }}
        />
      </View>
    </View>
  );
};
