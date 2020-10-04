import React from 'react';
import { View, StyleSheet} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import HeaderButton from "../components/HeaderButton";

const PlaceListScreen = props => {
    return (
        <View>

        </View>
    )
};

PlaceListScreen.navigationOptions = navigationData => {
    return {
        title: "All Places",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Add Place" iconName="md-add" onPress={() => {}} />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({

});

export default PlaceListScreen;