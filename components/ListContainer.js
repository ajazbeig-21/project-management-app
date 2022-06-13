import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { csvData, csvtoJSONConverted } from '../data/carIQ';
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

//here we get string format
let data=csvtoJSON(csvData);

//to convert string to object we do this
data=JSON.parse(data);
const ListContainer = () => {

  return (
    <View style={styles.container}>
      <FlatList
      data={data}
      renderItem={({item})=>(
        <View style={styles.listWrapper}>
      <Text style={styles.listText} numberOfLines={1}>{item['Sequence']+'\t| ' + item['Item_ID']+'\t| '+item['Zoho Project']+'\t| '+item['Product']+'\t| '+item['Customer']+'\t| '+item['Type']+'\t| '+item['Task Name']+'\t| '+item['Task Owner']}</Text></View>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper:{
padding:10
  },
  listText:{
backgroundColor:'#a2a2a2',
padding:10,
width:'100%'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ListContainer;
