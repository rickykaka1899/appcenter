//用于网络请求，view对应的action

import * as TYPES from "./actiontypes";
import RequestUtil from "../../util/requestUtil"


const getAppListActionType = "?type=getAppList"
const getAppDetailActionType = "?type=getAppDetail"
const getAppVersionListActionType = "?type=getAppVersionList"

export function getAppList(){
    return dispatch => {
		let request = RequestUtil.create();
		let options = {
            
		};
		
		let url = getAppListActionType;
		dispatch(
			request
				.request(url, options)
				.then(data => getAppListSuccess(data))
		);
	};
}

export function getAppDetail(){
    return dispatch => {
		let request = RequestUtil.create();
		let options = {
            
		};
		let url = getAppDetailActionType;
		dispatch(
			request
				.request(url, options)
				.then(data => getUserListSuccess(data))
		);
	};
}

function getAppListSuccess(data){
	console.log(data);
	return{
		type:TYPES.GETAPPLIST,
		applist:data
	}
}

function getAppDetailSuccess(data){

}