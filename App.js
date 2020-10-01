import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import NavigationContainer from "./navigation/NavigationContainer";
import * as Font from "expo-font";
import { AppLoading } from "expo";

export default function App() {
  // OPTIMIZE Screens
  enableScreens();

  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      "ms-new-tai-lue": require("./assets/fonts/microsoft-new-tai-lue-regular.ttf"),
      "ms-new-tai-lue-bold": require("./assets/fonts/microsoft-new-tai-lue-bold.ttf"),
    })
  }

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} />
  }

  return (
      <NavigationContainer />
  );
}

const styles = StyleSheet.create({
});
