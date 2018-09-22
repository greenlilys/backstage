<template>
	<div class="aside" :style="{height:caoheight + 'px'}" ref="haside">	
		<div class="worktable font-14">
				<router-link to='/Main/Worktable'><i class="header-icon el-icon-info iconWidth pl20"></i>工作台</router-link>
		</div>
		<el-collapse accordion >			
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>网点</span>
						</template>
						<div class="item font-14 subitem"><router-link to='/Main/Shoplist' class="pl40">网点列表</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Joinapply' class="pl40">加盟申请</router-link></div>						
			</el-collapse-item>
						
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>用户</span>
						</template>
						
						<div class="item font-14 subitem"><router-link to='/Main/Userlist' class="pl40">用户列表</router-link></div>
						<div class="item font-14 subitem "><router-link to='/Main/Totalcoin' class="pl40">天牛币记录</router-link></div>
			</el-collapse-item>	
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>团购账号</span>
						</template>
				
						<div class="item font-14 subitem"><router-link to='/Main/Groupproject' class="pl40">团购项目</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Accountmanage' class="pl40">账号管理</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>预约</span>
						</template>
						<div class="item font-14 subitem"><router-link to='/Main/Meetlist' class="pl40">预约列表</router-link></div>
						<!--<div class="item font-14 subitem pl40">救援订单</div>-->
						<div class="item font-14 subitem"><router-link to='/Main/Batterydamage' class="pl40">电池报损</router-link></div>
			</el-collapse-item>			
		
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>资金</span>
						</template>

						<div class="item font-14 subitem pl40"><router-link to='/Main/Deposit'>押金-缴纳记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Rent'>租金-租金纪录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Moneyrecord'>钱包/天牛币记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Ensure'>保证金</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Getapply'>提现申请</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Getapplyrecord'>提现记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Rebate'>运营商返利结算</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Weixinrecord'>微信/支付宝记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Tablerecord'>平台操作记录</router-link></div>

						<div class="item font-14 subitem"><router-link to='/Main/Fanli' class="pl40">返利记录</router-link></div>
						<!-- <div class="item font-14 subitem"><router-link to='/Main/Rent' class="pl40">租金管理-租金纪录</router-link></div>
						
						<div class="item font-14 subitem"><router-link to='/Main/Ensure' class="pl40">保证金</router-link></div>
						 -->

			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>营销</span>
						</template>	
						<div class="item font-14 subitem"><router-link to='/Main/Listactivity' class="pl40">活动</router-link></div>						
			</el-collapse-item>

			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>统计</span>
						</template>
						
						<div class="item font-14 subitem"><router-link to='/Main/Useramount' class="pl40">用户统计</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Shopscore' class="pl40">网点业绩</router-link></div>
						
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>设置</span>
						</template>						
						<div class="item font-14 subitem"><router-link to='/Main/Personaccount' class="pl40">员工账号管理</router-link></div>
						
			</el-collapse-item>
		</el-collapse>
	</div>

</template>
<script>
	export default {
		name: '',
		data() {
			return {
				caoheight:''
			}
		},
		methods: {
			handleScroll(){				
				if(document.documentElement && document.documentElement.clientHeight){
					this.caoheight = document.documentElement.clientHeight + document.documentElement.scrollTop - 50;
				}else if(document.body && document.body.clientHeight){
					this.caoheight = document.body.clientHeight + document.body.scrollTop - 50;
				}
				
			}
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll)
		}
	}
</script>
<style scope>
		.aside {width: 13%;background:#273135;}
		.aside a{display:inline-block;width:100%;color:#B7C6CC;}
		.box {width: 10%;}			
		.iconWidth{width:20px;}
		.el-collapse,.el-collapse-item__wrap,.el-collapse-item__header{border:none;}
		.el-collapse-item__wrap{background:#303E42;}
		.el-collapse-item__content{padding-bottom:0;}
		.el-collapse-item__header{background:#273135;color:#B7C6CC;font-size:14px;}
		.pl20{padding-left:20px;}
		.pl40{padding-left:40px;}
		.pl20{padding-left:20px;}
		.pl60{padding-left:60px;}
		.pl80{padding-left:80px;}
		.subitem{height:38px;line-height: 38px;}
		.subitem:hover{cursor: pointer;}
		
</style>