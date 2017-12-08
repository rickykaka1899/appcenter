"use strict";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
var createLogger = require("redux-logger");
import { persistStore, autoRehydrate } from "redux-persist";
import Reducers from "../rootReducer";
var { AsyncStorage } = require("react-native");

// var logger = createLogger({
//   predicate: (getState, action) => isDebuggingInChrome,
//   collapsed: true,
//   duration: true,
// });
const logger = store => next => action => {
	if (typeof action === "function") console.log("dispatching a function");
	else console.log("dispatching", action);
	let result = next(action);
	console.log("next state", store.getState());
	return result;
};
var promise = require("./promise");

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const createStoreWithMiddleware = applyMiddleware(thunk, logger, promise)(createStore);

function configureStore(onComplete: ?() => void) {
	const store = autoRehydrate()(createStoreWithMiddleware)(Reducers);
	// persistStore(store, {storage: AsyncStorage}, onComplete);
	if (isDebuggingInChrome) {
		window.store = store;
	}
	return store;
}

module.exports = configureStore;
