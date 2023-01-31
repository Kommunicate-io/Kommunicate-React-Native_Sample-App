import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModules, NativeEventEmitter } from 'react-native';

var RNKommunicateChat = NativeModules.RNKommunicateChat;


const SplashScreen = ({ navigation }) => {
    const eventEmitter = new NativeEventEmitter(RNKommunicateChat);
    const eventListener = eventEmitter.addListener("onMessageReceived", event => {
        console.log("onMessageReceived" + event.data );
    });

    // eventEmitter.addListener("onPluginDismiss", event => {
    //     console.log("onPluginDismiss" );
    // });
    eventEmitter.addListener("onMessageSent", event => {
        console.log("onMessageSent" + event.data);
    });
    // eventEmitter.addListener("onMessageSent", event => {
    //     console.log("onMessageSent" + event.data);
    // });
    eventEmitter.addListener("onConversationResolved", event => {
        console.log("onConversationResolved" + event.data);
    });
    eventEmitter.addListener("onConversationRestarted", event => {
        console.log("onConversationRestarted" + event.data);
    });
    eventEmitter.addListener("onRichMessageButtonClick", event => {
        console.log("onRichMessageButtonClick" + event.data);
    });
    eventEmitter.addListener("onStartNewConversation", event => {
        console.log("onStartNewConversation" + event.data);
    });
    eventEmitter.addListener("onSubmitRatingClick", event => {
        console.log("onSubmitRatingClick" + event.data);
    });
    eventEmitter.addListener("onBackButtonClicked", event => {
        console.log("onBackButtonClicked" + event.data);
    });
    eventEmitter.addListener("onAttachmentClick", event => {
        console.log("onAttachmentClick" + event.data);
    });
    eventEmitter.addListener("onFaqClick", event => {
        console.log("onFaqClick1" + event.data);
    });
    eventEmitter.addListener("onNotificationClick", event => {
        console.log("onNotificationClick" + event.data);
    });
    eventEmitter.addListener("onRatingEmoticonsClick", event => {
        console.log("onRatingEmoticonsClick" + event.data);
    });
    eventEmitter.addListener("onRateConversationClick", event => {
        console.log("onRateConversationClick" + event.data);
    });
    eventEmitter.addListener("onVoiceButtonClick", event => {
        console.log("onVoiceButtonClick" + event.data);
    });
    
    // eventEmitter.removeAllListeners("onVoiceButtonClick");
    // eventEmitter.removelistner

    // eventListener.remove()

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