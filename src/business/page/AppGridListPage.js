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
  TouchableHighlight
} from 'react-native';


import * as Actions from "../actions/AppActions";  //替换为当前actions

import GridCell from "../common/GridCell"
import GridTwoCell from "../common/GridTwoCell"

class AppGridListPage extends React.Component{
  static navigationOptions = {
    title: "应用",
  };

  onItemPress = item =>{
    const { navigate } = this.props.navigation;
    navigate("appdetail",{item:item});
  }

  componentDidMount(){
    debugger
    this.props.actions.getAppList();
  }

  render() {
    const applist = this.props.appList;
    var data = applist[0];
    var data2 = applist[1];
    var datas = [data,data2];
    debugger  
    if (data == null) {
        return(
            <View style={styles.container}>
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
                {/* <GridCell data={data}/> */}
                <GridTwoCell datas = {datas} />
            </View>
        )
      }
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#DBDBDB",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#e5e5e5"
},
});


const mapStateToProps = state => {
  return {
    appList: state.AppReducer.appList //替换为当前reducer
  };
};

const dispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, dispatchToProps)(AppGridListPage);  //替换为当前page