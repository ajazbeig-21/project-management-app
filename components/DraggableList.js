import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PanResponder,
  Animated,
  Button
} from "react-native";

const JSONFormat=[{"Sequence":"1","Item_ID":"CC1-T22","Zoho Project":"CarIQ Core Products","Product":"Deviceless","Customer":"","Type":"Feature","Task Name":"BAGIC Device_less app - Auto start/stop (A4 implementation)","Task Owner":"Sagar Yadav","Priority":"High","Custom Status":"To be Tested"},
{"Sequence":"2","Item_ID":"CC1-T8","Zoho Project":"CarIQ Core Products","Product":"Platform","Customer":"","Type":"Feature","Task Name":"End of the day Probe Report - Single Email containing status of all domains for all probes.","Task Owner":"Sagar Yadav","Priority":"Low","Custom Status":"Open"},
{"Sequence":"3","Item_ID":"CC1-T6","Zoho Project":"CarIQ Core Products","Product":"FleetIQ","Customer":"","Type":"Feature","Task Name":"High-Provide tools for Rajashree to debug these(Varroc Fleet) issues/problems","Task Owner":"Santosh Bansode","Priority":"Low","Custom Status":"Open"},
{"Sequence":"4","Item_ID":"CC1-T2","Zoho Project":"CarIQ Core Products","Product":"Driven Admin","Customer":"","Type":"Feature","Task Name":"Allow downloading of data for billing purposes","Task Owner":"Santosh Bansode","Priority":"None","Custom Status":"Open"},
{"Sequence":"5","Item_ID":"CC1-T61","Zoho Project":"CarIQ Core Products","Product":"Platform","Customer":"","Type":"Feature","Task Name":"Heatsink based data dump for ICICI","Task Owner":"Datta Lohar","Priority":"Medium","Custom Status":"Open"},
{"Sequence":"6","Item_ID":"NC1-I56","Zoho Project":"Renault Nissan Support","Product":"Platform","Customer":"Nissan","Type":"Bug","Task Name":"Customer is not receiving Ignition ON / OFF alerts in his NC App. (VIN No : MDHFBADD0M9034200)","Task Owner":"Major","Priority":"Datta","Custom Status":"Open"},
{"Sequence":"7","Item_ID":"NC1-I48","Zoho Project":"Renault Nissan Support","Product":"Platform","Customer":"Nissan","Type":"Bug","Task Name":"Customer was facing issue with Smart Drive Score feature.","Task Owner":"Major","Priority":"Hrishi","Custom Status":"Open"},
{"Sequence":"8","Item_ID":"LE1-T15","Zoho Project":"L3 Engineering","Product":"","Customer":"","Type":"","Task Name":"Wrong timing-Trip start/stop, Ignition On/Off #81442","Task Owner":"Sagar Yadav","Priority":"High","Custom Status":"Open"},
{"Sequence":"9","Item_ID":"NC1-I11","Zoho Project":"Renault Nissan Support","Product":"Platform","Customer":"Nissan","Type":"Bug","Task Name":"Dinesh san to confirm : Engine Overheating alert algorithm revisit & changes","Task Owner":"Major","Priority":"Dinesh","Custom Status":"Open"},
{"Sequence":"10","Item_ID":"CC1-T52","Zoho Project":"CarIQ Core Products","Product":"BAGIC","Customer":"","Type":"Feature","Task Name":"DriveSmart - Missing entries in the report- https://admin.drivesmart.co.in/","Task Owner":"Nitin Umdale","Priority":"High","Custom Status":"In Progress"}];




function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

const colorMap = {};

export default class DraggableList extends React.Component {
  state = {
    dragging: false,
    draggingIdx: -1,
    data:JSONFormat
    // data: Array.from(Array(200), (_, i) => {
    //   colorMap[i] = getRandomColor();
    //   return i;
    // })
  };
  point = new Animated.ValueXY();
  currentY = 0;
  scrollOffset = 0;
  flatlistTopOffset = 0;
  rowHeight = 0;
  currentIdx = -1;
  active = false;

