import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Text, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const { onLocationPicked } = props;

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);

        if (result.status !== "granted") {
            Alert.alert("Insufficient permissions!", "You need to grant location permissions.", [{ text: "Okay" }]);
            return false;
        }

        return true;
    };

    const choosedLocation = props.navigation.getParam("pickedLocation");

    useEffect(() => {
        if (choosedLocation) {
            setPickedLocation(choosedLocation);
            onLocationPicked(choosedLocation);
        }
    }, [choosedLocation, onLocationPicked]);

    const pickOnMapHandler = () => {
        props.navigation.navigate("Map");
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            setPickedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            onLocationPicked({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            Alert.alert("Could not fetch location!", "Please try again later", [{ text: "okay" }]);
        }

        setIsFetching(false);
    };

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {isFetching ? (
                    <ActivityIndicator color={Colors.primary} size="large" />
                ) : (
                    <View>
                        {pickedLocation ? (
                            <View>
                                <Text>Latitude: {pickedLocation.latitude}</Text>
                                <Text>Longitude: {pickedLocation.longitude}</Text>
                            </View>
                        ) : (
                            <Text>No location chosen yet!</Text>
                        )}
                    </View>
                )}
            </View>
            <View style={styles.actions}>
                <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler} />
                <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
});

export default LocationPicker;
