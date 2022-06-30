import { View, Text } from "../../components/Themed";
import SnackBar from "react-native-snackbar-component";
import React, { useEffect, useState } from "react";
import { IconInput } from "../../components/input";
import fonts from "../../constants/fonts";
import Colors from "../../constants/Colors";
import { windowHeight, windowWidth } from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { getValueFor } from "../../helpers";
import axios from "axios";
import urls from "../../constants/urls";
import { LOGIN } from "../../redux/actions";
import { minMaxLengthValidator } from "../../helpers/validators";
import { ActivityIndicator, Button } from "react-native";
import { CenteredButton } from "../../components/buttons";
import checkIfAnyisEmpty from "../../helpers/emptyString";
import SuccessModal, { EventSuccessModal } from "../../components/modal";
import { useNetInfo } from "@react-native-community/netinfo";
import { DangerText } from "../../components/text";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateView, { TimeView } from "../../components/dateView";
import {
  ObjectDropdownSelect,
  ObjectDropdownSelectWithValues,
} from "../../components/dropdown";
import FetchData from "../../helpers/data/fetchData";
import FetchDataWithoutToken from "../../helpers/data/fetchDataWithoutToken";
import PostDataWithoutToken from "../../helpers/data/postDataWithoutToken";

interface SaintInterface {
  first_name: string;
  last_name: string;
  id: number;
}

interface EventInterface {
  title: string;
  description: string;
  id: number;
  date: string;
}
const AddAttendance = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [snackVisible, setSnackVisible] = useState(false);
  const colorScheme = useColorScheme();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [saints, setSaints] = useState<any>([]);
  const [saint, setSaint] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [saintName, setSaintName] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [attendanceTime, setAttendanceTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setAttendanceTime(date);
    console.log(date);
    hideDatePicker();
  };
  useEffect(() => {
    if (error != "") {
      setSnackVisible(true);
      setTimeout(() => {
        setSnackVisible(false);
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    setLoading(true);
    FetchData({
      endpoint: urls.events,
      setData: setEvents,

      onFetchFail: () => {},
      onFetchSuccess: () => {},
      token: auth.token,
    });
    FetchData({
      endpoint: urls.saints,
      setData: setSaints,
      onFetchFail: () => {},
      onFetchSuccess: () => {
        setLoading(false);
      },
      token: auth.token,
    });
  }, []);

  function ValidateData() {
    if (~~temperature < 30 && ~~temperature > 39) {
      setError("please enter a valid temperature");
      return false;
    }
    if (saint === null) {
      setError("please select a  saint");
      return false;
    }
    if (event === null) {
      setError("please select an event");
      return false;
    } else {
      return true;
    }
  }

  if (loading) {
    return <ActivityIndicator animating={true} size={windowWidth / 10} />;
  } else {
    return (
      <View
        style={{
          width: windowWidth * 0.9,
          marginTop: windowHeight * 0.02,
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          <DangerText>{error}</DangerText>
        )}

        <View
          style={{
            width: windowWidth * 0.9,
          }}
        >
          <ObjectDropdownSelect
            data={events}
            onSelect={(e: any, i: any) => {
              setEvent(e);
            }}
            label="Select An Event"
            searchPlaceholder="Event"
            itemValue="title"
            iconFamily="MaterialIcons"
            iconName="event"
          />
          <ObjectDropdownSelectWithValues
            data={saints}
            onSelect={(e: any, i: any) => {
              setSaint(e);
            }}
            label="Select An Saint"
            searchPlaceholder="Saint"
            itemValues={["first_name", "last_name"]}
            iconFamily="Fontawesome5"
            iconName="user-alt"
          />
          <IconInput
            fontFamily={fonts.Regular}
            name="thermometer-half"
            iconColor={Colors[colorScheme].tint}
            family="fontawesome5"
            iconSize={windowWidth / 15}
            placeholder="eg.33"
            label="Temperature"
            change={(text: string) => {
              setTemperature(text);
            }}
          />
          <TimeView time={attendanceTime} showTime={showDatePicker} />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <EventSuccessModal
            name={saintName}
            buttonTitle="Add another"
            message="added attendance for"
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <CenteredButton
            hRatio={10}
            wRatio={2}
            style={{
              marginTop: windowHeight / 34,
              alignSelf: "center",
              marginBottom: windowHeight * 0.01,
            }}
            radiusRatio={20}
            title="Add Attendance"
            bgColor={Colors[colorScheme].tint}
            onPress={() => {
              if (
                !checkIfAnyisEmpty(
                  [[temperature, "The temperature"]],
                  setError,
                  "cannot be empty"
                )
              ) {
                if (ValidateData()) {
                  setLoading(true);
                  console.log({
                    event: event.id,
                    saint: saint?.id,
                    temperature: temperature,
                  });
                  NetInfo.fetch().then((state) => {
                    if (state.isConnected) {
                      PostDataWithoutToken({
                        endpoint: urls.attendances,
                        userData: {
                          event: event.id,
                          saint: saint.id,
                          temperature: temperature,
                          time: attendanceTime.toLocaleTimeString(),
                        },
                        onPostSuccess: () => {
                          setLoading(false);
                          setModalVisible(true);
                          setSaintName(saint?.first_name);
                          setSaint(null);
                          setTemperature("");
                          setEvent(null);
                          setError("");
                        },
                        onPostFail: (error: any) => {
                          setLoading(false);
                          console.log(error.response);
                          setError("Sorry an error occured");
                        },
                        onFetchTokenFail: () => {},
                      });
                    } else {
                      setError("Cannot create an  when you are offline");
                    }
                  });
                } else {
                  setLoading(false);
                }
              }
            }}
            color={Colors.common.text.foreground}
          />
        </View>

        <SnackBar
          visible={snackVisible}
          textMessage={error}
          actionHandler={() => {
            setSnackVisible(false);
          }}
          actionText="Ok"
        />
      </View>
    );
  }
};

export default AddAttendance;
