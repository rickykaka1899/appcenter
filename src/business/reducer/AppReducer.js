import * as TYPES from "../actions/actiontypes";

//替换为当前reducer
export default function AppReducer(
	state = {
		appList:[],	//设置初始值
		appDetail:{}
	},
	action
) {
	switch (action.type) {
		case TYPES.GETAPPLIST:{
			return Object.assign({}, state, {
                appList: action.applist.list
            });
		}
		break;
        default:
            return state;
			break;
	}
}