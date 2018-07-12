import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Sign from '@/components/Sign'
import Worktable from '@/components/workTable/Worktable'
import Active from '@/components/active/Active'
import Amount from '@/components/amount/Amount'
import Meet from '@/components/meet/Meet'
import Seting from '@/components/seting/Seting'
import Shop from '@/components/shop/Shop'
import User from '@/components/user/User'

import Shoplist from '@/components/shop/Shoplist'
import Shopdetail from '@/components/shop/Shopdetail'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/Worktable',
			component: Shopdetail
		},
		{
			path: '/Shop',
			component: Shop

		}

	]
})