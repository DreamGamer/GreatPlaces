import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageSelector = props => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

        if (result.status !== "granted") {
            Alert.alert("Insufficient permissions!", "You need to grant camera permissions to use the camera.", [{ text: "Okay" }]);
            return false;
        }

        return true;
    };

    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();

        if (!hasPermissions) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [16, 9], quality: 0.5 });
        setPickedImage(image.uri);

        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imageSelector}>
            <View style={styles.imagePreview}>{pickedImage ? <Image style={styles.image} source={{ uri: pickedImage }} /> : <Text>No image picked yet.</Text>}</View>
            <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    imageSelector: {
        alignItems: "center",
        marginBottom: 20,
    },
    imagePreview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default ImageSelector;
