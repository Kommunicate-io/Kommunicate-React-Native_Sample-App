import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, NativeModules } from 'react-native';


var RNKommunicateChat = NativeModules.RNKommunicateChat;

const LoginScreen = ({ navigation }) => {
    global.appid = "1de229e1897fa19317af97b7b6acdee7c"

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {
        const userId = username;
        console.log('UserName and password cannot be empty.');
        if(userId == '' || password == '') {
          console.log('UserName and password cannot be empty.');
          return;
        }
        
        var kmUser = {
          userId : userId,
          password: password,
          applicationId : global.appid,  
          authenticationTypeId: 1,
          deviceApnsType : 0 
          };
  
          RNKommunicateChat.loginUser(kmUser, (status, message) => {
            if(status == 'Success') {
              RNKommunicateChat.isLoggedIn((response) => {
                  if(response == "True") {
                    // this.props.navigation.navigate('Home');
                    console.log("Logged in")
                    navigation.navigate('Main')
  
                  } else {
                    console.log("Error logging in")
                  }
                });
                // this.props.navigation.replace('Home');
           
            } else if (status == 'Error') {
                console.log("Error logging in : " + message);
            }
        });
    }

    const showAppidFailureAlert = () =>
        Alert.alert(
            "Failed to Login",
            "AppId is empty. Update the Update AppId & try again!!",
            [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
      );

    const loginAsVisitor = () => {
        if (global.appid.length === 0) {
            showAppidFailureAlert()
        } else {
            RNKommunicateChat.loginAsVisitor(global.appid, (status, message) => {
                if(status == 'Success') {
                  RNKommunicateChat.isLoggedIn((response) => {
                      if(response == "True") {
                        console.log("Logged in" + message);
                        navigation.navigate('Main')
                      } else {
                        console.log("Error logging in : " + message);
                      }
                    });               
                } else if (status == 'Error') {
                  console.log("Error logging in : " + message);
                }
            });
        }
      }

      const logout = () => {
        RNKommunicateChat.logout((response) => {
          if(response == "Success") {
            console.log("Logged out")    
          } else {
            console.log("Error logging out");
          }
        }); 
      }

      const isLogged = () => {
        RNKommunicateChat.isLoggedIn((response) => {
            if(response == "True") {
            return "Main"
            } else {
              return "Login"
            }
          });       
      }
      return(<View style={styles.maincontainer}>
        <Text style={styles.title}>Kommunicate React Native Sample App</Text>
        <View style={styles.inputcontainer}>
        <TextInput placeholder="User Name" value={username} onChangeText={setUsername} style={styles.input}></TextInput>
        <TextInput secureTextEntry={true} placeholder="Password" value={password} onChangeText={setPassword} style={styles.input}></TextInput>
        </View>
        <View style={styles.buttoncontainer}>
          <View style={styles.button}>
          <Button title='Login' onPress={() => loginUser()} alignItems='center'/>
          </View>
          <View style={styles.button}>
          <Button title='Login as Visitor' style={styles.button} onPress={() => loginAsVisitor()} alignItems='center'/>
          </View>
  
          {/* <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#43e97b', '#38f9d7']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginUser}><Text style={{color: 'white'}}>LOGIN</Text></TouchableOpacity></LinearGradient>
          <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.loginVisitor}><Text style={{color: 'white'}}>LOGIN AS VISITOR</Text></TouchableOpacity></LinearGradient>
          <LinearGradient start={{x:0,y: 0}} end={{x:1,y: 1}} colors={['#f6d365', '#fda085']} style={styles.button}><TouchableOpacity style={{padding: 10, alignItems: 'center'}} onPress={this.createConversation}><Text style={{color: 'white'}}>Create Conversation without login</Text></TouchableOpacity></LinearGradient> */}
          <Text style={styles.infotext}>When logging in as visitor, you dont need to fill the email, name and 
          password fields. Clicking the 'Login as visitor' button will log you in with a random userId.</Text>
        </View>
        <Text style={styles.privacytext}></Text>
      </View>);
        
    // );
}

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
