
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
  TouchableOpacity,
  NativeModules
} from 'react-native';

import RNFS from 'react-native-fs';

import * as Animatable from 'react-native-animatable';
import CircleProgressView from "./CircleProgressView";

const {height, width} = Dimensions.get('window');

const downloadPic = require("../../assets/btn_download.png")
const infoPic = require("../../assets/btn_more.png")

const iosPrefix = "itms-services://?action=download-manifest&url="


export default class GridCell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            progressNum:0,
            showProgress:false
        }
    }

    componentDidMount(){
        console.log("componentDidMount")
        this.refs.cell.bounceIn(2000)
    }

    infoPress =() =>{
        const item = this.props.data;
        console.log(item)
        this.props.infoPress(item)    
    }

    showAlert = text =>{
        Alert.alert(
          text,
          [
            {text: 'OK', onPress: () => 
              console.log('OK Pressed!')
            }
          ]
        )
      }

    downLoadPress =() =>{
        if (Platform.OS === "ios") {
            const {downloadurl} = this.props.data;   
            if (Linking.canOpenURL((iosPrefix + downloadurl))) {
                Linking.openURL(iosPrefix + downloadurl)
                .catch(err => 
                 console.error('An error occurred', err));
            }else{
                showAlert("请卸载后重新安装")
            }
           
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
                this.setState({
                    showProgress:true
                })
            },
            progress: (res) => {

                let pro = res.bytesWritten / res.contentLength;
                console.log("now process is:"+pro)
                this.setState({
                    progressNum: pro.toFixed(3),
                });
            },
            progressDivider: 1
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);
                console.log('file://' + downloadDest)
                this.setState({
                    progressNum: 0,
                    showProgress:false
                });
                NativeModules.InstallApk.install(downloadDest)

            }).catch(err => {
                this.setState({
                    progressNum: 0,
                    showProgress:false
                });
                console.log('err', err);
            });
        }
        catch (e) {
            console.log("err" + error);
        }

    }

    renderDownLoadPic = () =>{
        if (this.state.showProgress) {
            return(
                <CircleProgressView progress={this.state.progressNum*100}>
                    <View style={styles.circleView}/>
                </CircleProgressView>
            )
        }else{
            return(
                <TouchableOpacity onPress={this.downLoadPress}>
                    <Image source={downloadPic}/>
                </TouchableOpacity>
            )
        }
    }

    renderCell(index){
        const {picurl, time} = this.props.data;
        var name = this.props.data.name;        
        if (name.endsWith("NC63")) {
            name = name.substr(0,name.length-4)
        }     
        return(
            <Animatable.View ref="cell" style={index%2 === 0 ? [styles.leftView,styles.contentView]:[styles.rightView,styles.contentView]}>
                <View style={styles.topView}>
                    <Image style={styles.appImg} source={{uri:picurl}} />
                    {this.renderDownLoadPic()}
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.nameText}>{name}</Text>
                    <View style={styles.infoView}>
                        <Text style={styles.timeText}>{time}</Text>
                        <TouchableOpacity onPress={this.infoPress}>
                            <Image source={infoPic}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        )
    }

    render(){
        const index = this.props.index;   
        return(
            <View style={styles.container}>
                {this.renderCell(index)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:width/2,
        height:166,
        justifyContent: "center",
        backgroundColor:"#F2F2F2",        
    },
    leftView:{
        left:10      
    },
    rightView:{
        left:5     
    },
    contentView:{
        paddingLeft:16,
        paddingTop:16,
        paddingRight:16,
        paddingBottom:16,
        width:(width-10*3)/2,
        height:156,
        backgroundColor:"#FFFFFF",
        borderRadius: 4,
        justifyContent: "space-around",            
    },
    topView:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    bottomView:{
        top:8,
        justifyContent: "center",  
    },
    appImg:{
        width:50,
        height:50,
        borderRadius: 4,
    },
    nameText:{
        fontSize:16,
        color:"#333333"
    },
    timeText:{
        fontSize:12,
        color:"#5d77b3"
    },
    infoView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    circleView:{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
})