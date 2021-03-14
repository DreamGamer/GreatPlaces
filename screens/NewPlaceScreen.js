import React, { useState, useCallback } from "react";
import { View, StyleSheet, Button, Text, ScrollView, TextInput } from "react-native";
import DefaultValues from "../constants/DefaultValues";
import { useDispatch } from "react-redux";
import * as placesAction from "../store/action/places";

import ImageSelector from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState("");

    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = value => {
        setTitleValue(value);
    };

    const savePlaceHandler = () => {
        try {
            dispatch(placesAction.addPlace(titleValue, selectedImage, selectedLocation));
            props.navigation.goBack();
        } catch (error) {
            console.log("ERROR in NewPlaceScreen: " + error);
        }
    };

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
                <ImageSelector onImageTaken={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
                <Button title="Save Place" onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    );
};

NewPlaceScreen.navigationOptions = navigationData => {
    return {
        title: "New Place",
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    label: {
        fontSize: 18,
        fontFamily: DefaultValues.fontRegular,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
});

export default NewPlaceScreen;
