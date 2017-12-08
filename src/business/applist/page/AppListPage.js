import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppRegistry,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';


import * as Actions from "../actions/AppListActions";  //替换为当前actions
// import { Text } from "react-native-animatable";

const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: 'Meet hotel',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: 'McDonald\'s invites you',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: 'Eat the week',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];

  const NUM_SECTIONS = 5;
  const NUM_ROWS_PER_SECTION = 5;
  let pageIndex = 0;

  const dataBlobs = {};
  let sectionIDs = [];
  let rowIDs = [];
  function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
      const ii = (pIndex * NUM_SECTIONS) + i;
      const sectionName = `Section ${ii}`;
      sectionIDs.push(sectionName);
      dataBlobs[sectionName] = sectionName;
      rowIDs[ii] = [];
  
      for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        const rowName = `S${ii}, R${jj}`;
        rowIDs[ii].push(rowName);
        dataBlobs[rowName] = rowName;
      }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
  }


class AppListPage extends React.Component{
    static navigationOptions = {
        title: '',
    };


    render() {
        const { navigate } = this.props.navigation;    
        return (
          <View><Text>helel</Text></View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF"
    },
  });


const mapStateToProps = state => {
    return {
        data: state.AppListReducer //替换为当前reducer
    };
};

const dispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, dispatchToProps)(AppListPage);  //替换为当前page