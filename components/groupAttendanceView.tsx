import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Colors from "../constants/Colors";
import { windowHeight, windowWidth } from "../constants/Layout";
import sizes from "../constants/sizes";
import useColorScheme from "../hooks/useColorScheme";
import { DangerText, SmText, XSText } from "./text";
import { Text, View } from "./Themed";
import { UserAttendanceView } from "./user-view";

const GroupAttendanceView: React.FC<{
  name: string;
  id: string;
  saintList: Array<{
    id: string;
    first_name: string;
    last_name: string;
    accountability_group: string;
  }>;
}> = ({ saintList, name, id }) => {
  const colorScheme = useColorScheme();
  const renderItem: React.FC<{ item: any }> = ({ item }) => (
    <UserAttendanceView
      width={sizes.width.card.full}
      group={item.accountability_group}
      first_name={item.first_name}
      last_name={item.last_name}
    />
  );
  const GroupSaintList = saintList.filter((iSaint: any) => {
    if (iSaint.accountability_group == id) {
      return true;
    }
  });
  useEffect(() => {
    console.log(GroupSaintList);
    console.log("this is a saint list ");
    console.log(saintList);
  }, []);
  return (
    <View
      style={{
        width: sizes.width.card.full,
        minHeight:
          GroupSaintList.length === 0 ? windowHeight / 20 : windowHeight / 6,
        marginTop: windowHeight / 60,
        marginBottom: windowHeight / 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: sizes.radius.sm,
      }}
    >
      <XSText color={Colors[colorScheme].tint}>{name}</XSText>
      {GroupSaintList.length == 0 ? (
        <DangerText>No attendances for this group </DangerText>
      ) : (
        <View>
          <FlatList
            data={GroupSaintList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};
export default GroupAttendanceView;
