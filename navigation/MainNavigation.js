import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StartScreen from "../screens/StartScreen";
//import AppNavigation from "./AppNavigation";

const MainNavigation = createSwitchNavigator({
    Start: {
        screen: StartScreen,
    },
    // App: {
    //     screen: AppNavigation
    // }
});

export default createAppContainer(MainNavigation);