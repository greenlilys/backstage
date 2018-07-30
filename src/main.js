// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
import Vue from 'vue'

import Main from '@/components/Main'
import router from './router'
import axios from 'axios'
import {post,fetch} from './assets/js/common'

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
/* eslint-disable no-new */

new Vue({
	el: '#app',
	router,
	components: { Main },
	template: '<Main/>'
})


