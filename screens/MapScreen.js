import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 44.7,
        longitude: 44.2,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const selectLocationHandler = event => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("Can't Save", "You don't picked an location yet.", [{ text: "okay" }]);
            return;
        }

        props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler });
    }, [savePickedLocationHandler]);

    return (
        <MapView region={mapRegion} style={styles.map} onPress={selectLocationHandler}>
            {selectedLocation && <Marker title="Picked Location" coordinate={selectedLocation}></Marker>}
        </MapView>
    );
};

MapScreen.navigationOptions = navigationData => {
    const saveLocationFunction = navigationData.navigation.getParam("saveLocation");
    return {
        title: "Map",
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={saveLocationFunction}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    headerButtonText: {
        fontSize: 16,
    },
    headerButton: {
        marginHorizontal: 20,
    },
});

export default MapScreen;
