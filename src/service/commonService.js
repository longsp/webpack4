import Axios from 'axios'
import { Indicator, Toast } from 'mint-ui'
import { $config } from '@/config/config'
import { goLogin } from "@/utils/wxLogin.js" //微信自动登录

Axios.defaults.baseURL = $config.baseUrl;
Axios.defaults.timeout = 30000;

//自定义实例默认设置
const axios = Axios.create({
    //baseURL: $config.baseUrl,
    //timeout: 30000,
    //withCredentials: true
});


//请求拦截器
axios.interceptors.request.use(config => {
    if (!localStorage.noNeedLoad) {
        Indicator.open();
    } else {
        localStorage.removeItem("noNeedLoad");
    }

    if (localStorage.Authorication) {
        config.headers.token = localStorage.Authorication;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


//响应拦截器
axios.interceptors.response.use(res => {
    Indicator.close();
    if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data);
    }

    if (res.data.responseCode == '0000') {//正常处理
        return res;
    } else if (res.data.responseCode == '1100') {//未登录
        goLogin(); //微信登录
    } else {//错误提示
        window.Toast = Toast(res.data.message);
        //window.Toast.close();
        return res;
    }
}, error => {
    Indicator.close();
    Toast(error);
    return Promise.reject(error);
});


export default {
    get(url, param, config) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: param }, config).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            })
        })
    },
    post(url, data, config) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, config).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
            })
        })
    },
}
