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

import ItemCell from "../common/ItemCell"

class AppDetailPage extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.name}`,
      });

  onItemPress = item =>{
    // const { navigate } = this.props.navigation;
    // navigate("appdetail",{title:item.name});
  }

  componentWillMount(){
    const { state } = this.props.navigation;
    var id = state.params.item.id;
    this.props.actions.getAppVersionList(id);
  }

  componentWillUnmount(){
      this.setState = {
        appVersionList:[]
      }
  }

  onRefresh = () =>{
    this.props.actions.getAppList();    
  }

  separator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const versionlist = this.props.versionList;    
    return (
      <FlatList style={styles.container}   
        ItemSeparatorComponent={this.separator}      
        data={versionlist}
        renderItem={({item}) => 
          <TouchableHighlight onPress={() => this.onItemPress(item)}>
            <View>
              <ItemCell data={item}/>
            </View>
          </TouchableHighlight>}
        onRefresh={this.onRefresh}
        refreshing={false}        
      />
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#FFFFFF"
  },
  separator: {
    height: 0.5,
    backgroundColor: "#e5e5e5"
},
});


const mapStateToProps = state => {
  return {
    versionList: state.AppReducer.appVersionList 
  };
};

const dispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, dispatchToProps)(AppDetailPage);