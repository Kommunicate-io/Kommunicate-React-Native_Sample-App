import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModules } from 'react-native';

const RNKommunicateChat = NativeModules.RNKommunicateChat;

global.appid = global.appid || "305d5becded8f4ed0b777f754300625a8";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const showAppidFailureAlert = () =>
        Alert.alert(
            "Failed to Login",
            "AppId is empty. Update the Update AppId & try again!!",
            [
                { text: "Cancel", onPress: () => {}, style: "cancel" },
                { text: "OK", onPress: () => {} }
            ]
        );

    const loginUser = () => {
        if (username === '' || password === '') {
            console.log('UserName and password cannot be empty.');
            return;
        }
        const kmUser = {
            userId: username,
            password: password,
            applicationId: global.appid,
            authenticationTypeId: 1,
            deviceApnsType: 0
        };
        RNKommunicateChat.loginUser(kmUser, (status, message) => {
            if (status === 'Success') {
                RNKommunicateChat.isLoggedIn((response) => {
                    if (response === "True") {
                        console.log("Logged in");
                        navigation.navigate('Main');
                    } else {
                        console.log("Error logging in");
                    }
                });
            } else if (status === 'Error') {
                console.log("Error logging in : " + message);
            }
        });
    };

    const loginAsVisitor = () => {
        if (!global.appid || global.appid.length === 0) {
            showAppidFailureAlert();
        } else {
            RNKommunicateChat.loginAsVisitor(global.appid, (status, message) => {
                if (status === 'Success') {
                    RNKommunicateChat.isLoggedIn((response) => {
                        if (response === "True") {
                            console.log("Logged in " + message);
                            navigation.navigate('Main');
                        } else {
                            console.log("Error logging in : " + message);
                        }
                    });
                } else if (status === 'Error') {
                    console.log("Error logging in : " + message);
                }
            });
        }
    };

    return (
        <View style={styles.maincontainer}>
            <Text style={styles.title}>Kommunicate React Native Sample App</Text>
            <View style={styles.inputcontainer}>
                <TextInput
                    placeholder="User Name"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
            </View>
            <View style={styles.buttoncontainer}>
                <View style={styles.button}>
                    <Button title="Login" onPress={loginUser} />
                </View>
                <View style={styles.button}>
                    <Button title="Login as Visitor" onPress={loginAsVisitor} />
                </View>
                <Text style={styles.infotext}>
                    When logging in as visitor, you dont need to fill the email, name and
                    password fields. Clicking the 'Login as visitor' button will log you in with a random userId.
                </Text>
            </View>
            <Text style={styles.privacytext} />
        </View>
    );
};

const style = StyleSheet.create({
    mainView: {
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maincontainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 20 
    },
    title: {
      marginTop: 30,
      textAlign: "center", 
      color: 'rgb(85,83,183)',
       fontWeight:"bold",
      fontSize: 20
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      padding : 0,
      marginVertical:16,
      fontSize: 16,
    },
    inputcontainer: {
      marginTop: 50, 
      alignItems: 'stretch',
    },
    buttoncontainer: {
      marginTop: 50,
    },
    infotext: {
      textAlign: "center",
      fontSize: 12,
      color: 'grey',
      marginStart: 6,
      marginEnd: 6,
      marginTop:25
    }, 
    privacytext: {
      
    },
    button: {
      borderRadius: 30,
      marginBottom: 8,
      marginTop:8,
    }
  });


export default LoginScreen