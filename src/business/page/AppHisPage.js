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
  TouchableOpacity,
  Linking,
  Platform,
  NativeModules,
  Alert
} from 'react-native';

import HisCell from "../common/HisCell";

import * as Animatable from 'react-native-animatable';
import RNFS from 'react-native-fs';
import * as Actions from "../actions/AppActions";  //替换为当前actions


const {height, width} = Dimensions.get('window');

class AppDetailPage extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: "历史记录",
      });

  componentDidMount(){
    const { state } = this.props.navigation;
    var id = state.params.item.id;
    this.props.actions.getAppVersionList(id);
  }

  onInfoPress = item =>{
    this.props.actions.getAppDetail(item);    
  }


  onRefresh = () =>{
    const { state } = this.props.navigation;
    var id = state.params.item.id;
    this.props.actions.getAppVersionList(id);   
  }

  renderHeader(){
    const versionlist = this.props.versionList;
    if (versionlist.length === 0) {
        return(
            <View />
        ) 
    }else{
        var item = versionlist[0];
        return(
            <HisCell item={item} cellType={"header"} infoPress={() =>this.onInfoPress(item)}/>
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
          <HisCell item={item} cellType={"footer"} infoPress={() =>this.onInfoPress(item)}/>
        ) 
    }      
  }

  renderCell(item,index){
    const versionlist = this.props.versionList;    
    //首位不显示
    if (index===0 ||index === versionlist.length-1) {
        return(
          <View />
        )
    }else{
      return(
        <HisCell item={item} cellType={"content"} infoPress={() =>this.onInfoPress(item)}/>  
      )
    }
  }

  render() {
    const versionlist = this.props.versionList;
    const { picurl,name } = this.props.navigation.state.params.item;
    return (
        <View style={styles.container}>
            <View style={styles.detailView}>
                <Image style={styles.detaiImg} source={{uri:picurl}}/>
                <Text style={styles.detaiText}>{name}</Text>
            </View>
            <View style={styles.hisTitleView}>
                <Text style={styles.hisTitleText}>历史记录</Text>
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
    paddingLeft:20,
    flexDirection:"row",
    alignItems:"center",
    height:100,
    backgroundColor:"#FFFFFF"
  },
  detaiImg:{
    width:60,
    height:60,
    borderRadius:4
  },
  detaiText:{
    left:16,
    fontSize:18,
    color:"#333333"
  },
  hisTitleView:{
    top:10,
    backgroundColor:"#FFFFFF",
    height:50
  },
  hisTitleText:{
    left:10,
    top:20,
    fontSize:12,
    color:"#333333"
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