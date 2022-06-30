import { View, Text, ActivityIndicator } from "../../components/Themed";
import React, { useState } from "react";
import FetchDataWithoutToken from "../../helpers/data/fetchDataWithoutToken";
import urls from "../../constants/urls";
import UserView, { UserAttendanceView } from "../../components/user-view";
import { SmText } from "../../components/text";
import { windowHeight, windowWidth } from "../../constants/Layout";
import UsersTopView, {
  UsersAttendanceTopView,
} from "../../components/UsersTopView";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { FlatList, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import PostDataWithoutToken from "../../helpers/data/postDataWithoutToken";
import { DropdownSelect } from "../../components/dropdown";
import FetchData from "../../helpers/data/fetchData";
import { useSelector } from "react-redux";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";

const AttendanceDetailScreen = () => {
  const [attendances, setAttendances] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [saints, setSaints] = useState<any>([]);
  const colorScheme = useColorScheme();
  const route = useRoute();
  const token = useSelector((state: any) => state.auth.token);
  const [mode, setMode] = useState<"All saints" | "Group">("All saints");
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
      endpoint: urls.saints,
      setData: setSaints,
      onFetchFail: () => {},
      onFetchSuccess: () => {},
      onFetchTokenFail: () => {},
    });

    FetchData({
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
      token,
    });
  }, [refresh]);

  const renderItem: React.FC<{ item: any }> = ({ item }) => (
    <UserAttendanceView
      timeList={timeList}
      saintId={item.id}
      group={item.group}
      first_name={item.first_name}
      last_name={item.last_name}
    />
  );
  return (
    <View>
      <View>
        <View
          style={{
            width: windowWidth,
            marginTop: windowHeight / 40,
          }}
        >
          <SmText
            styles={{
              textAlign: "center",
              color: Colors[colorScheme].text,
              fontFamily: fonts.Bold,
            }}
          >
            Saints who attended the event
          </SmText>
          {saintList.length !== 0 && <UsersAttendanceTopView />}
        </View>
        <View
          style={{
            height: windowHeight * 0.753,
          }}
        >
          {loading && (
            <ActivityIndicator darkColor={Colors[colorScheme].tint} />
          )}

          {saintList.length == 0 && !loading ? (
            <View
              style={{
                height: windowHeight / 1.4,
                justifyContent: "center",
                width: windowWidth,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: windowWidth / 20,
                  fontFamily: fonts.Regular,
                  textAlign: "center",
                  textAlignVertical: "center",
                  color: Colors[colorScheme].swash,
                }}
              >
                No one attended this event
              </Text>
              {/* <Image
                source={require("../../assets/images/no-data.png")}
                style={{
                  width: windowWidth / 1.2,
                  height: windowHeight / 2,
                }}
                resizeMode="contain"
              /> */}
            </View>
          ) : (
            <FlatList
              data={saintList}
              refreshing={loading}
              onRefresh={() => {
                setRefresh(refresh + 1);
              }}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default AttendanceDetailScreen;
