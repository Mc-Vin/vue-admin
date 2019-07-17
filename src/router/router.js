import Vue from 'vue'

// 导入路由组件
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import index from '../views/index.vue';
import login from '../views/login.vue';
import NotFound from '../views/NotFound.vue';

//导入嵌套组件
import users from '../views/users.vue';
import roles from '../views/roles.vue';
import rights from '../views/rights.vue';
import goods from '../views/goods.vue';
import params from '../views/params.vue';
import categories from '../views/categories.vue';
import orders from '../views/orders.vue';
import reports from '../views/reports.vue';

// 注册路由规则
const routes = [{
        path: '/login',
        component: login
    },
    {
        path: '',
        redirect: '/index/users'
    },
    {
        path: '/index',
        redirect: '/index/users'
    },
    {
        path: '/index',
        component: index,
        meta: {
            needlogin: true
        },
        children: [{
                path: 'users',
                component: users
            },
            {
                path: 'roles',
                component: roles
            },
            {
                path: 'rights',
                component: rights
            },
            {
                path: 'goods',
                component: goods
            },
            {
                path: 'params',
                component: params
            },
            {
                path: 'categories',
                component: categories
            },
            {
                path: 'orders',
                component: orders
            },
            {
                path: 'reports',
                component: reports
            }
        ]
    },
    {
        path: '/notfound',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/notfound'
    }
]

// 实例化路由对象
const router = new VueRouter({
    routes
})

//前置导航守卫
router.beforeEach((to, from, next) => {
    // if(to.path.indexOf('/index')==0){
    if (to.meta.needlogin == true) {
        if (window.localStorage.getItem('token') != undefined) {
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