import { View, Text } from "../components/Themed";
import SnackBar from "react-native-snackbar-component";
import React, { useEffect, useState } from "react";
import { IconInput } from "../components/input";
import fonts from "../constants/fonts";
import Colors from "../constants/Colors";
import { windowHeight, windowWidth } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import { useDispatch } from "react-redux";
import { getValueFor } from "../helpers";
import axios from "axios";
import urls from "../constants/urls";
import { LOGIN } from "../redux/actions";
import { minMaxLengthValidator } from "../helpers/validators";
import { ActivityIndicator, Button } from "react-native";
import { CenteredButton } from "../components/buttons";
import checkIfAnyisEmpty from "../helpers/emptyString";
import { EventSuccessModal } from "../components/modal";
import { DangerText } from "../components/text";
import NetInfo from "@react-native-community/netinfo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateView from "../components/dateView";

const AddEvent = () => {
  const dispatch = useDispatch();
  const [snackVisible, setSnackVisible] = useState(false);
  const colorScheme = useColorScheme();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [failGet, setFailGet] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());

  useEffect(() => {
    if (error != "") {
      setSnackVisible(true);
      setTimeout(() => {
        setSnackVisible(false);
      }, 5000);
    }
  }, [error]);

  function ValidateData() {
    if (!minMaxLengthValidator(title, 2, 10)) {
      setError("the first name  must be more than 5 letters ");
      return false;
    } else {
      return true;
    }
  }
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setEventDate(date);
    console.log(date);
    hideDatePicker();
  };

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
          <IconInput
            fontFamily={fonts.Regular}
            name="event"
            iconColor={Colors[colorScheme].tint}
            family="MaterialIcons"
            iconSize={windowWidth / 15}
            placeholder="eg. Wednesday fellowship"
            label="Event title"
            change={(text: string) => {
              setTitle(text);
            }}
          />
          <IconInput
            fontFamily={fonts.Regular}
            name="text"
            iconColor={Colors[colorScheme].tint}
            family="Entypo"
            iconSize={windowWidth / 15}
            placeholder="eg. we will be having....."
            label="Description"
            change={(text: string) => {
              setDescription(text);
            }}
          />

          <DateView date={eventDate} showDate={showDatePicker} />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <EventSuccessModal
            name={title}
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
            title="Add event"
            bgColor={Colors[colorScheme].tint}
            onPress={() => {
              if (
                !checkIfAnyisEmpty(
                  [
                    [title, "The event title "],
                    [description, "The event description"],
                  ],
                  setError,
                  "cannot be empty"
                )
              ) {
                if (ValidateData()) {
                  setLoading(true);
                  NetInfo.fetch().then((state) => {
                    if (state.isConnected) {
                      axios({
                        method: "post",
                        headers: {
                          ContentType: "application/json",
                          Authorization: `token ${token} `,
                        },
                        url: `${urls.root}/api/events/`,
                        data: {
                          title: title,
                          description: description,
                          date: eventDate.toISOString(),
                        },
                      })
                        .then((resp) => {
                          setLoading(false);
                          console.log(resp);
                          setModalVisible(true);
                        })
                        .catch((error) => {
                          setLoading(false);
                          console.log(error.response.data);
                          console.log(
                            Object.getOwnPropertyNames(error.response.data)
                          );
                          setError("Some error occured");
                        });
                    } else {
                      setError("Cannot create an when you are offline");
                    }
                  });
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

export default AddEvent;
