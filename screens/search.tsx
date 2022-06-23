import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { SearchBar } from "../components/searchBar";
import { SmText } from "../components/text";
import { Text, View } from "../components/Themed";
import UserView from "../components/user-view";
import UsersTopView from "../components/UsersTopView";
import Colors from "../constants/Colors";
import { windowHeight, windowWidth } from "../constants/Layout";
import urls from "../constants/urls";
import { getValueFor } from "../helpers";
import useColorScheme from "../hooks/useColorScheme";
import { LOGIN } from "../redux/actions";

const users = [
  {
    id: "1",
    name: "Mama Praise Melody",
    age: "29",
    group: "1",
    residence: "Kahawa west",
  },
  {
    id: "2",
    name: "James Kalvin",
    age: "29",
    group: "1",
    residence: "Olengo Musa",
  },
  {
    id: "8",
    name: "Yvonne Musawa",
    age: "29",
    group: "4",
    residence: "Lucky summer",
  },
  {
    id: "3",
    name: "Mama Joy Melody",
    age: "29",
    group: "22",
    residence: "Brook",
  },
  {
    id: "4",
    name: "Mama Praise Melody",
    age: "29",
    group: "13",
    residence: "Kahawa west",
  },
  {
    id: "5",
    name: "James Kalvin",
    age: "29",
    group: "11",
    residence: "Olengo Musa",
  },
  {
    id: "6",
    name: "Yvonne Musawa",
    age: "29",
    group: "31",
    residence: "Lucky summer",
  },
  {
    id: "7",
    name: "Mama Joy Melody",
    age: "29",
    group: "21",
    residence: "Brook",
  },
  {
    id: "22",
    name: "Mama Praise Melody",
    age: "29",
    group: "13",
    residence: "Kahawa west",
  },
  {
    id: "9",
    name: "James Kalvin",
    age: "29",
    group: "11",
    residence: "Olengo Musa",
  },
  {
    id: "10",
    name: "Yvonne Musawa",
    age: "29",
    group: "31",
    residence: "Lucky summer",
  },
  {
    id: "11",
    name: "Mama Joy Melody",
    age: "29",
    group: "21",
    residence: "Brook",
  },
];

const stringToRegex = (str: string) => {
  // Main regex
  const main = str.match(/\/(.+)\/.*/)[1];

  // Regex options
  const options = str.match(/\/.+\/(.*)/)[1];

  // Compiled regex
  return new RegExp(main, options);
};

const SearchScreen = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const [membersList, setMembersList] = useState(users);
  const [refresh, setRefresh] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [saints, setSaints] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [failGet, setFailGet] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
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
              url: `${urls.root}/api/saints/`,
            })
              .then((resp) => {
                setLoading(false);
                setSaints(resp.data);
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
    <UserView
      age={item.age}
      group={item.accountability_group}
      first_name={item.first_name}
      last_name={item.last_name}
      residence={item.residence}
    />
  );

  return (
    <View>
      <SearchBar
        onSearch={() => {
          setMembersList(
            membersList.filter((member) => {
              return member.name.match(stringToRegex(`/${searchText}/i`));
            })
          );
        }}
        onChangeText={(text: any) => {}}
      />

      <View>
        <SmText>Members</SmText>
        <View
          style={{
            width: windowWidth,
          }}
        >
          <UsersTopView />
        </View>
        <View
          style={{
            height: windowHeight * 0.753,
          }}
        >
          {loading && (
            <ActivityIndicator
              color={Colors[colorScheme].tint}
              animating={loading}
            />
          )}
          <FlatList
            data={saints}
            refreshing={loading}
            onRefresh={() => {
              setRefresh(refresh + 1);
            }}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
