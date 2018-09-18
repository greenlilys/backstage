import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/componentd/Main'
import Sign from '@/componentd/Sign'
import Worktable from '@/componentd/workTable/Worktable'
import Error from '@/componentd/error/Error'

//网点
import Shoplist from '@/componentd/shop/Shoplist'
import Addshop from '@/componentd/shop/Addshop'
import Shopdetail from '@/componentd/shop/Shopdetail'
import ChangeShopInfo from '@/componentd/shop/ChangeShopInfo'
import Joinapply from '@/componentd/shop/Joinapply'
import Joindetail from '@/componentd/shop/Joindetail'


//用户
import Userlist from '@/componentd/user/Userlist'
import Userdetail from '@/componentd/user/Userdetail'
import Totalcoin from '@/componentd/user/Totalcoin'

//团购
import Groupproject from '@/componentd/Groupaccount/Groupproject'
import Addgroupproject from '@/componentd/Groupaccount/Addgroupproject'
import Groupprojectdetail from '@/componentd/Groupaccount/Groupprojectdetail'
import Accountmanage from '@/componentd/Groupaccount/Accountmanage'
import GroupprojectMod from '@/componentd/Groupaccount/GroupprojectMod'

//预约
import Meetlist from '@/componentd/meet/Meetlist'
import Meetdetail from '@/componentd/meet/Meetdetail'
import Batterydamage from '@/componentd/meet/Batterydamage'

//资金  
import Fanli from '@/componentd/money/Fanli'
import Rent from '@/componentd/money/Rent'
import Ensure from '@/componentd/money/Ensure'
//统计
import Useramount from '@/componentd/amount/Useramount'
import Shopscore from '@/componentd/amount/Shopscore'

//设置
import Personaccount from '@/componentd/seting/Personaccount'
import Creataccount from '@/componentd/seting/Creataccount'
import Updateaccount from '@/componentd/seting/Updateaccount'

//营销
import Listactivity from '@/componentd/marketing/Listactivity'
import Addactivity from '@/componentd/marketing/Addactivity'


Vue.use(Router)

export default new Router({	
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
					path: 'Groupproject',
					component: Groupproject
				},
				{
					path: 'Addgroupproject',
					component: Addgroupproject
				},
				{
					path:'GroupprojectMod',
					component: GroupprojectMod
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
					path: 'Fanli',
					component: Fanli
				},				
				
				{
					path: 'Rent',
					component: Rent
				},
				
				{
					path: 'Ensure',
					component: Ensure
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
					path: 'Personaccount',
					component: Personaccount
				},

				{
					path: 'Creataccount',
					component: Creataccount
				},
				{
					path: 'Updateaccount',
					component: Updateaccount
				},

				{
					path: 'Addactivity',
					component: Addactivity	
				},
				{
					path: 'Listactivity',
					component: Listactivity	
				}
			
				
			]
			
		},
		{
			path: '*',
			component: Error
		}
		
		
	

	]
})