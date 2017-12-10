import Dimensions from "Dimensions";
import { PixelRatio, Platform, AsyncStorage } from "react-native";

const iOSURL = "https://appdownload.yonyou.com:18080/servlet/downloadservlet";
const AndroidURL = "https://appdownload.yonyou.com:18080/servlet/android";


function getBaseUrl() {
    return new Promise((resolve, reject) => {
        if (Platform.OS === "android") {
            return resolve(AndroidURL);   
        }else if (Platform.OS === "ios") {
            return resolve(iOSURL);            
        }
    });
}

const default_config = {
    method: "GET",
    headers: {
        "Accept": "application/json",  
        "Content-Type": "application/json"
    },
};

export default class RequestUtil {
    constructor(config) {
        // 如果没有传入请求配置则使用默认请求配置
        this.config = config || default_config;
    }
    // 创建实例方法
    static create(config) {
        return new RequestUtil(config || default_config);
    }

    request(url, opts) {
        return getBaseUrl()
            .then(baseUrl => {
                let fetchUrl = baseUrl + url;
                console.log("fetchUrl", fetchUrl);
                console.log("opthon",opts);
                return this._timeOut(fetch(fetchUrl, opts), 20000);
            })
            .then(rs => {
                return rs.json();
            })
            .then(json => {
                return json;
            })
            .catch(err => {
                console.log(err);
            });
    }
    _timeOut(fetch_promise, timeout) {
        var abort_fn = null;
        //这是一个可以被reject的promise
        var abort_promise = new Promise(function(resolve, reject) {
            abort_fn = function() {
                reject("网络请求超时");
            };
        });
        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        var abortable_promise = Promise.race([fetch_promise, abort_promise]);
        setTimeout(function() {
            abort_fn();
        }, timeout);
        return abortable_promise;
    }
}
