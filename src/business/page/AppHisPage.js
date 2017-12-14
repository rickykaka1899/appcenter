import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppRegistry,
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Dimensions,
  TouchableHighlight
} from 'react-native';


import * as Actions from "../actions/AppActions";  //替换为当前actions

import ItemCell from "../common/ItemCell"

const downloadPic = require("../../assets/download.png")
const {height, width} = Dimensions.get('window');

class AppDetailPage extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.name}`,
      });


  componentDidMount(){
    const { state } = this.props.navigation;
    var id = state.params.item.id;
    this.props.actions.getAppVersionList(id);
    this.props.actions.getAppDetail(id);    
  }

  componentWillUnmount(){
      this.setState = {
        appVersionList:[]
      }
  }

  onRefresh = () =>{
    const { state } = this.props.navigation;
    var id = state.params.item.id;
    this.props.actions.getAppVersionList(id);   
  }



  renderContent(item){
    return(
        <View style={styles.contentView}>
            <Text>{item.time}</Text>
            <Image source={downloadPic}/>
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
  renderHeader(){
    const versionlist = this.props.versionList;
    if (versionlist.length === 0) {
        return(
            <View />
        ) 
    }else{
        var item = versionlist[versionlist.length-1];
        return(
            <View style={styles.cell}>
                {this.renderHeaderTimeLine()}
                {this.renderContent(item)}
            </View>
        ) 
    }      
  }

  renderFooter(){
    const versionlist = this.props.versionList;
    if (versionlist.length === 0) {
        return(
            <View />
        ) 
    }else{
        var item = versionlist[versionlist.length-1];
        return(
            <View style={styles.cell}>
                {this.renderFooterTimeLine()}
                {this.renderContent(item)}
            </View>
        ) 
    }      
  }

  renderCell(item,index){
    const versionlist = this.props.versionList;    
    //首位不显示
    if (index===0 ||index === versionlist.length-1) {
        return(
            <View/>
        )
    }
    return(
        <View style={styles.cell}>
            {this.renderTimeLine()}
            {this.renderContent(item)}
        </View>
    )
  }

  render() {
    const versionlist = this.props.versionList;
    const { picurl,name } = this.props.navigation.state.params.item;
    const detail = this.props.detail ? this.props.detail : "";
    return (
        <View style={styles.container}>
            <View style={styles.detailView}>
                <Image style={styles.detaiImg} source={{uri:picurl}}/>
                <Text>{detail}</Text>
            </View>
            <FlatList style={styles.container}   
                data={versionlist}
                ListHeaderComponent={this.renderHeader()}
                ListFooterComponent={this.renderFooter()}
                renderItem={({item,index}) => 
                    this.renderCell(item,index)
                }
                onRefresh={this.onRefresh}
                refreshing={false}        
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F2F2F2"
  },
  detailView:{
    paddingLeft:32,
    flexDirection:"row",
    alignItems:"center",
    height:92
  },
  detaiImg:{
    width:60,
    height:60,
  },
  cell:{
    flex:1,
    flexDirection:"row",
    // justifyContent: "space-between",
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
  }
});


const mapStateToProps = state => {
  return {
    detail:state.AppReducer.appDetail,
    versionList: state.AppReducer.appVersionList 
  };
};

const dispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, dispatchToProps)(AppDetailPage);