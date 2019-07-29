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
    if (response.data.meta.status == 400&&response.data.meta.msg == '无效token') {
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

//新增用户
export const addUserData = ({
    username,
    password,
    email,
    mobile
}) => {
    return http.post('/users', {
        username,
        password,
        email,
        mobile
    })
}

//删除用户
export const deleteUser=({id})=>{
    return http.delete(`/users/${id}`)
}

//修改用户状态
export const changeState=({uId,type})=>{
    return http.put(`users/${uId}/state/${type}`)
}

//编辑用户提交
export const editUser=({id,email,mobile})=>{
    return http.put(`/users/${id}`,{
        email,
        mobile
    })
}

//获取权限列表，列表显示
export const rights = () => {
    return http.get('/rights/list');
}

//获取权限列表，树状显示
export const rightsList=()=>{
    return http.get('/rights/tree');
}

//获取角色列表
export const roleList=()=>{
    return http.get('/roles');
}

//分配用户角色
export const assignRole=({id,rid})=>{
    return http.put(`/users/${id}/role`,{
        rid
    })
}

//删除角色指定权限
export const delRole=({roleId,rightId})=>{
    return http.delete(`/roles/${roleId}/rights/${rightId}`);
}


//角色授权
export const reAssignRole=({roleId,rids})=>{
    return http.post(`/roles/${roleId}/rights`,{
        rids
    })
}