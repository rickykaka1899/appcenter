//用于网络请求，view对应的action

import * as TYPES from "./actiontypes";
import RequestUtil from "../../../util/requestUtil"

const loginUrl = "/msys/login"
const userListUrl = "/mbpub/products/1"

export function Login(){
    return dispatch => {
		let request = RequestUtil.create();
		let options = {
            method:"POST",
            body:{
                "username":"Andry",
                "password":"111"
            }
		};
		let url = loginUrl;
		dispatch(
			request
				.request(url, options)
				.then(data => loginSuccess(data))
		);
	};
}

export function getUserList(){
    return dispatch => {
		let request = RequestUtil.create();
		let options = {
            
		};
		let url = userListUrl;
		dispatch(
			request
				.request(url, options)
				.then(data => getUserListSuccess(data))
		);
	};
}

function loginSuccess(data){

}

function getUserListSuccess(data){

}