import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { windowWidth, windowHeight } from "../constants/Layout";
import fonts from "../constants/fonts";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { EventCard } from "../components/cards";
import urls from "../constants/urls";
import { useEffect, useState } from "react";
import { getValueFor } from "../helpers";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import useColorScheme from "../hooks/useColorScheme";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. ,",
    image:
      "https://images.unsplash.com/photo-1586791965591-15d8892f6dd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbmluZyUyMHN1bnNldHxlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "https://pbs.twimg.com/media/E2PF-2YWYAQovEO.jpg",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",

    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptate maxime ,",
    image: "https://pbs.twimg.com/media/E2PF-2YWYAQovEO.jpg",
  },
];

const Item: React.FC<{ title: string; description: string; image: string }> = ({
  title,
  description,
  image,
}) => (
  <View
    style={{
      borderRadius: windowWidth / 20,
      overflow: "hidden",
    }}
  >
    <ImageBackground
      source={{ uri: image }}
      style={{
        // backgroundColor: "white",

        height: windowHeight / 4.5,
        width: windowWidth * 0.47,
        marginHorizontal: windowWidth * 0.01,
      }}
    >
      <View
        darkColor="rgba(3, 43, 95, 0.01)"
        lightColor="transparent"
        style={{ height: windowHeight / 8, justifyContent: "space-around" }}
      >
        {/* <Text
          style={{
            fontFamily: fonts.Bold,
            color: Colors.common.text.foreground,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: fonts.Regular,
            color: "white",
          }}
        >
          {description}
        </Text> */}
      </View>
    </ImageBackground>
  </View>
);

const Events = [
  {
    id: "1",
    title: "Baby Shalin Healing Celebration",
    image: "https://pbs.twimg.com/media/D3PpHynWsAA5JD2.jpg",
    date: "18th June 2022",
    time: "2:00pm",
  },
  {
    id: "2",
    title: "Bible Study",
    image: "https://pbs.twimg.com/media/D3PpHynWsAA5JD2.jpg",
    date: "12th July 2022",
    time: "2:00pm",
  },
  {
    id: "3",
    title: "National Repentance",
    image:
      "https://repentusa.net/wp-content/uploads/2019/10/ministry-of-repentance-and-holiness-PROPHET-DR-DAVID-OWUOR-THE-PROPHET-ELIJAH-THE-TWO-WITNESSES-OF-REV-11-rapture-end-time-prophecy-biblical-prophecy.jpg",
    date: "9th June 2022",
    time: "8:00am",
  },
];
export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [failGet, setFailGet] = useState(false);
  useEffect(() => {
    setLoading(true);

    getValueFor(setPassword, setUsername, setFailGet, setLoading).then(
      (data) => {
        // if (password != null && username != null) {
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
            console.log(resp.data);
            dispatch(
              LOGIN({
                loggedIn: true,
                username: resp.data.user.username,
                token: resp.data.token,
              })
            );

            axios({
              method: "GET",
              headers: {
                ContentType: "application/json",
                Authorization: `token ${resp.data.token} `,
              },
              url: `${urls.root}/api/events/`,
            })
              .then((resp) => {
                setLoading(false);
                setEvents(resp.data);
                console.log(resp.data);
              })
              .catch((error) => {
                setLoading(false);
                // Alert.alert(
                //   "An error occured,please check your network and try again"
                // );
                console.log(error.response.data);
                console.log(Object.getOwnPropertyNames(error.response.data));
                setError(
                  "Error occured when trying to fetch accountability groups"
                );
              });
          })
          .catch((error) => {
            setLoading(false);
            setFailGet(true);
            console.log(error);
            // console.log(Object.getOwnPropertyNames(error));
          });
        // }
      }
    );
  }, [refresh]);
  const renderItem: React.FC<{ item: any }> = ({ item }) => (
    <Item
      title={item.title}
      description={item.description}
      image={item.image}
    />
  );
  const renderEvent: React.FC<{ item: any }> = ({ item }) => (
    <EventCard
      title={item.title}
      description={item.description}
      date={item.date}
    />
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: windowHeight / 50,
        }}
      >
        <FlatList
          horizontal
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View>
        <View>
          <Text
            style={{
              fontFamily: fonts.Bold,
              color: Colors[colorScheme].text,
              marginTop: windowHeight * 0.01,
            }}
          >
            Events
          </Text>
          <View
            style={{
              height: windowHeight * 0.56,
              // alignItems: "center",
            }}
          >
            {loading && (
              <ActivityIndicator
                color={Colors[colorScheme].tint}
                animating={loading}
              />
            )}
            <FlatList
              contentContainerStyle={{
                width: windowWidth / 1,

                alignItems: "center",
              }}
              refreshing={loading}
              onRefresh={() => {
                setRefresh(refresh + 1);
              }}
              data={events}
              renderItem={renderEvent}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderRadius: windowWidth / 20,
    height: windowHeight / 4,
    width: windowWidth * 0.5,
    marginHorizontal: windowWidth * 0.01,
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
