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
  TouchableHighlight,
  Alert
} from 'react-native';


import * as Actions from "../actions/AppActions";  //替换为当前actions

import GridCell from "../common/GridCell"


class AppListPage extends React.Component{
  static navigationOptions = {
    title: "应用",
  };

  onItemPress = item =>{
    const { navigate } = this.props.navigation;
    navigate("appdetail",{item:item});
  }

  onInfoPress = item =>{
    this.props.actions.getAppDetail(item.id);    
  }

  componentDidUpdate(){
    const detail = this.props.detail;
    // const showAlert = this.props.showalert;
    if (detail != "") {
      this.showAlert(detail)
    }  
  }

  showAlert = text =>{
    Alert.alert(
      "hello",
      text,
      [
        {text: 'OK', onPress: () => 
          console.log('OK Pressed!')
        }
      ]
    )
  }


  componentDidMount(){
    this.props.actions.getAppList();
  }

  onRefresh = () =>{
    this.props.actions.getAppList();    
  }

  separator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const applist = this.props.appList;
    if (applist == null) {
      return(
          <View style={styles.container}>
          </View>
      )
  }else{
    return (
      <FlatList style={styles.container}   
        data={applist}
        renderItem={({item,index}) => 
          <TouchableHighlight onPress={() => this.onItemPress(item)}>
            <View>
              <GridCell data={item} index={index} infoPress={() =>this.onInfoPress(item)}/>
            </View>
          </TouchableHighlight>}
        onRefresh={this.onRefresh}
        refreshing={false}
        numColumns={2}
      />
    )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F2F2F2",
  }
});


const mapStateToProps = state => {
  return {
    // alertshow:state.AppReducer.alertShow,
    detail:state.AppReducer.appDetail,    
    appList: state.AppReducer.appList //替换为当前reducer
  };
};

const dispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, dispatchToProps)(AppListPage);  //替换为当前page