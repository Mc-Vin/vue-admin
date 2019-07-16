//axios接口抽取
import axios from 'axios';

//允许发送跨域请求时携带cookie
// axios.defaults.withCredentials = true;

//创建一个axios实例
const http=axios.create({
    baseURL:'http://localhost:8888/api/private/v1/'
})

//根据接口文档抽取axios接口
export const login=({username,password})=>{
    return http.post('login',{
        username,
        password
    })
}
