import React,{useState} from "react";
import { readRemoteFile } from 'react-native-csv';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
  
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import LoginPage from "./components/LoginPage";
import UploadSection from "./components/UploadSection";
import ListContainer from "./components/ListContainer";
import DraggableList from "./components/DraggableList";
export default function App(){

  return(
  <View style={styles.container}>
 <DraggableList></DraggableList>
<ListContainer></ListContainer> 
<UploadSection></UploadSection>   
   <LoginPage></LoginPage> 
  
 
  </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flexDirection:'column',
    gap:24,
    margin: "auto",
    marginTop:100,
    width: 'fit-content',
    borderRadius: 5,
    borderColor: "#E6E6E6",
  }
});


