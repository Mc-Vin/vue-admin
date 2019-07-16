import Vue from 'vue'

// 导入路由组件
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import index from '../views/index.vue';
import login from '../views/login.vue';

// 注册路由规则
const routes = [{
    path: '/login',
    component: login
}, {
    path: '/index',
    component: index,
    meta: {
        needlogin: true
    }
}]

// 实例化路由对象
const router = new VueRouter({
    routes
})

//前置导航守卫
router.beforeEach((to, from, next) => {
    // if(to.path.indexOf('/index')==0){
    if (to.meta.needlogin == true) {
        if (window.localStorage.getItem('token')!=undefined) {
            next();
        } else {
            Vue.prototype.$message('请先登录');
            router.push('/login');
        }
    } else {
        next();
    }
})

export default router;