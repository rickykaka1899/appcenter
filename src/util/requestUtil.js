import Dimensions from "Dimensions";
import { PixelRatio, Platform, AsyncStorage } from "react-native";
var extend = require("extend");

const baseUrl = "https://appdownload.yonyou.com:18080/servlet/downloadservlet";


function getBaseUrl() {
    return new Promise((resolve, reject) => {
        return resolve(baseUrl);
    });
}

const default_config = {
    method: "GET",
    headers: {
        "Accept": "application/json",  
        "Content-Type": "application/json"
    },
    _before: [
        (url, options) => {
            switch (options.method) {
                case "POST":
                    {
                        options.body = JSON.stringify(options.body);
                        return {
                            url: url,
                            opts: options
                        };
                    }
                    break;
                default:
                    {
                        return {
                            url: url,
                        };
                    }
                    break;
            }
        }
    ],
    _after: [
        result => {
            debugger
            //response
            console.log(result)
        }
    ]
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
        // 1. 需要设置deep = true
        // 2. 需要merge实例的config, config优先级: 参数 > 实例配置 > 默认配置
        opts = extend(true, {}, opts, default_config, this.config, opts);
        let _before = opts._before;
        let _after = opts._after;

        if (_before.length) {
            for (let f of _before) {
                let rs = f(url, opts);
                url = rs.url;
                opts = rs.opts;
            }
        }
        // 拼接baseURL和授权信息 确保授权信息和baseURL都存在
        return getBaseUrl()
            .then(baseUrl => {
                let fetchUrl = baseUrl + url;
                console.log("fetchUrl", fetchUrl);
                console.log("opthon",opts);
                return this._timeOut(fetch(fetchUrl, opts), 20000);
            })
            .then(rs => {
                debugger
                return rs.json();
            })
            .then(json => {
                debugger
                if (_after.length) {
                    for (let f of _after) {
                        json = f(json);
                    }
                }
                return json;
            })
            .catch(err => {
                debugger
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
