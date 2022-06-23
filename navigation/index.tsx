/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ActivityIndicator, ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/home";
import RegisterUserScreen from "../screens/register-user";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SearchScreen from "../screens/search";
import LoginScreen from "../screens/auth/login";
import { useDispatch, useSelector } from "react-redux";
import { getValueFor, secureSave } from "../helpers";
import urls from "../constants/urls";
import axios from "axios";
import { LOGIN } from "../redux/actions";
import { View } from "../components/Themed";
import Loading from "../screens/loading";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  const authToken = useSelector((state: any) => state.auth);
  const [failGet, setFailGet] = React.useState(false);
  const [username, setUsername] = React.useState(null);
  const auth = useSelector((state: any) => state.auth);
  const [password, setPassword] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    getValueFor(setPassword, setUsername, setFailGet, setLoading).then(() => {
      if (password != null && username != null) {
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
            console.log("initial request");
            setToken(resp.data.token);
            setFailGet(false);
            console.log(resp.data);
            dispatch(
              LOGIN({
                loggedIn: true,
                username: resp.data.user.username,
                token: resp.data.token,
              })
            );
          })
          .catch((error) => {
            setLoading(false);
            setFailGet(true);
            console.log(error);
            // console.log(Object.getOwnPropertyNames(error));
          });
      }
    });

    setLoading(false);
  }, []);

  return (
    <Stack.Navigator>
      {!password && !username ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
const Decision = () => {
  return <></>;
};
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="RegisterUser"
        component={RegisterUserScreen}
        options={({ navigation }: RootTabScreenProps<"RegisterUser">) => ({
          title: "Register",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-plus" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }: RootTabScreenProps<"Search">) => ({
          title: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
