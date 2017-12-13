
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensionsnsions,
  Dimensions,
  Platform,
  TouchableHighlight,
} from 'react-native';

const {height, width} = Dimensions.get('window');

import GridCell from "./GridCell"

export default class GridOneCell extends React.Component{

    render(){
        const data = this.props.data;
        return(
            <View style={styles.container}>
                <GridCell data={datas}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:16,
        paddingTop:16,
        paddingRight:16,
        
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    topView:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    appImg:{
        width:40,
        height:40,
    },
    nameText:{
        fontSize:16,
        color:"#333333"
    },
    timeText:{
        fontSize:14,
        color:"#999999"
    },
})