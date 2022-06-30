import { View, Text, ActivityIndicator } from "../../components/Themed";
import React, { useState } from "react";
import FetchDataWithoutToken, {
  Test,
} from "../../helpers/data/fetchDataWithoutToken";
import urls from "../../constants/urls";
import UserView, { UserAttendanceView } from "../../components/user-view";
import { SmText } from "../../components/text";
import { windowHeight, windowWidth } from "../../constants/Layout";
import UsersTopView, {
  UsersAttendanceTopView,
} from "../../components/UsersTopView";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import PostDataWithoutToken from "../../helpers/data/postDataWithoutToken";
import GroupAttendanceView from "../../components/groupAttendanceView";

const GroupAttendanceDetailScreen = () => {
  const [attendances, setAttendances] = useState<Array<any>>([]);
  const [groups, setGroups] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [saints, setSaints] = useState<Array<any>>([]);
  const colorScheme = useColorScheme();
  const route = useRoute();
  const timeList: any = {};
  const saintList = saints.filter((iSaint: any) => {
    for (var i = 0; i < attendances.length; i++) {
      if (attendances[i].saint == iSaint.id) {
        timeList[iSaint.id] = {
          time: attendances[i].time,
        };
        return true;
      }
    }
  });
  React.useEffect(() => {
    FetchDataWithoutToken({
      endpoint: urls.groups,
      setData: setGroups,
      onFetchFail: () => {},
      onFetchSuccess: (response: any) => {},
      onFetchTokenFail: () => {},
    });
    FetchDataWithoutToken({
      endpoint: urls.saints,
      setData: setSaints,
      onFetchFail: () => {},
      onFetchSuccess: (response: any) => {},
      onFetchTokenFail: () => {},
    });

    FetchDataWithoutToken({
      endpoint: urls.eventattendances,
      setData: setAttendances,
      userData: {
        event: route.params?.id,
      },
      onFetchFail: (response: any) => {
        console.log(response);
      },
      onFetchSuccess: (response: any) => {
        setLoading(false);
        console.warn(response.data);
      },
      onFetchTokenFail: (response: any) => {
        console.log(response);
        setLoading(false);
      },
    });
  }, [refresh]);

  const renderItem: React.FC<{ item: any }> = ({ item }) => (
    <GroupAttendanceView
      timeList={timeList}
      id={item.id}
      name={item.group_name}
      saintList={saintList}
    />
  );
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View style={{}}>
        <View
          style={{
            flexGrow: 1,
          }}
        >
          {loading && (
            <ActivityIndicator darkColor={Colors[colorScheme].tint} />
          )}

          {/* {saintList.length == 0 ? (
            <SmText>
              Sorry members of group {route.params?.id} did not attend
            </SmText>
          ) : ( */}
          <FlatList
            contentContainerStyle={{
              padding: windowWidth / 20,
            }}
            data={groups}
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          {/* )} */}
        </View>
      </View>
    </View>
  );
};

export default GroupAttendanceDetailScreen;
