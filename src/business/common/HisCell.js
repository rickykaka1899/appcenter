
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

import * as Animatable from 'react-native-animatable';
import CircleProgressView from "./CircleProgressView";

const {height, width} = Dimensions.get('window');

const downloadPic = require("../../assets/download.png")
const infoPic = require("../../assets/info.png")

const iosPrefix = "itms-services://?action=download-manifest&url="


export default class Hiscell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            progressNum:0,
            showProgress:false
        }
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
            const {downloadurl} = this.props.item;   
            if (Linking.canOpenURL((iosPrefix + downloadurl))) {
                Linking.openURL(iosPrefix + downloadurl)
                .catch(err => 
                 console.error('An error occurred', err));
            }else{
                showAlert("请卸载后重新安装")
            }
           
        }else if (Platform.OS === "android") {
            this.downLoadAPK(this.props.item)   
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

    renderDownLoadPic = (item) =>{
        if (this.state.showProgress) {
            return(
                <CircleProgressView progress={this.state.progressNum*100}>
                    <View style={styles.circleView}/>
                </CircleProgressView>
            )
        }else{
            return(
                <TouchableHighlight onPress={() => this.downLoadPress(item)}>
                    <Image source={downloadPic}/>
                </TouchableHighlight>
            )
        }
      }
      
      
        renderContent(item){
          return(
              <View style={styles.contentView}>
                  <Text>{item.time}</Text>
                  <TouchableHighlight onPress={() =>this.infoPress(item)}>
                    <Image source={infoPic}/>
                  </TouchableHighlight>
                  {this.renderDownLoadPic(item)}
              </View>
          )
        }
      
        renderHeaderTimeLine(){
          return(
              <View style={styles.timelineView}>
                <View style={styles.hiddenline}/>
                <View style={styles.pot}/>
                <View style={styles.line}/>
              </View>
          )
        }
      
        renderFooterTimeLine(){
          return(
              <View style={styles.timelineView}>
                <View style={styles.line}/>
                <View style={styles.pot}/>
                <View style={styles.hiddenline}/>
              </View>
          )
        }
      
        renderTimeLine(){
            return(
                <View style={styles.timelineView}>
                  <View style={styles.line}/>
                  <View style={styles.pot}/>
                  <View style={styles.line}/>
                </View>
            )
      
        }
        renderHeader(item){
              return(
                  <View style={styles.cell}>
                      {this.renderHeaderTimeLine()}
                      {this.renderContent(item)}
                  </View>
              ) 
        }
      
        renderFooter(item){
              return(
                  <View style={styles.cell}>
                      {this.renderFooterTimeLine()}
                      {this.renderContent(item)}
                  </View>
              ) 
        }
      
        renderCell(item){
          return(
              <View style={styles.cell}>
                  {this.renderTimeLine()}
                  {this.renderContent(item)}
              </View>
          )
        }

    render(){
        const item = this.props.item
        const cellType = this.props.cellType;
        switch (cellType) {
            case "header":
                return(
                    <Animatable.View ref="hiscell" style={styles.container}>
                        {this.renderHeader(item)}
                    </Animatable.View>
                )
                break;
            case "footer":
                return(
                    <Animatable.View ref="hiscell" style={styles.container}>
                        {this.renderFooter(item)}
                    </Animatable.View>
                )
                break;
            default:
                return(
                    <Animatable.View ref="hiscell" style={styles.container}>
                        {this.renderCell(item)}
                    </Animatable.View>
                )
                break;
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        backgroundColor:"#F2F2F2",        
    },
    cell:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
      },
      timelineView:{
        flexDirection:"column",
        paddingLeft:56,
        width:48,
        alignItems:"center"
      },
      line:{
        width:4,
        backgroundColor:"#003344",
        height:20
      },
      hiddenline:{
        width:4,
        backgroundColor:"#F2F2F2",
        height:20
      },
      pot:{
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor:"#32FFEE"
      },
      contentView:{
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems:"center",
        backgroundColor:"#FFFFFF", 
        borderRadius: 8,
        height:36,
        left:32,
        width:width-136
      },
      time:{
          fontSize:20
      },
      circleView:{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    probability: {
        fontSize: 10,
        color: "#999999"
    },
})