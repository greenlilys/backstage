import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Sign from '@/components/Sign'
import Worktable from '@/components/workTable/Worktable'
import Error from '@/components/error/Error'

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

import Groupproject from '@/components/Groupaccount/Groupproject'
import Addgroupproject from '@/components/Groupaccount/Addgroupproject'
import Groupprojectdetail from '@/components/Groupaccount/Groupprojectdetail'
import Accountmanage from '@/components/Groupaccount/Accountmanage'

import Meetlist from '@/components/meet/Meetlist'
import Meetdetail from '@/components/meet/Meetdetail'
import Batterydamage from '@/components/meet/Batterydamage'

import Pikingrecord from '@/components/battery/Pikingrecord'
import Addorder from '@/components/battery/Addorder'
import Subtractorder from '@/components/battery/Subtractorder'

import Deposit from '@/components/money/Deposit'
import Rebate from '@/components/money/Rebate'
import Rent from '@/components/money/Rent'
import Tablerecord from '@/components/money/Tablerecord'
import Moneyrecord from '@/components/money/Moneyrecord'
import Weixinrecord from '@/components/money/Weixinrecord'
import Ensure from '@/components/money/Ensure'
import Getapply from '@/components/money/Getapply'
import Getapplyrecord from '@/components/money/Getapplyrecord'

import Useramount from '@/components/amount/Useramount'
import Shopscore from '@/components/amount/Shopscore'
import Businessscore from '@/components/amount/Businessscore'
import Pushuser from '@/components/amount/Pushuser'

import Seting from '@/components/seting/Seting'
import Batterymanage from '@/components/seting/Batterymanage'
import Problorm from '@/components/seting/Problorm'
import Personaccount from '@/components/seting/Personaccount'
import Addbattery from '@/components/seting/Addbattery'
import Creataccount from '@/components/seting/Creataccount'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/Sign'
			
		},
		{
			path: '/Sign',
			component: Sign
			
		},
		{
			path: '/Main',
			component: Main,
			children:[
				{
					path: '',
					component: Worktable
				},
				{
					path: 'Worktable',
					component: Worktable
				},
				{
					path: 'Shoplist',
					component: Shoplist
				},
				{
					path: 'Addshop',
					component: Addshop
				},
				{
					path: 'Shopdetail',
					component: Shopdetail
				},
				{
					path: 'ChangeShopInfo',
					component: ChangeShopInfo
				},
				{
					path: 'Joinapply',
					component: Joinapply
				},
				{
					path: 'Joindetail',
					component: Joindetail
				},
				{
					path: 'Shopactive',
					component: Shopactive
				},
				{
						path: 'Editactive',
						component: Editactive
				},
				{
					path: 'Userlist',
					component: Userlist
				},
				{
					path: 'Userdetail',
					component: Userdetail
				},
				{
					path: 'Totalcoin',
					component: Totalcoin
				},
				{
					path: 'Userdetail',
					component: Userdetail
				},
				{
					path: 'Businesslist',
					component: Businesslist
				},
				{
					path: 'Addbusiness',
					component: Addbusiness
				},
				{
					path: 'Businessdetail',
					component: Businessdetail
				},
				{
					path: 'Businesssetting',
					component: Businesssetting
				},
				{
					path: 'Groupproject',
					component: Groupproject
				},
				{
					path: 'Addgroupproject',
					component: Addgroupproject
				},
				{
					path: 'Groupprojectdetail',
					component: Groupprojectdetail
				},
				{
					path: 'Accountmanage',
					component: Accountmanage
				},
				{
					path: 'Accountmanage',
					component: Accountmanage
				},
				{
					path: 'Meetlist',
					component: Meetlist
				},
				{
					path: 'Meetdetail',
					component: Meetdetail
				},

				{
					path: 'Batterydamage',
					component: Batterydamage
				},
				{
					path: 'Pikingrecord',
					component: Pikingrecord
				},
				{
					path: 'Addorder',
					component: Addorder
				},
				{
					path: 'Subtractorder',
					component: Subtractorder
				},
				{
					path: 'Deposit',
					component: Deposit
				},
				{
					path: 'Rebate',
					component: Rebate
				},
				{
					path: 'Rent',
					component: Rent
				},
				{
					path: 'Tablerecord',
					component: Tablerecord
				},
				{
					path: 'Moneyrecord',
					component: Moneyrecord
				},
		
				{
					path: 'Weixinrecord',
					component: Weixinrecord
				},
				{
					path: 'Ensure',
					component: Ensure
				},
				{
					path: 'Getapply',
					component: Getapply
				},
				{
					path: 'Getapplyrecord',
					component: Getapplyrecord
				},
				{
					path: 'Useramount',
					component: Useramount
				},
				{
					path: 'Shopscore',
					component: Shopscore
				},
				{
					path: 'Businessscore',
					component: Businessscore
				},
				{
					path: 'Pushuser',
					component: Pushuser
				},
				{
					path: 'Seting',
					component: Seting
				},
				{
					path: 'Batterymanage',
					component: Batterymanage
				},
				{
					path: 'Personaccount',
					component: Personaccount
				},
				{
					path: 'Problorm',
					component: Problorm
				},
				{
					path: 'Addbattery',
					component: Addbattery
				},
				{
					path: 'Creataccount',
					component: Creataccount
				}
				
				
				
			]
			
		},
		{
			path: '*',
			component: Error
		}
		
		
	

	]
})