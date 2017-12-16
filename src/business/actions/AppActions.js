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

export function getAppDetail(param){
    return dispatch => {
		let request = RequestUtil.create();
		let options = {
            
		};
		let url = getAppDetailActionType+"&id="+encodeURI(param.id);
		dispatch(
			request
				.request(url, options)
				.then(data => getAppDetailSuccess({name:param.name,data:data.detail}))
		);
	};
}

export function getAppVersionList(param){
    return dispatch => {
		let request = RequestUtil.create();
		let options = {
            
		};
		let url = getAppVersionListActionType+"&id="+encodeURI(param);
		dispatch(
			request
				.request(url, options)
				.then(data => getAppVersionListSuccess(data))
		);
	};
}

function getAppListSuccess(data){
	console.log("getAppListSuccess",data);
	return{
		type:TYPES.GETAPPLIST,
		applist:data
	}
}

function getAppVersionListSuccess(data){
	console.log("getAppVersionListSuccess",data);
	return{
		type:TYPES.GETAPPVERSIONLIST,
		appversionlist:data
	}
}

function getAppDetailSuccess(data){
	console.log("getAppDetailSuccess",data);
	return{
		type:TYPES.GETAPPDETAIL,
		appdetail:data
	}
}