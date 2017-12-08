import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppRegistry,
  View,
  StyleSheet,
} from 'react-native';

import * as Actions from "../actions/AppDetailActions";  //替换为当前actions

//替换为当前page名
class AppDetailPage extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
      });

    render() {
        debugger
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
        data: state.AppDetailReducer //替换为当前reducer
    };
};

const dispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, dispatchToProps)(AppDetailPage);  //替换为当前page