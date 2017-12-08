import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppRegistry,
  View,
  StyleSheet,
} from 'react-native';
import { 
     
} from 'antd-mobile';

import * as Actions from "../actions/Actions";  //替换为当前actions

//替换为当前page名
class XXXPage extends React.Component{
    static navigationOptions = {
        title: '',
    };

    render() {
        const { navigate } = this.props.navigation;    
        return (
            <View style={styles.container}>
                
            </View>
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
        data: state.xxxReducer //替换为当前reducer
    };
};

const dispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, dispatchToProps)(XXXPage);  //替换为当前page