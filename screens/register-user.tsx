import { Entypo, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet } from "react-native";

import { CenteredButton } from "../components/buttons";
import { DropdownSelect, ObjectDropdownSelect } from "../components/dropdown";
import SnackBar from "react-native-snackbar-component";
import NetInfo from "@react-native-community/netinfo";
import EditScreenInfo from "../components/EditScreenInfo";
import { IconInput, IconSelector } from "../components/input";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import fonts from "../constants/fonts";
import fontSizes from "../constants/fontSizes";
import { windowHeight, windowWidth } from "../constants/Layout";
import useColorScheme from "../hooks/useColorScheme";
import urls from "../constants/urls";
import { DangerText } from "../components/text";
import checkIfAnyisEmpty from "../helpers/emptyString";
import { useDispatch, useSelector } from "react-redux";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { getValueFor } from "../helpers";
import { LOGIN } from "../redux/actions";
import SuccessModal from "../components/modal";
import data from "../data";
import {
  minMaxLengthValidator,
  validatePhoneNumber,
} from "../helpers/validators";
import FetchDataWithoutToken from "../helpers/data/fetchDataWithoutToken";
import PostDataWithoutToken from "../helpers/data/postDataWithoutToken";
import GroupSetNull, { GroupStringSetNull } from "../helpers/setNull";
import FetchData from "../helpers/data/fetchData";
import PostData from "../helpers/data/postData";

