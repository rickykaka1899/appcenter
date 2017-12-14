import * as TYPES from "../actions/actiontypes";

//替换为当前reducer
export default function AppReducer(
	state = {
		appList:[],	//设置初始值
		appDetail:"",
		appVersionList:[]
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
		case TYPES.GETAPPVERSIONLIST:{
			return Object.assign({}, state, {
                appVersionList: action.appversionlist.list
            });
		}
		break;
		case TYPES.GETAPPDETAIL:{
			return Object.assign({}, state, {
                appDetail: action.appdetail.detail
            });
		}
		break;
        default:
            return state;
			break;
	}
}