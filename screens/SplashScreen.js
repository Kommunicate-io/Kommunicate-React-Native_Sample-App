import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModules } from 'react-native';

var RNKommunicateChat = NativeModules.RNKommunicateChat;


const SplashScreen = ({ navigation }) => {

    RNKommunicateChat.isLoggedIn((response) => {
        if(response == "True") {
            console.log("User is already logged in")    
            navigation.navigate("Main");
            return null;
        } else {
            console.log("Moving to login Screen as user is not logged in")    
            navigation.navigate("Login");
            return null;
        }
    });       
    return null;
}


export default SplashScreen