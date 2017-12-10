import { TabNavigator, StackNavigator, addNavigationHelpers, TabBarBottom } from "react-navigation";
import React, { Component } from "react";

import AppListPage from "../business/page/AppListPage"
import AppDetailPage from "../business/page/AppDetailPage"


export default class AppNavigator extends Component {
    renderNav = () => {
        const routeConfigMap = {
            applist:{
                screen: AppListPage
            },
            appdetail:{
                screen: AppDetailPage
            }
        };
        const StackNavigatorConfig = {
            initialRouteName: "applist",
            headerMode: "screen",
            navigationOptions: {
                headerTitleStyle: {
                    fontSize: 18,
                    color: "#333",
                    fontWeight: "normal"
                }
            }
        };
        let Navigator = StackNavigator(routeConfigMap, StackNavigatorConfig);
        return <Navigator />;
    };
    render() {
        return this.renderNav();
    }
}
