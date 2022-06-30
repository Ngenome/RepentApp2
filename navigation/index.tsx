import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
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
  AttendanceDetailRouteParams,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SearchScreen from "../screens/search";
import LoginScreen from "../screens/auth/login";
import { useDispatch, useSelector } from "react-redux";
import { getValueForWithoutSetState } from "../helpers";
import urls from "../constants/urls";
import axios from "axios";
import { LOGIN } from "../redux/actions";
import { Text, View } from "../components/Themed";
import Loading from "../screens/loading";
import AddEvent from "../screens/addEvent";
import AddAttendance from "../screens/attendances/addAttendance";
import AttendancesView from "../screens/attendances/attendanceView";
import AttendanceDetailScreen from "../screens/attendances/attendanceDetailScreen";
import GroupAttendanceDetailScreen from "../screens/attendances/group-attendances";
import * as SplashScreen from "expo-splash-screen";
import SaintView from "../screens/saintView";
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
  const [appIsReady, setAppIsReady] = React.useState(false);
  const colorScheme = useColorScheme();
  async function prepare() {
    try {
      await SplashScreen.preventAutoHideAsync();
      getValueForWithoutSetState().then((data) => {
        axios({
          method: "POST",
          headers: {
            ContentType: "application/json",
          },
          url: `${urls.root}/auth/login`,
          data: {
            username: data?.username,
            password: data?.password,
          },
        })
          .then((resp) => {
            setLoading(false);
            console.log("initial request");
            setToken(resp.data.token);
            setFailGet(false);
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
            console.warn(error);
          });
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  }

  React.useEffect(() => {
    prepare();
  }, []);

  React.useEffect(() => {
    const hideSplash = async () => {
      if (!loading) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [loading]);

  if (!appIsReady || loading) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="loading"
          component={Loading}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          animation: "fade",
          headerTitleStyle: {},
          headerStyle: {
            backgroundColor: Colors[colorScheme].viewBackground,
          },
        }}
      >
        {!auth.loggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
            initialParams={{
              loading: loading,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AttendancesView"
              component={AttendancesView}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="AttendanceDetailScreen"
              component={AttendanceDetailScreen}
              options={({ route }: AttendanceDetailRouteParams) => ({
                headerTitle: route.params?.event,
              })}
            />
            <Stack.Screen
              name="GroupAttendanceDetailScreen"
              component={GroupAttendanceDetailScreen}
              options={({ route }: AttendanceDetailRouteParams) => ({
                headerTitle: route.params?.event,
              })}
            />
            <Stack.Screen
              name="SaintViewScreen"
              component={SaintView}
              options={({ route }: any) => ({
                headerTitle: `${route.params?.saint.first_name} ${route.params?.saint.last_name}`,
              })}
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
}
const Decision = () => {
  return;
  <></>;
};
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme].viewBackground,
        },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
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
                color={Colors[colorScheme].light}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="RegisterUser"
        component={RegisterUserScreen}
        options={({ navigation }: RootTabScreenProps<"RegisterUser">) => ({
          title: "Register",

          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-plus" size={24} color={color} />
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
      <BottomTab.Screen
        name="AddEvent"
        component={AddEvent}
        options={({ navigation }: RootTabScreenProps<"AddEvent">) => ({
          title: "Add an Event",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={24} color={color} />
          ),
        })}
      />

      <BottomTab.Screen
        name="AddAttendance"
        component={AddAttendance}
        options={({ navigation }: RootTabScreenProps<"AddAttendance">) => ({
          title: "Attendance",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar-plus-o" size={24} color={color} />
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
