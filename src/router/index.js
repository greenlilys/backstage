import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Sign from '@/components/Sign'
import Worktable from '@/components/workTable/Worktable'
import Active from '@/components/active/Active'
import Amount from '@/components/amount/Amount'
import Meet from '@/components/meet/Meet'
import Seting from '@/components/seting/Seting'

import Shoplist from '@/components/shop/Shoplist'
import Addshop from '@/components/shop/Addshop'
import Shopdetail from '@/components/shop/Shopdetail'
import ChangeShopInfo from '@/components/shop/ChangeShopInfo'
import Joinapply from '@/components/shop/Joinapply'
import Joindetail from '@/components/shop/Joindetail'
import Shopactive from '@/components/shop/Shopactive'
import Editactive from '@/components/shop/Editactive'

import Userlist from '@/components/user/Userlist'
import Userdetail from '@/components/user/Userdetail'
import Totalcoin from '@/components/user/Totalcoin'

import Businesslist from '@/components/business/Businesslist'
import Addbusiness from '@/components/business/Addbusiness'
import Businessdetail from '@/components/business/Businessdetail'
import Businesssetting from '@/components/business/Businesssetting'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	{
			path: '/',
			redirect:'/Sign',
			component: Sign
		},
	
	{
			path: '/Worktable',
			component: Worktable
		},
		
		{
			path: '/Shoplist',
			component: Shoplist
	},
		{
			path: '/Shoplist/Addshop',
			component: Addshop
	},
		{
			path: '/Shoplist/Shopdetail',
			component: Shopdetail
	},
	{
		
		path:'/Shoplist/Shopdetail/ChangeShopInfo',
		component:ChangeShopInfo
	},
		{
			path: '/Joinapply',
			component: Joinapply
	},	{
			path: '/Joinapply/Joindetail',
			component: Joindetail
	},
	{
			path: '/Shopactive',
			component: Shopactive
	},
	{
			path: '/Shopactive/Editactive',
			component: Editactive
	},
		{
			path: '/Userlist',
			component: Userlist
	},
	{
			path: '/Userlist',
			component: Userlist
	},
	{
			path: '/Userlist/Userdetail',
			component: Userdetail
	},
	{
			path: '/Totalcoin',
			component: Totalcoin
	},
	{
			path: '/Businesslist',
			component: Businesslist
	},
	{
			path: '/Businesslist/Addbusiness',
			component: Addbusiness
	},
	{
			path: '/Businesslist/Businessdetail',
			component: Businessdetail
	},
	{
			path: '/Businesssetting',
			component: Businesssetting
	}
	
	

	]
})