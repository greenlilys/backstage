import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Sign from '@/components/Sign'
import Worktable from '@/components/worktable/Worktable'
import Active from '@/components/active/Active'
import Amount from '@/components/amount/Amount'
import Meet from '@/components/meet/Meet'
import Seting from '@/components/seting/Seting'
import Shop from '@/components/shop/Shop'
import User from '@/components/user/User'

import Joinshop from '@/components/shop/Joinshop'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  {
  	path:'/Worktable',
  	component:Worktable
  },
   {
   	path:'/Shop',
   	component:Shop,
   	children:[
   		{
   			path:'Joinshop',
   			component:Joinshop
   		}
   	]
   }
   
  ]
})
