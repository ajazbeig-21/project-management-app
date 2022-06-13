import React,{useState} from "react";

import {
  
  StyleSheet,
  Button,
  View,
  Text,
  TextInput
} from "react-native";
export default function LoginPage(){


const [usernameGet,usernameSet]=useState('');
const [passwordGet,passwordSet]=useState('');

function submitForm()
{
  console.log("username is"+usernameGet+"\n"+"password is "+passwordGet);
}

function usernameListener(value)
{
usernameSet(value);
}

function passwordListener(value)
{
passwordSet(value);
}


  return(
  <View style={styles.container}>
    <View style={styles.loginContainer}>
   <View style={styles.logoContainer}>
      <Text
        style={{
          fontFamily:'Poppins',
          color: "#000865",
          fontSize: 30,
          fontWeight: "bold",
          marginRight: 5,
        }}
      >
        ROADMAP
      </Text>
      
    </View>
    <View >
      <Text style={styles.title}>Welcome back! Log in to your account.</Text>

      <View style={styles.inputWrapper}>
       
        <TextInput 
        onChangeText={usernameListener}
        style={styles.input} 
        placeholder="username" />
      </View>
      <View style={styles.inputWrapper}>
       
        
      
        
        <View>
        <TextInput
        onChangeText={passwordListener}
          secureTextEntry={true}
          style={styles.input}
          placeholder="password"
        />
        </View>
         
       
      
      </View>
    
    <View style={{marginTop:20,marginBottom:10}}>
      <Button
      title="sign in"
      onPress={submitForm}
      style={styles.loginText}
      />
</View>
    </View>

        </View>


  </View>
  );
}

const styles = StyleSheet.create({
  loginContainer:{
    backgroundColor:'#E6E6E6',
    padding:25
  },
  listContainer:{
flexDirection:'row',
margin:50
  },
  containerUpload: {
    borderRadius:7,
    width:'max-content',
    padding:10,
    marginVertical:10,
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
  },
  loginScreenButton: {
    width: "min-content",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#6571ff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginText: {
    color: "#fff",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#6571ff",
  },
  inputWrapper: {
    marginBottom: 16
  },
  label: {
    fontSize: 15,
    margin: 0,
  },
  input: {
    position: "relative",
    height: 40,
    marginVertical: 10,
    borderWidth: 0,
    padding: 10,
    alignSelf: "stretch",
    borderRadius: 5,
    borderColor: "#ffffff",
    backgroundColor:'#ffffff'
  },
  container: {
    margin: "auto",
    width: 500,
    maxWidth: 700,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  title: {
    textAlign: "left",
    marginBottom: 24,
    color: "#7987A1",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: 1,
  },
});


