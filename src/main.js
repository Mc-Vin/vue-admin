import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false


//导入elementUI
Vue.use(ElementUI);

//导入router模块
import router from './router/router'

//注册全局组件
import breadcrumb from './components/breadcrumb.vue'
Vue.component('breadcrumb',breadcrumb);

//引入reset css
import './assets/static/css/normalize.css';

//引入字体图标
import './assets/static/font/iconfont.css'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')