//axios接口抽取
import axios from 'axios';
import Vue from 'vue'
import router from '../router/router'



//创建一个axios实例
const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

//axios拦截器
// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.meta.status == 400) {
        window.localStorage.clear();
        Vue.prototype.$message.error("请先完成登录");
        router.push('/login');
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//根据接口文档抽取axios接口
export const login = ({
    username,
    password
}) => {
    return http.post('login', {
        username,
        password
    })
}

//获取左侧列表内容
export const menus = () => {
    return http.get('/menus');
}

//获取用户数据列表
export const users = ({
    query,
    pagenum,
    pagesize
}) => {
    return http.get('/users', {
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

//获取权限列表
export const rights = () => {
    return http.get('/rights/list');
}