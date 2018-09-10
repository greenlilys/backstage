// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import Vue from 'vue'
import App from '@/App'
import router from './router'
import axios from 'axios'
import {httpPost,httpGet,ye,fail,GLOBALconfig,bus,sendTitle} from './assets/js/common'

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$post=httpPost;
Vue.prototype.$get=httpGet;
Vue.prototype.$ye=ye; 
Vue.prototype.$fail=fail;
Vue.prototype.$GLOBALconfig=GLOBALconfig;
Vue.prototype.$bus = bus;
Vue.prototype.$sendTitle = sendTitle;

/* eslint-disable no-new */

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})


