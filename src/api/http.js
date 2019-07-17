//axios接口抽取
import axios from 'axios';

//axios拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
    
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
    
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//创建一个axios实例
const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

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
    return http.get('/menus', {
        headers: {
            Authorization: window.localStorage.getItem('token')
        }
    })
}