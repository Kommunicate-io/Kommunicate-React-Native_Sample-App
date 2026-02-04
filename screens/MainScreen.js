import React from 'react';
import { Text, StyleSheet, Button, View, ScrollView, Alert } from 'react-native';
import RNKommunicateChat from 'react-native-kommunicate-chat';




const MainScreen = ({ navigation }) => {
    const showLogoutFailureAlert = () =>
        Alert.alert(
            "Failed to Logout",
            "Couldn't log you out. Please try again",
            [
                { text: "Cancel", onPress: () => {}, style: "cancel" },
                { text: "OK", onPress: () => {} }
            ]
        );

    const openConversation = () => {
        RNKommunicateChat.openConversation((status, message) => {
            if (status === 'Error') {
                console.log("Error in opening conversation : " + message);
            }
        });
    };

    const logout = () => {
        RNKommunicateChat.logout((response) => {
            if (response === "Success") {
                console.log("Logged out");
                navigation.navigate("Login");
            } else {
                console.log("Error logging out");
                showLogoutFailureAlert();
            }
        });
    };

    return (
        <View style={styles.mainView}>
          <View style={styles.button}>
            <Button title="Launch Conversation" onPress={openConversation} />
          </View>
          <View style={styles.button}>
            <Button title="Logout" onPress={logout} />
          </View> 
          
            
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        borderRadius: 5,
        marginBottom: 25,
        backgroundColor:'#1E6738',
      }
})


export default MainScreen

