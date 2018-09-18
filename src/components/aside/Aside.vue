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
						<div class="item font-14 subitem "><router-link to='/Main/Shopnoticelist' class="pl40">网点公告</router-link></div>
			</el-collapse-item>
						
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>用户</span>
						</template>
						
						<div class="item font-14 subitem"><router-link to='/Main/Userlist' class="pl40">用户列表</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Totalcoin' class="pl40">天牛币记录</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>运营商</span>
						</template>
						<div class="item font-14 subitem"><router-link to='/Main/Businesslist' class="pl40">运营商列表</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Businesssetting' class="pl40">运营商设置</router-link></div>
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
						<!--<div class="item font-14 subitem">救援订单</div>-->						
						<div class="item font-14 subitem"><router-link to='/Main/Batterydamage' class="pl40">电池报损</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>产品</span>
						</template>						
						<div class="item font-14 subitem"><router-link to='/Main/Pikingrecord' class="pl40">运营商配货记录</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Addorder' class="pl40">运营商增配订单</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Subtractorder' class="pl40">运营商减配订单</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>资金</span>
						</template>
						<div class="item font-14 subitem"><router-link to='/Main/Rent' class="pl40">租金-租金纪录</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Deposit' class="pl40">押金-缴纳记录</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Moneyrecord' class="pl40">钱包/天牛币纪录-网点钱包</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Ensure' class="pl40">保证金</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Getapply' class="pl40">提现申请</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Getapplyrecord' class="pl40">提现记录</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Rebate' class="pl40">运营商返利结算</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Weixinrecord' class="pl40">微信/支付宝记录</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Tablerecord' class="pl40">平台操作记录</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>营销</span>
						</template>
				
						<div class="item font-14 subitem"><router-link to='/Main/PlatformNoticeList' class="pl40">平台公告</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Listactivity' class="pl40">平台活动</router-link></div>
						<!--<div class="item font-14 subitem pl40"><router-link to=''>运营商活动</router-link></div>-->
			</el-collapse-item>

			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>统计</span>
						</template>
						
						<div class="item font-14 subitem"><router-link to='/Main/Useramount' class="pl40">用户统计</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Shopscore' class="pl40">网点业绩</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Businessscore' class="pl40">运营商业绩</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Pushuser' class="pl40">推荐用户</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>设置</span>
						</template>
						<div class="item font-14 subitem"><router-link to='/Main/Seting' class="pl40">业务设置-服务设置</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Batterymanage' class="pl40">产品管理</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Personaccount' class="pl40">员工账号管理</router-link></div>
						<div class="item font-14 subitem"><router-link to='/Main/Problormlist' class="pl40">常见问题</router-link></div>
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
				document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				if(document.documentElement && document.documentElement.clientHeight){
					this.caoheight = document.documentElement.clientHeight + document.documentElement.scrollTop - 50;
				}else if(document.body && document.body.clientHeight){
					this.caoheight = document.body.clientHeight + document.body.scrollTop - 50;
				}
				
			}
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll)
		},
		components: {
			
		}
	}
</script>
<style scope>
		.aside {width: 13%;background:#273135;}
		.aside a{display:inline-block;width:100%;color:#B7C6CC;}
		.box {width: 10%;}		
		.worktable{background:#273135;color:#B7C6CC;}
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
		 
</style>