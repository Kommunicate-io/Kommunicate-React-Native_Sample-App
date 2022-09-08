import React from 'react';
import { Text, StyleSheet, Button, View, ScrollView, Alert } from 'react-native';
import RNKommunicateChat from 'react-native-kommunicate-chat';




const MainScreen = ({ navigation }) => {
    // var RNKommunicateChat = NativeModules.RNKommunicateChat;

    openConversation = () => {
        RNKommunicateChat.openConversation((status, message) => {
          if(status == 'Error') {
            console.log("Error in opening conversation : " + message);
          }
        });
      }

      const showLogoutFailureAlert = () =>
        Alert.alert(
            "Failed to Logout",
            "Couldn't log you out. Please try again",
            [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
      );

      logout = () => {
        RNKommunicateChat.logout((response) => {
          if(response == "Success") {
            console.log("Logged out")
            // navigation.goBack()
            navigation.navigate("Login");
          } else {
            console.log("Error logging out");
            showLogoutFailureAlert()
          }
        }); 
      }
      
    return(
        <View style={style.mainView}>
          <View style={style.button}>
          <Button
                title="Launch Conversation"                
                onPress={() => openConversation()}
            />
          </View> 

          <View style={style.button}>
          <Button
                title="Logout"
                onPress={() => logout()}
            />
          </View> 
          
            
        </View>
    );
}

const style = StyleSheet.create({
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

