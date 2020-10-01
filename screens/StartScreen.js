import React from 'react';
import { View, StyleSheet, Text } from "react-native";


const StartScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>StartScreen</Text>
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