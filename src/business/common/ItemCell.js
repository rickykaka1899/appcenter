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
    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //         phone: "",
    //         code: "",
    //     };
    // }
    onItemPress =() =>{
        const item = this.props.data;        
        this.props.onPress(item);
    }

    render(){
        const item = this.props.data;
        return(
            <TouchableHighlight onPress={this.onItemPress}>
            <View style={styles.container}>
                <Image style={styles.img} source={{uri:item.img}} />
                <View style={styles.textview}>
                    <Text>{item.title}</Text>
                    <Text>{item.des}</Text>
                </View>
            </View>
            </TouchableHighlight>
        )
    
    } 
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:"row",
      backgroundColor:"#FFFFFF",
      marginTop:8,
      marginLeft:16,
      marginRight:16,
      marginBottom:8
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