  constructor(props) {
    super(props);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.currentIdx = this.yToIndex(gestureState.y0);
        this.currentY = gestureState.y0;
        Animated.event([{ y: this.point.y }])({
          y: gestureState.y0 - this.rowHeight / 2
        });
        this.active = true;
        this.setState({ dragging: true, draggingIdx: this.currentIdx }, () => {
          this.animateList();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        this.currentY = gestureState.moveY;
        Animated.event([{ y: this.point.y }])({ y: gestureState.moveY });
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.reset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.reset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });
  }

  animateList = () => {
    if (!this.active) {
      return;
    }

    requestAnimationFrame(() => {
      // check y value see if we need to reorder
      const newIdx = this.yToIndex(this.currentY);
      if (this.currentIdx !== newIdx) {
        this.setState({

          data: immutableMove(this.state.data, this.currentIdx, newIdx),
          draggingIdx: newIdx
        });
        this.currentIdx = newIdx;
      }

      this.animateList();
    });
  };

  yToIndex = (y) => {
    const value = Math.floor(
      (this.scrollOffset + y - this.flatlistTopOffset) / this.rowHeight
    );

    if (value < 0) {
      return 0;
    }

    if (value > this.state.data.length - 1) {
      return this.state.data.length - 1;
    }

    return value;
  };

  reset = () => {
    this.active = false;
    this.setState({ dragging: false, draggingIdx: -1 });
  };


  convertToCSV=(objArray)=>
{

  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }
   //Download the file as CSV
   var downloadLink = document.createElement("a");
   var blob = new Blob(["\ufeff", str]);
   var url = URL.createObjectURL(blob);
   downloadLink.href = url;
   downloadLink.download = "DataDump.csv";  //Name the file here
   document.body.appendChild(downloadLink);
   downloadLink.click();
   document.body.removeChild(downloadLink);

  //return str;
}

 downloadToCSV=(str)=>
 {
   //Download the file as CSV
   var downloadLink = document.createElement("a");
   var blob = new Blob(["\ufeff", str]);
   var url = URL.createObjectURL(blob);
   downloadLink.href = url;
   downloadLink.download = "DataDump.csv";  //Name the file here
   document.body.appendChild(downloadLink);
   downloadLink.click();
   document.body.removeChild(downloadLink);
 }



  render() {
    const { data, dragging, draggingIdx } = this.state;
console.log("@@@@@@@@@@@@@@@@@@@@@@",data);
    const renderItem = ({ item, index }, noPanResponder = false) => (
      <View
        onLayout={e => {
          this.rowHeight = e.nativeEvent.layout.height;
        }}
        style={{
          padding: 5,
          backgroundColor: '#fff',
          flexDirection: "row",
          borderWidth:1,
          marginVertical:3,
          marginHorizontal:10,
          borderRadius:8,
          borderColor:'#767676',
          opacity: draggingIdx === index ? 0 : 1
        }}
      >
        

        <View {...(noPanResponder ? {} : this._panResponder.panHandlers)}>
          <Text style={{ fontSize: 15,cursor:'pointer' }}>@</Text>
        </View>
        <Text numberOfLines={1} style={{ fontSize: 15, textAlign: "left", flex: 1 }}>
        {item['Sequence']+'\t| ' + item['Item_ID']+'\t| '+item['Zoho Project']+'\t| '+item['Product']+'\t| '+item['Customer']+'\t| '+item['Type']+'\t| '+item['Task Name']+'\t| '+item['Task Owner']}
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        {dragging && (
          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "#e5e5e5",
              zIndex: 2,
              width: "100%",
              top: this.point.getLayout().top
            }}
          >
            {renderItem({ item: data[draggingIdx], index: -1 }, true)}
          </Animated.View>
        )}
        <FlatList
          scrollEnabled={!dragging}
          style={{ width: "100%" }}
          data={data}
          renderItem={renderItem}
          onScroll={e => {
            this.scrollOffset = e.nativeEvent.contentOffset.y;
          }}
          onLayout={e => {
            this.flatlistTopOffset = e.nativeEvent.layout.y;
          }}
          scrollEventThrottle={16}
          keyExtractor={item => "" + item['Sequence']}
        />

<View>

 <Button
title="export"
onPress={this.convertToCSV.bind(this,data)}
/> 

  </View>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center"
  }
});