
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
  TouchableHighlight,
  NativeModules
} from 'react-native';

import RNFS from 'react-native-fs';

const {height, width} = Dimensions.get('window');

const downloadPic = require("../../assets/download.png")
const iosPrefix = "itms-services://?action=download-manifest&url="

export default class GridCell extends React.Component{

    onItemPress =() =>{
        const item = this.props.data;        
        this.props.onPress(item);
    }

    downLoad =() =>{
        if (Platform.OS === "ios") {
            const {downloadurl} = this.props.data;   
            Linking.openURL(iosPrefix + downloadurl)
                   .catch(err => 
                    console.error('An error occurred', err));
        }else if (Platform.OS === "android") {
            this.downLoadAPK(this.props.data)   
        }
    }

    downLoadAPK = (item) =>{        
        const{name,time,downloadurl} = item;
        // 文件地址
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${name+"_"+time}.apk`;
        console.log("apk file is:",downloadDest)
        const options = {
            fromUrl: downloadurl,
            toFile: downloadDest,
            // background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {

                let pro = res.bytesWritten / res.contentLength;
                console.log("now process is:"+pro)
                this.setState({
                    progressNum: pro,
                });
            },
            progressDivider: 1
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);

                console.log('file://' + downloadDest)

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log("err" + error);
        }

    }

    render(){
        const {picurl, name, time} = this.props.data;       
        return(
            <View style={styles.container}>
                <View style={styles.contentView}>
                <View style={styles.topView}>
                    <Image style={styles.appImg} source={{uri:picurl}} />
                    <TouchableHighlight onPress={this.downLoad}>
                        <Image source={downloadPic}/>
                    </TouchableHighlight>
                </View>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:width/2,
        height:160,
        justifyContent: "center",
        alignItems:"center",  
        backgroundColor:"#DBDBDB",        
    },
    contentView:{
        paddingLeft:16,
        paddingTop:16,
        paddingRight:16,
        width:(width-16*3)/2,
        height:140,
        backgroundColor:"#FFFFFF",
        borderRadius: 8,
        justifyContent: "space-around",        
    },
    topView:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    appImg:{
        width:50,
        height:50,
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