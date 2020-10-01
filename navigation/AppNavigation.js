import { createStackNavigator } from "react-navigation-stack";

import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

import DefaultValues from "../constants/DefaultValues";


const AppNavigation = createStackNavigator({
    Places: {
        screen: PlacesListScreen
    },
    PlaceDetail: {
        screen: PlaceDetailScreen
    },
    NewPlace: {
        screen: NewPlaceScreen
    },
    Map: {
        screen: MapScreen
    }
}, {
    defaultNavigationOptions: {
        headerTitleStyle: {
            fontFamily: DefaultValues.fontBold
        }
    }
});

export default AppNavigation;