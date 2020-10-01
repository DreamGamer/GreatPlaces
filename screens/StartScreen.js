import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from '../constants/Colors';


const StartScreen = props => {

    useEffect(() =>{
        props.navigation.navigate("GreatPlaces");
    });

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.grey}  />
        </View>
    )
};  


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default StartScreen;