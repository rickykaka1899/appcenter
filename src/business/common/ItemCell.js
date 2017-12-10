import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensionsnsions,
  Dimensions,
  Platform,
  Linking,
  TouchableHighlight
} from 'react-native';

const downloadPic = require("../../assets/download.png")
const iosPrefix = "itms-services://?action=download-manifest&url="

export default class ItemCell extends React.Component{
    onItemPress =() =>{
        const item = this.props.data;        
        this.props.onPress(item);
    }

    downLoad =() =>{
        debugger
        const {downloadurl} = this.props.data;   
        if (Platform.OS === "ios") {
            Linking.openURL(iosPrefix + downloadurl)
                   .catch(err => 
                    console.error('An error occurred', err));
        }else if (Platform.OS === "android") {
            
        }
    }

    render(){
        const {picurl, name, time} = this.props.data;
        return(
            <View style={styles.container}>
                <Image style={styles.appImg} source={{uri:picurl}} />
                <View style={styles.textView}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                <TouchableHighlight onPress={this.downLoad}>
                    <Image source={downloadPic}/>
                </TouchableHighlight>
            </View>
        )
    
    } 
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:"row",
      alignItems:"center",
      backgroundColor:"#FFFFFF",
      marginLeft:16,
      marginRight:16,
      height:48
    },
    appImg:{
        width:40,
        height:40,
    },
    textView:{
        left:16,
        flexDirection:"column",
        justifyContent: "space-between",
        alignItems:"flex-start",
        flex:1
    },
    nameText:{
        fontSize:16,
        color:"#333333"
    },
    timeText:{
        fontSize:14,
        color:"#999999"
    },
    arrowImg:{
        
    }
});