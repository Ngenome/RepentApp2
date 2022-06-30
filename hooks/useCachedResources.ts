import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { getValueFor, getValueForWithoutSetState } from "../helpers";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_700Bold,
  });
  // const dispatch = useDispatch();
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete && fontsLoaded;
}
