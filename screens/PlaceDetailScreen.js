import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const PlaceDetailScreen = props => {
    const placeID = props.navigation.getParam("placeID");
    const selectedPlace = useSelector(state => state.places.places.find(place => place.id === placeID));

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image source={{ uri: selectedPlace.imageURI }} style={styles.image} />
            <View style={styles.coordsContainer}>
                <Text style={styles.coords}>Latitude: {selectedPlace.latitude}</Text>
                <Text style={styles.coords}>Longitude: {selectedPlace.longitude}</Text>
            </View>
        </ScrollView>
    );
};

PlaceDetailScreen.navigationOptions = navigationData => {
    return {
        title: navigationData.navigation.getParam("placeTitle"),
    };
};

const styles = StyleSheet.create({
    image: {
        height: "35%",
        minHeight: 300,
        width: "100%",
        backgroundColor: "#ccc",
    },
    coordsContainer: {
        padding: 20,
    },
    coords: {
        color: Colors.primary,
        textAlign: "center",
    },
});

export default PlaceDetailScreen;