export default function UserRegistration() {
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();
  const [accountabilityGroups, setAccountabilityGroups] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [events, setEvents] = useState(null);
  const colorScheme = useColorScheme();
  const [snackVisible, setSnackVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [residence, setResidence] = useState("");
  const [homeCounty, setHomeCounty] = useState("");
  const [kinName, setKinName] = useState("");
  const [kinContact, setKinContact] = useState("");
  const [occupation, setOccupation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [accountabilityGroup, setAccountabilityGroup] = useState(null);
  const [gender, setGender] = useState("");
  const [married, setMarried] = useState("no");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState(20);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDate, setEventDate] = useState(null);
  const [visitor, setVisitor] = useState("no");
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
      token: token,
    });
    FetchData({
      endpoint: urls.departments,
      setData: setDepartments,
      onFetchFail: () => {},
      onFetchSuccess: () => {},
      token: token,
    });
    FetchData({
      endpoint: urls.groups,
      setData: setAccountabilityGroups,
      onFetchFail: (error: any) => {
        console.error(error);
      },
      onFetchSuccess: (data: any) => {
        setLoading(false);
      },
      token: token,
    });
  }, []);

  function ValidateData() {
    if (!minMaxLengthValidator(firstName, 2, 10)) {
      setError("the first name  must be more than 2 ");
      return false;
    }
    if (!minMaxLengthValidator(lastName, 2, 10)) {
      setError("the length of last name must be more than 2");
      return false;
    }
    if (IDNumber.length > 9) {
      setError("the length of ID must not be more than 7 digits");
      return false;
    }
    if (!minMaxLengthValidator(residence, 3, 12)) {
      setError("please enter a valid residence");
      return false;
    }
    if (!minMaxLengthValidator(kinName, 3, 15)) {
      setError("please enter a valid residence");
      return false;
    }
    if (!minMaxLengthValidator(occupation, 4, 15)) {
      setError("please enter a valid occupation");
      return false;
    }
    if (!validatePhoneNumber(phone)) {
      setError("please enter a valid phone number");
      return false;
    }
    if (!validatePhoneNumber(kinContact)) {
      setError("please enter a valid kin phone number");
      return false;
    }
    if (~~temperature < 30 && ~~temperature > 39) {
      setError("please enter a valid temperature");
      return false;
    }
    if (age > 120) {
      setError("the age is too big");
      return false;
    }
    if (age < 1) {
      setError("the age is so low");
      return false;
    } else {
      return true;
    }
  }
  if (accountabilityGroups === null || events === null) {
    return <ActivityIndicator animating={true} size={windowWidth / 10} />;
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: windowWidth * 0.9,
            marginTop: windowHeight * 0.02,
            flexDirection: "column",
            flex: 1,
          }}
        >
          {loading ? (
            <ActivityIndicator animating={loading} />
          ) : (
            <DangerText>{error}</DangerText>
          )}

          <ScrollView
            style={{
              width: windowWidth * 0.9,
            }}
          >
            <IconInput
              fontFamily={fonts.Regular}
              name="user-alt"
              iconColor={Colors[colorScheme].tint}
              family="fontawesome5"
              iconSize={windowWidth / 15}
              placeholder="First Name"
              label="First name"
              change={(text: string) => {
                setFirstName(text);
              }}
            />
            <IconInput
              fontFamily={fonts.Regular}
              name="user-alt"
              iconColor={Colors[colorScheme].tint}
              family="fontawesome5"
              iconSize={windowWidth / 15}
              placeholder="Last Name"
              label="Last name"
              change={(text: string) => {
                setLastName(text);
              }}
            />
            <IconInput
              fontFamily={fonts.Regular}
              name="idcard"
              iconColor={Colors[colorScheme].tint}
              family="AntDesign"
              iconSize={windowWidth / 15}
              placeholder="eg 324545223"
              label="ID Number"
              change={(text: string) => {
                setIDNumber(text);
              }}
            />

            <IconInput
              fontFamily={fonts.Regular}
              name="phone"
              iconColor={Colors[colorScheme].tint}
              family="fontawesome"
              iconSize={windowWidth / 15}
              placeholder="eg.0720 xxx xxx"
              label="Phone number"
              change={(text: string) => {
                setPhone(text);
              }}
            />
            <IconInput
              fontFamily={fonts.Regular}
              name="date-range"
              iconColor={Colors[colorScheme].tint}
              family="MaterialIcons"
              iconSize={windowWidth / 15}
              placeholder="eg.32"
              label="Age"
              change={(text: string) => {
                setAge(~~text);
              }}
            />
            <IconInput
              fontFamily={fonts.Regular}
              name="location-pin"
              iconColor={Colors[colorScheme].tint}
              family="MaterialIcons"
              iconSize={windowWidth / 15}
              placeholder="eg. Huruma"
              label="Place of Residence"
              change={(text: string) => {
                setResidence(text);
              }}
            />
            <IconInput
              fontFamily={fonts.Regular}
              name="user-friends"
              iconColor={Colors[colorScheme].tint}
              family="fontawesome5"
              iconSize={windowWidth / 15}
              placeholder="eg. Kimani Wangeci"
              label="Next of Kin name"
              change={(text: string) => {
                setKinName(text);
              }}
            />
            <IconInput
              fontFamily={fonts.Regular}
              name="phone"
              iconColor={Colors[colorScheme].tint}
              family="fontawesome"
              iconSize={windowWidth / 15}
              placeholder="eg.0720 xxx xxx"
              label="Next of kin contact"
              change={(text: string) => {
                setKinContact(text);
              }}
            />
            <IconInput
              fontFamily={fonts.Regular}
              name="work"
              iconColor={Colors[colorScheme].tint}
              family="materialicons"
              iconSize={windowWidth / 15}
              placeholder="eg. Nurse"
              label="Occupation"
              change={(text: string) => {
                setOccupation(text);
              }}
            />

            <DropdownSelect
              data={data.counties}
              onSelect={(e: any, i: any) => {
                setHomeCounty(e);
              }}
              label="Home County"
              searchPlaceholder="county"
              iconFamily="MaterialIcons"
              iconName="person-pin-circle"
            />
            <DropdownSelect
              data={["sister", "brother"]}
              onSelect={(e: any, i: any) => {
                setGender(e);
              }}
              label="Gender"
              searchPlaceholder="brother/sister"
              iconFamily="Ionicons"
              iconName="person"
            />
            <DropdownSelect
              data={["yes", "no"]}
              onSelect={(e: any, i: any) => {
                setMarried(e);
              }}
              label="Married"
              searchPlaceholder="yes/no"
              iconFamily="Fontawesome5"
              iconName="ring"
            />
            <DropdownSelect
              data={["yes", "no"]}
              onSelect={(e: any, i: any) => {
                setMarried(e);
              }}
              label="Visitor"
              searchPlaceholder="yes/no"
              iconFamily="MaterialIcons"
              iconName="directions-walk"
            />
            <SuccessModal
              name={firstName}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />

            <ObjectDropdownSelect
              data={departments}
              onSelect={(e: any, i: any) => {
                setDepartments(e.id);
              }}
              label="Department"
              searchPlaceholder="Department"
              itemValue="name"
              iconFamily="Fontawesome5"
              iconName="building"
            />
            <ObjectDropdownSelect
              data={accountabilityGroups}
              onSelect={(e: any, i: any) => {
                setAccountabilityGroup(e.id);
              }}
              label="Acc. Group"
              searchPlaceholder="Group"
              itemValue="group_name"
              iconFamily="Fontawesome"
              iconName="group"
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
              title="Register Member"
              bgColor={Colors[colorScheme].tint}
              onPress={() => {
                if (
                  !checkIfAnyisEmpty(
                    [
                      [firstName, "The first name "],
                      [lastName, "The last name"],
                      [gender, "the gender"],
                      [phone, "the phone number"],
                    ],
                    setError,
                    "cannot be empty"
                  )
                ) {
                  if (ValidateData()) {
                    setLoading(true);
                    NetInfo.fetch().then((state) => {
                      if (events !== null) {
                        if (state.isConnected) {
                          PostData({
                            endpoint: urls.saints,
                            userData: {
                              first_name: firstName,
                              last_name: lastName,
                              home_county: homeCounty,
                              accountability_group: accountabilityGroup,
                              id_number: IDNumber,
                              kin_name: kinName,
                              age: age,
                              kin_phone: kinContact,
                              residence: residence,
                              gender: gender,
                              occupation: occupation,
                              married: married == "yes" ? true : false,
                              phone_number: phone,
                              visitor: visitor == "yes" ? true : false,
                            },
                            onPostFail: (error: any) => {
                              setLoading(false);
                              console.log(error.response);
                              setError(error.message);
                            },
                            onPostSuccess: () => {
                              setLoading(false);
                              setModalVisible(true);
                              setError("");
                              GroupStringSetNull([
                                setFirstName,
                                setLastName,
                                setHomeCounty,
                                setResidence,
                                setGender,
                                setOccupation,
                                setPhone,
                                setKinContact,
                                setIDNumber,
                                setKinName,
                              ]);
                              GroupSetNull([setAccountabilityGroup]);
                            },
                            token: token,
                          });
                        } else {
                          setError(
                            "Cannot register a user when you are offline"
                          );
                        }
                      }
                    });
                  }
                }
              }}
              color={Colors.common.text.foreground}
            />
          </ScrollView>

          <SnackBar
            visible={snackVisible}
            textMessage={error}
            actionHandler={() => {
              setSnackVisible(false);
            }}
            actionText="Ok"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
