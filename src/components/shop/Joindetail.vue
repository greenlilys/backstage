<template>	
		
	<div class="flex-wrap flex-vertical">		
		<div class="flex-wrap flex-horizontal flex-justify-between joindetail">
			<div class="joinHead">
				<h1 class="fontYellow font-16">店铺加盟申请</h1>
				<p>申请时间：2017-08-01 14:50</p>
				<p>店铺状态：<span class="fontYellow">待审核</span></p>
				<p>保证金：通过审核后可支付</p>
				<!--<div>未通过原因：<span class="fontYellow mr-20">营业执照已过期</span><span>操作时间：2017-08-01 14:50</span></div>-->
				<p>支付方式：支付宝ZY159863255655</p>
				<p>支付保证金：￥3000</p>
				<p>支付配货成本：￥22000</p>
				<p>选配电池：6020锂电&nbsp;&nbsp;5组&nbsp;&nbsp;&nbsp;&nbsp;7020锂电&nbsp;&nbsp;5组</p>
			</div>
			
			<div class="joinight">
				
				<el-button type="success" size="small" class="mt-10">通过审核</el-button>
				<el-button type="danger" size="small" class="mt-10">不予通过</el-button>
				<p class="fontYellow mt-20">请在加盟商支付保证金及配货成本金，并完成配货后，操作店铺上线，上线后用户可预约此网点服务。</p>
			</div>	
		</div>
		
		<div class="persionInfo mt-10">
			<h1 class="fontYellow font-16">基本信息</h1>
			<p>店主姓名：李龙昌</p>
			<p>联系电话：13598096785</p>
			<p>身份证号码：13598096785558899</p>
		</div>
		
		<div class="shopInfo mt-10">
			<h1 class="fontYellow font-16">店铺信息</h1>
			<p>店铺名称：校长服务店</p>
			<p>店铺所在地区：河南省二七区</p>
			<p>店铺详细地址：新天地大厦旁</p>
			<p>经营范围：电动车修理</p>
			<p>开业时间：2018-12-15</p>
			<p>店铺经营面积：10m<sup>2</sup></p>
		</div>
		
		<div class="shopPhoto mt-10 flex-wrap flex-horizontal flex-con">
			<div class="flex-con">
				<p>营业执照</p>
				<div><img src="../../assets/images/001.png" alt="" /></div>
			</div>
			<div class="flex-con">
				<p>门头照片</p>
				<div><img src="../../assets/images/001.png" alt="" /></div>
			</div>
			<div class="flex-con">
				<p>店内照片</p>
				<div><img src="../../assets/images/001.png" alt="" /></div>
			</div>
		
		</div>
	
	</div>
</template>

<script>
</script>

<style scoped>	
	.joindetail,.persionInfo,.shopInfo,.shopPhoto{background:#fff;padding:10px 20px;}	
	p{line-height:22px;font-size:14px;}
	h1.fontYellow{line-height: 26px;}
	.joinight{width:20%;}
	.joinight .fontYellow{text-align: justify;}
	.shopPhoto img{display:block;width:50%;margin-top:10px;}
</style>