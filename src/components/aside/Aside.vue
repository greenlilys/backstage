<template>
	<div class="aside">	
		<div class="worktable font-14">
				<router-link to='/Main/Worktable'><i class="header-icon el-icon-info iconWidth"></i>工作台</router-link>
		</div>
		<el-collapse accordion >			
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>网点</span>
						</template>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Shoplist'>网点列表</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Joinapply'>加盟申请</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Shopactive'>网点活动</router-link></div>
						<div class="item font-14 subitem pl40">平台公告</div>
			</el-collapse-item>
						
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>用户</span>
						</template>
						
						<div class="item font-14 subitem pl40"><router-link to='/Main/Userlist'>用户列表</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Totalcoin'>天牛币记录</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>运营商</span>
						</template>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Businesslist'>运营商列表</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Businesssetting'>运营商设置</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>团购账号</span>
						</template>
				
						<div class="item font-14 subitem pl40"><router-link to='/Main/Groupproject'>团购项目</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Accountmanage'>账号管理</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>预约</span>
						</template>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Meetlist'>预约列表</router-link></div>
						<div class="item font-14 subitem pl40">救援订单</div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Batterydamage'>电池报损</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>电池</span>
						</template>						
						<div class="item font-14 subitem pl40"><router-link to='/Main/Pikingrecord'>运营商配货记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Addorder'>运营商增配订单</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Subtractorder'>运营商减配订单</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>资金</span>
						</template>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Deposit'>押金-缴纳记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Rent'>租金-租金纪录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Moneyrecord'>钱包/天牛币纪录-网点钱包</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Ensure'>保证金</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Getapply'>提现申请</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Getapplyrecord'>提现记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Rebate'>运营商返利结算</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Weixinrecord'>微信/支付宝记录</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Tablerecord'>平台操作记录</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>统计</span>
						</template>
						
						<div class="item font-14 subitem pl40"><router-link to='/Main/Useramount'>用户统计</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Shopscore'>网点业绩</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Businessscore'>运营商业绩</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Pushuser'>推荐用户</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>设置</span>
						</template>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Seting'>业务设置-服务设置</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Batterymanage'>电池管理</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Personaccount'>员工账号管理</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Main/Problorm'>常见问题</router-link></div>
			</el-collapse-item>
		</el-collapse>
	</div>

</template>
<script>
	export default {
		name: '',
		data() {
			return {

			}
		},
		methods: {

		},
		components: {

		}
	}
</script>
<style scope>
		.aside {width: 13%;box-sizing: border-box;height:100%;background:#273135;}
		.aside a{display:inline-block;width:100%;color:#B7C6CC;}
		.box {width: 10%;}		
		.worktable{height:42px;line-height: 42px;background:#273135;color:#B7C6CC;padding-left:20px;}
		.iconWidth{width:20px;}
		.el-collapse,.el-collapse-item__wrap,.el-collapse-item__header{border:none;}
		.el-collapse-item__wrap{background:#303E42;color:#B7C6CC;}
		.el-collapse-item__content{color:#B7C6CC;padding-bottom:0;}
		.el-collapse-item__header{background:#273135;color:#B7C6CC;}
		.pl20{padding-left:20px;}
		.pl40{padding-left:40px;}
		.pl20{padding-left:20px;}
		.pl60{padding-left:60px;}
		.pl80{padding-left:80px;}
		.subitem{height:38px;line-height: 38px;}
		.subitem:hover{cursor: pointer;}
		 .el-cascader-menu__item.is-disabled:hover, .el-collapse-item__header,.el-carousel__mask, .el-cascader-menu{}
</style>