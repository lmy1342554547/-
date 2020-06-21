import Vue from 'vue'
import App from './App'
import store from './store'

import cuCustom from './components/cu-custom/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

// 引入全局mixin
import mixin from './mixins/mixin.js'
import utils from './utils';
import filters from './filters';

Vue.config.productionTip = false
App.mpType = 'app'

// 混入全局Mixin
Vue.mixin(mixin);

// 挂载所有工具方法到Vue实例
Object.keys(utils).forEach(key => {
    Vue.prototype[`$${key}`] = utils[key];
});

// 注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

const app = new Vue({
    ...App,
    store
})

// 注册http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from './utils/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
