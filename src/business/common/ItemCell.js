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

const downloadPic = require("../../assets/download.png")
const iosPrefix = "itms-services://?action=download-manifest&url="

export default class ItemCell extends React.Component{
    // constructor(){
    //     this.state = {
    //         progressNum : 0
    //     }
    // }

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

    downLoadPicTest = () => {
        var basePath;
        if (Platform.OS === "ios") {
            basePath = RNFS.MainBundlePath;
        }else if (Platform.OS === "android") {
            basePath = RNFS.DocumentDirectoryPath;
        }

        const { name,time,picurl } = this.props.data;
        var filePath = basePath + '/' + name + "_" + time + ".png";
        console.log("filePath",filePath)
        var download = RNFS.downloadFile({
            fromUrl: picurl,
            toFile: filePath,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: res => {
                console.log((res.bytesWritten / res.contentLength).toFixed(2));
            },
        });
        download.promise.then(result => {
            console.log(result)
            // if(result.statusCode == 200){
            //     NativeModules.InstallApk.install(filePath);
            // }
        }).catch(err =>{
            console.log("download error", err)
        });
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
                <Image style={styles.appImg} source={{uri:picurl}} />
                <View style={styles.textView}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                <TouchableHighlight onPress={this.downLoadPicTest}>
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