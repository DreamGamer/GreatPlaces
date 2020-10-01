import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StartScreen from "../screens/StartScreen";
import AppNavigation from "./AppNavigation";

const MainNavigation = createSwitchNavigator({
    Startup: {
        screen: StartScreen,
    },
    GreatPlaces: {
        screen: AppNavigation
    }
});

export default createAppContainer(MainNavigation);