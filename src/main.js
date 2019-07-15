import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

//注册axios方法原型
import axios from 'axios'
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
//允许发送跨域请求时携带cookie
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios

//导入elementUI
Vue.use(ElementUI);
// 导入路由组件
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import login from './components/login.vue'

//引入reset css
import './assets/static/css/reset.css';

// 注册路由规则
const routes = [{
    path: '/login',
    component: login
  }
]

// 实例化路由对象
const router = new VueRouter({
  routes
})



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
