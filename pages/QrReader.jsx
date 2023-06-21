import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";

const QrReader = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>QrReader</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default QrReader;
