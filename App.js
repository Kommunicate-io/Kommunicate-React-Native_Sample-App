import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModules } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();


const MyStack = () => {
  var isAuthenticated = false
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
        name="Login"
        component={LoginScreen}
        />
        <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default MyStack


// import LaunchScreen from '/screens/launchscreen';
//import RNKommunicateChat from 'react-native-kommunicate-chat';
// import MainScreen from './screens/MainScreen';
// import LoginScreen from './screens/LoginScreen';

// var RNKommunicateChat = NativeModules.RNKommunicateChat;
// export default
 function App() {
  this.appid = "18ae6ce9d4f469f95c9c095fb5b0bda44"

  // constructor() {
  //   super();
  //   this.appid = "eb775c44211eb7719203f5664b27b59f"
  // }

  

  

  createConversation = () => {
    let kmUser = {
      'userId' : 'aman',
      'password' : 'aman'
    }
    RNKommunicateChat.buildConversation(
      {
        appId: this.appid,
        kmUser: JSON.stringify(kmUser),
        isSingleConversation: false,
        conversationInfo: JSON.stringify({
          "key1": "value1",
          "key2": "value2"
        })
      }, (status, message) => {
        console.log("Received while creating conversation, status : " + status + " and message : " + message);
    });
  }


  openConversation = () => {
    RNKommunicateChat.openConversation((status, message) => {
      if(status == 'Error') {
        console.log("Error in opening conversation : " + message);
      }
    });
  }
    logout = () => {
      RNKommunicateChat.logout((response) => {
        if(response == "Success") {
          console.log("Logged out")

          // this.props.navigation.replace('Login');
        } else {
          console.log("Error logging out");
        }
      }); 
    }

    updateUserDetails = () => {
      let date = new Date();
      RNKommunicateChat.updateUserDetails({
        email: "reytum007+" + date.getTime()%100000 + "@gmail.com",
        displayName: ("RN-" + (Platform.OS === 'android' ? "Android-" : "iOS-") + date.getTime()%100000),
        metadata: {
          'Email-ID': "reytum007+" + date.getTime()%100000 + "@gmail.com",
          'Phone number': date.getTime()%100000,
          'Platform': ("RN-" + (Platform.OS === 'android' ? "Android" : "iOS"))
        } 
      }, (status, message) => {
        console.log("Update user details, status : " + status + " and message : " + message);
      });
    }

    updateConversationAssignee = () => {
      RNKommunicateChat.updateConversationAssignee({
          clientConversationId: "75160928",
          conversationAssignee: "aman.toppo@kommunicate.io"}, (success, error) => {
            console.log("Update conversation assignee, status : " + success + " and message : " + error);
          });
    }

    updateTeamId = () => {
      RNKommunicateChat.updateTeamId({
        clientConversationId: "58458073",
        teamId: "52170696"
       }, (success, error) => {
          console.log("Update teamId, status : " + success + " and message : " + error);
        });
    }

    updateConversationInfo = () => {
      RNKommunicateChat.updateConversationInfo({
        clientConversationId: "75160928",
        conversationInfo: {
          "test1": "value1",
          "test2": "value2"
        }
      }, (success, error) => {
          console.log("Update conversation info, status : " + success + " and message : " + error);
        });
    }

    return (
      <MainScreen/>
    );

  

  // return ( 
    
  //     <MainScreen/>
  // );


  
   
        // );

  // return (
  //   <View style={styles.container}>
  //     <StatusBar style="auto" />
  //     <Button
  //       title="Login"
  //       color="#f194ff"
  //       onPress={() => loginUser()}
  //     />
  //   </View>
  // );

  // ES
  // <Button title='Conversation Builder' style={styles.button} onPress={() => createConversation()} alignItems='center'/>
  // <Button title='Open Conversation' style={styles.button} onPress={() => openConversation()} alignItems='center'/>
  // <Button title='Update Team' style={styles.button} onPress={() => updateTeamId()} alignItems='center'/>
  // <Button title='Update Conversation Info' style={styles.button} onPress={() => updateConversationInfo()} alignItems='center'/>
  // <Button title='Update Conversation Assignee' style={styles.button} onPress={() => updateConversationAssignee()} alignItems='center'/>
  // <Button title='Update User details' style={styles.button} onPress={() => updateUserDetails()} alignItems='center'/>

  // <Button title='Logout' style={styles.button} onPress={() => logout()} alignItems='center'/>
}

