<template>
	<div class="aside">	
		<div class="worktable"><router-link to='/Worktable'>工作台</router-link></div>
		<el-collapse accordion >
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>网点</span>
						</template>
						<div class="item font-14 subitem pl40"><router-link to='/Shoplist'>网点列表</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Joinapply'>加盟申请</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Shopactive'>网点活动</router-link></div>
						<div class="item font-14 subitem pl40">平台公告</div>
			</el-collapse-item>
						
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>用户</span>
						</template>
						
						<div class="item font-14 subitem pl40"><router-link to='/Userlist'>用户列表</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Totalcoin'>天牛币记录</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>运营商</span>
						</template>
						<div class="item font-14 subitem pl40"><router-link to='/Businesslist'>运营商列表</router-link></div>
						<div class="item font-14 subitem pl40"><router-link to='/Businesssetting'>运营商设置</router-link></div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>团购账号</span>
						</template>
						<div class="item font-14 subitem pl40">流程</div>
						<div class="item font-14 subitem pl40">团购项目</div>
						<div class="item font-14 subitem pl40">账号管理</div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>预约</span>
						</template>
						<div class="item font-14 subitem pl40">预约列表</div>
						<div class="item font-14 subitem pl40">救援订单</div>
						<div class="item font-14 subitem pl40">电池报损</div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>电池</span>
						</template>						
						<div class="item font-14 subitem pl40">运营商配货记录</div>
						<div class="item font-14 subitem pl40">运营商增配订单</div>
						<div class="item font-14 subitem pl40">运营商减配订单</div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>资金</span>
						</template>
						<div class="item font-14 subitem pl40">押金-缴纳记录</div>
						<div class="item font-14 subitem pl40">租金-租金纪录</div>
						<div class="item font-14 subitem pl40">钱包/天牛币纪录-网点钱包</div>
						<div class="item font-14 subitem pl40">保证金</div>
						<div class="item font-14 subitem pl40">提现申请</div>
						<div class="item font-14 subitem pl40">提现记录</div>
						<div class="item font-14 subitem pl40">微信/支付宝记录</div>
						<div class="item font-14 subitem pl40">平台操作记录</div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>统计</span>
						</template>
						
						<div class="item font-14 subitem pl40">用户统计</div>
						<div class="item font-14 subitem pl40">网点业绩</div>
						<div class="item font-14 subitem pl40">运营商业绩</div>
						<div class="item font-14 subitem pl40">推荐用户</div>
			</el-collapse-item>
			
			<el-collapse-item>
						<template slot="title">
							<span class="oneTitle pl20"><i class="header-icon el-icon-info iconWidth"></i>设置</span>
						</template>
						<div class="item font-14 subitem pl40">业务设置-服务设置</div>
						<div class="item font-14 subitem pl40">电池管理</div>
						<div class="item font-14 subitem pl40">员工账号管理</div>
						<div class="item font-14 subitem pl40">常见问题</div>
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
		.aside {width: 13%;box-sizing: border-box;height:890px;background:#273135;}
		.aside a{display:inline-block;width:100%;color:#B7C6CC;}
		.box {width: 10%;}		
		.worktable{height:38px;line-height: 38px;background:#273135;color:#B7C6CC;padding-left:20px;}
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