import axios from "axios";
import React, { SetStateAction, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { CenteredButton } from "../../components/buttons";
import { IconInput } from "../../components/input";
import { DangerText } from "../../components/text";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import fonts from "../../constants/fonts";
import { windowHeight, windowWidth } from "../../constants/Layout";
import urls from "../../constants/urls";
import useColorScheme from "../../hooks/useColorScheme";
import { LOGIN } from "../../redux/actions";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import { getValueFor, secureSave } from "../../helpers";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaderColor, setLoaderColor] = useState(Colors.common.tint);
  const [failGet, setFailGet] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={{}}>
        <IconInput
          fontFamily={fonts.Regular}
          name="user-alt"
          iconColor={Colors[colorScheme].tint}
          family="fontawesome5"
          iconSize={windowWidth / 15}
          placeholder="eg.Charles"
          label="Username"
          change={(text: string) => {
            setUsername(text);
          }}
        />
        <IconInput
          fontFamily={fonts.Regular}
          name="lock"
          iconColor={Colors[colorScheme].tint}
          family="Fontawesome"
          iconSize={windowWidth / 15}
          placeholder="eg 324545223"
          label="Password"
          visibility={passwordVisible}
          visibilityIcon
          setVisibility={setPasswordVisible}
          TextInputProps={{
            secureTextEntry: passwordVisible,
          }}
          change={(text: string) => {
            setPassword(text);
          }}
        />
        <DangerText>{error}</DangerText>
        <CenteredButton
          hRatio={10}
          wRatio={2}
          style={{
            marginTop: windowHeight / 34,
            alignSelf: "center",
            marginBottom: windowHeight * 0.01,
          }}
          radiusRatio={20}
          title="Login"
          bgColor={Colors[colorScheme].tint}
          onPress={() => {
            setLoading(true);
            NetInfo.fetch().then((state) => {
              console.log("Connection type", state.type);

              console.log("Is connected?", state.isConnected);
              if (username == "") {
                setError("enter a username");
              } else if (password == "") {
                setError("enter a password");
              } else if (state.isConnected) {
                setError("");

                axios({
                  method: "POST",
                  headers: {
                    ContentType: "application/json",
                  },
                  url: `${urls.root}/auth/login`,
                  data: {
                    username: username,
                    password: password,
                  },
                })
                  .then((resp) => {
                    setLoading(false);
                    console.log(resp.data);
                    secureSave("password", password);
                    secureSave("username", username);

                    dispatch(
                      LOGIN({
                        loggedIn: true,
                        username: resp.data.username,
                        token: resp.data.token,
                      })
                    );
                  })
                  .catch((error) => {
                    setLoading(false);
                    if (error.response.data.non_field_errors) {
                      setError("You have entered incorrect credentials");
                    }
                    console.log(error);
                    console.log(Object.getOwnPropertyNames(error));
                  });
              } else {
                setError("Cannot login when you are offline");
              }
            });
          }}
          color={Colors.common.text.foreground}
        />
        {loading && (
          <ActivityIndicator
            animating={loading}
            color={error !== "" ? "red" : Colors[colorScheme].tint}
          />
        )}
      </View>
    </View>
  );
}

function PasswordValidator(password: string, username: string, setError: any) {
  if (password.length < 6) {
    setError("Error: Password must contain at least six characters!");
    //form.pwd1.focus();
    return false;
  }
  if (password == username) {
    setError("Error: Password must be different from Username!");
    //form.pwd1.focus();
    return false;
  }
  var re = /[0-9]/;
  if (!re.test(password)) {
    setError("Error: password must contain at least one number (0-9)!");
    //form.pwd1.focus();
    return false;
  }
  re = /[a-z]/;
  if (!re.test(password)) {
    setError(
      "Error: password must contain at least one lowercase letter (a-z)!"
    );
    //form.pwd1.focus();
    return false;
  }
  re = /[A-Z]/;
  if (!re.test(password)) {
    setError(
      "Error: password must contain at least one uppercase letter (A-Z)!"
    );
    //form.pwd1.focus();
    return false;
  }
  setError("");
  return true;
}
function ValidateEmail(inputText: string, setEmailValidationError: any) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    setEmailValidationError("Valid email address!");
    return true;
  } else {
    setEmailValidationError("You have entered an invalid email address!");
    return false;
  }
}
