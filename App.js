import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from "react-native-screens";
import NavigationContainer from "./navigation/NavigationContainer";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/reducer/places"
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./helpers/db";

init().then(() => {
  console.log("Initialized database")
}).catch(error => {
  console.log("Initialized db failed");
  console.log(error);
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

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
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );

}

const styles = StyleSheet.create({
});
