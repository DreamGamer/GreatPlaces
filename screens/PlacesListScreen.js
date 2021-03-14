import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesAction from "../store/action/places";

const PlaceListScreen = props => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(placesAction.loadPlaces());
    }, [dispatch]);

    return (
        <View>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <PlaceItem
                        image={itemData.item.imageURI}
                        title={itemData.item.title}
                        latitude={itemData.item.latitude}
                        longitude={itemData.item.longitude}
                        onSelect={() => {
                            props.navigation.navigate("PlaceDetail", { placeTitle: itemData.item.title, placeID: itemData.item.id });
                        }}
                    />
                )}
            />
        </View>
    );
};

PlaceListScreen.navigationOptions = navigationData => {
    return {
        title: "All Places",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add Place"
                    iconName="md-add"
                    onPress={() => {
                        navigationData.navigation.navigate("NewPlace");
                    }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({});

export default PlaceListScreen;
