import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppRegistry,
  View,
  StyleSheet,
  Image,
  Text,
  FlatList
} from 'react-native';


import * as Actions from "../actions/AppListActions";  //替换为当前actions

import ItemCell from "../../common/ItemCell"

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


class AppListPage extends React.Component{
  static navigationOptions = {
    title: "应用列表",
  };

  onItemPress = item =>{
    const { navigate } = this.props.navigation;
    navigate("appdetail",{title:item.title});
  }

  componentWillMount(){
    this.props.actions.getAppList();
  }

  render() {
    const { navigate } = this.props.navigation;    
    return (
      <FlatList
      
        data={data}
        renderItem={({item}) => <ItemCell data={item} onPress = {item => this.onItemPress(item)}/>}
      />
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