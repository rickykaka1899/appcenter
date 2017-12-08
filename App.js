import React, { Component } from "react";
import AppNavigator from "./src/routers/appNavigator";
import { Provider } from "react-redux";

var configureStore = require("./src/store/configureStore");
export default class App extends Component {
    constructor() {
        super();
        // 去处警告
        console.disableYellowBox = true;
        console.warn("YellowBox is disabled.");
        this.state = {
            store: configureStore(() => {})
        };
    }
    render() {
        return (
            <Provider store={this.state.store}>
                <AppNavigator/>
            </Provider>
        );
    }
}