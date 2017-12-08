
import AppListReducer from "../business/applist/reducer/AppListReducer"
import AppDetailReducer from "../business/appdetail/reducer/AppDetailReducer"

var { combineReducers } = require("redux");
module.exports = combineReducers({
    AppListReducer,
    AppDetailReducer,
});
