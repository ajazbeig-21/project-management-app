import React,{useState} from "react";
import { readRemoteFile } from 'react-native-csv';
import Icon from 'react-native-vector-icons/FontAwesome';


import {
  
  StyleSheet,
  Button,
  View,
  TouchableOpacity
} from "react-native";
import * as DocumentPicker from 'expo-document-picker';

function csvtoJSON(data)
{
var objData=[];
for(var i=1;i<data.length;i++)
{
  objData[i-1]={};
  for(var k=0;k<data[0].length && k<data[i].length;k++)
  {
    var key = data[0][k];
    objData[i-1][key]=data[i][k]
  }
} 

var jsonData=JSON.stringify(objData);
jsonData=jsonData.replace(/},/g,"},\r\n");
 console.log("Start of Function");
 console.log(jsonData);
 console.log("End of Function");
return jsonData;
}

export default function UploadSection(){


    const [csvGetter,csvSetter]=useState();

const pickDocument = async () => {
  let result = await DocumentPicker.getDocumentAsync();
  
  readRemoteFile(
    result.file,
    {
      complete: (results) => {
          console.log(results.data);
          let json=JSON.stringify(results.data);
          console.log("PRINTING CSV TO JSON");
          console.log(csvtoJSON(results.data));
          //console.log(json);
          //csvSetter(json);
      }
    }
  );

};

  return(
  <View style={styles.mainContainer}> 
  
  <View style={styles.buttonContainer}>

  <View style={styles.uploadBox}
  >
<Icon name="cloud-upload" size={80} color="#a0a0a0" onPress={pickDocument} style={{paddingVertical:60,paddingHorizontal:160}}/>
</View> 

     <TouchableOpacity style={styles.uploadButton}>
          <Button
            title="Upload"
            color="black"
          />
        </TouchableOpacity> 
        </View>
  </View>
  );
}

const styles = StyleSheet.create({
 
  mainContainer: {
    margin:"auto",
      flexDirection:'row',
      alignItems:'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  buttonContainer:{

      margin:'auto',
      width:500,
      height:400,
      backgroundColor:'#E6E6E6',
      alignItems:'center',
      borderWidth:1,
      borderRadius:6,
      borderColor:'transparent',
    justifyContent:'space-around'

  },
  uploadButton:{
      width:'80%',
      marginBottom:40
  },
  uploadBox:{
      margin:'auto',
      alignItems:"center",
      alignSelf:'flex-start',
      justifyContent:'center',
      backgroundColor:'white',
      borderRadius:5,
      borderStyle:'dashed',
      borderColor:'#aaaaaa',
      borderWidth:2,
      width:400,
      height:200
  }
});


