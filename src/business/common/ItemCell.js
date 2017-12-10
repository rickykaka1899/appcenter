import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableHighlight
} from 'react-native';

export default class ItemCell extends React.Component{
    onItemPress =() =>{
        const item = this.props.data;        
        this.props.onPress(item);
    }

    render(){
        const {picurl, name, time} = this.props.data;
        return(
            // <TouchableHighlight onPress={this.onItemPress}>
            <View style={styles.container}>
                <Image style={styles.img} source={{uri:picurl}} />
                <View style={styles.textview}>
                    <Text>{name}</Text>
                    <Text>{time}</Text>
                </View>
            </View>
            // </TouchableHighlight>
        )
    
    } 
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:"row",
      backgroundColor:"#FFFFFF",
      left:16,
      right:16
    },
    img:{
        width:50,
        height:50,
    },
    textview:{
        flexDirection:"column",
        justifyContent: "center",
        alignItems:"flex-start"
    }
});