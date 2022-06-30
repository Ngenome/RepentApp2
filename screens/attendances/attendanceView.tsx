import { View, Text, ActivityIndicator } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import urls from "../../constants/urls";
import FetchDataWithoutToken from "../../helpers/data/fetchDataWithoutToken";
import EventAttendanceView from "../../components/eventAttendanceView";
import { windowHeight, windowWidth } from "../../constants/Layout";
import { CenteredButton } from "../../components/buttons";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { SearchBar } from "../../components/searchBar";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DropdownSelect } from "../../components/dropdown";
import { modes } from "../../constants/strings";

const AttendancesView = () => {
  const [attendances, setAttendances] = useState([]);
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [mode, setMode] = useState<string>(modes.all);
  const colorScheme = useColorScheme();

  const navigation = useNavigation();
  useEffect(() => {
    FetchDataWithoutToken({
      endpoint: urls.events,
      setData: setEvents,

      onFetchFail: () => {},
      onFetchSuccess: () => {
        setLoading(false);
      },
      onFetchTokenFail: () => {},
    });
  }, [refresh]);

  const renderItem: React.FC<{ item: any }> = ({ item }) => (
    <EventAttendanceView
      eventDate="7th June"
      eventTitle={item.title}
      onPress={() => {
        navigation.navigate(
          mode === modes.all
            ? "AttendanceDetailScreen"
            : "GroupAttendanceDetailScreen",
          {
            event: item.title,
            id: item.id,
          }
        );
      }}
    />
  );
  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: windowHeight / 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginVertical: windowHeight / 40,
        }}
      >
        <DropdownSelect
          data={[modes.all, modes.group]}
          onSelect={(e: any, i: any) => {
            setMode(e);
          }}
          label="Select the Attendance view mode"
          searchPlaceholder="group/event"
          iconFamily="MaterialIcons"
          iconName="grid-view"
        />
      </View>
      {loading && <ActivityIndicator />}
      <View
        style={{
          height: windowHeight / 1.26,
        }}
      >
        {/* <EventAttendanceView />
         */}

        <FlatList
          data={events.filter((event: any) => {
            return new Date(event.date) < new Date(Date.now());
          })}
          refreshing={loading}
          onRefresh={() => {
            setRefresh(refresh + 1);
          }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default AttendancesView;
