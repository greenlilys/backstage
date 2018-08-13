<template>	
		
	<div class="flex-wrap flex-vertical">		
		
			<div class="shopInfo">
				<h1 class="fontYellow">预约信息</h1>
				<p>预约编号：<span>{{meetData.no}}</span> </p>
				<p>预约类型：<span>{{meetData.types}}</span></p>
				<p>预约时间： <span>{{meetData.addtime}}</span> </p>
				<p>预约状态： <span>{{meetData.states}}</span> </p>
				<p>完成时间：<span>{{meetData.finishtime}}</span> </p>
			</div>
			
			<div class="shopInfo mt-10">
				<h1 class="fontYellow">预约用户信息</h1>
				<p>预约用户：<span>{{meetData.username}}</span> </p>
				<p>电池套餐：<span>{{meetData.batteryname}}</span> </p>
				<p v-if="meetData.type == 1? true :false">换电费/积分：{{meetData.cost}}</p>
				<p v-if="meetData.type == 1? true :false">支付方式：{{meetData.paymodes}}&nbsp;&nbsp;{{meetData.paymentno}}</p>
			</div>
		
		<div class="shopInfo mt-10">
			<h1 class="fontYellow">服务网点信息</h1>
			<p>网点编号：{{meetData.shopno}}</p>
			<p>网点名称：{{meetData.name}}</p>
			<p>地址：{{meetData.cityname + meetData.countyname +meetData.address}}</p>
			<p>联系人：{{meetData.contactname}}</p>
		</div>
		
		<div class="shopInfo mt-10">
			<h1 class="fontYellow">用户评价</h1>
			<p>{{meetData.score}}分</p>			
		</div>
		<div class="shopInfo mt-10">
			<h1 class="fontYellow">异常情况：</h1>
			<p>异常情况：{{meetData.stated}}</p>
			<p v-if="meetData.type == 2? true :false">报损情况：{{meetData.reviewstates}}</p>
		</div>
	
	
	</div>
</template>

<script>
	export default{
		name:'',
		data(){
			return{
				id:'',
				meetData:{}
			}
		},
		methods:{
			getMeetdetail(id){
				this.$get('appointOrder/selectDetail',{
					id:id
				}).then(data=>{
					var meetData = data;
					this.meetData = meetData;
						switch(meetData.type){
							case 0:
							meetData.types = "安装"
							break;
							case 1:
							meetData.types = "更换"
							break;
							case 2:
							meetData.types = "退租"
							break;
							default:
							meetData.types = "--"
							
						}
						switch(meetData.state){
							case 0:
							meetData.states = "预约中"
							break;
							case 1:
							meetData.states = "处理成功"
							break;
							case 2:
							meetData.states = "过期"
							break;
							case 3:
							meetData.states = "已取消"
							break;							
							case 5:
							meetData.states = "电池报损处理中"
							break;							
							case 99:
							meetData.states = "支付中"
							break;
							default:
							meetData.states = "--"
							
						}
						switch(meetData.state){							
							case 4:
							meetData.stated = "型号不符"
							break;							
							case 6:
							meetData.stated = "电池已损坏"
							break;							
							default:
							meetData.stated = "无"
							
						}
						switch(meetData.reviewstate){
							case 1:
							meetData.reviewstates = "待审查"
							break;
							case 2:
							meetData.reviewstates = "确认损坏"
							break;							
							case 3:
							meetData.reviewstates = "未损坏"
							break;							
							default:
							meetData.reviewstates = "无"
							
						}
						switch(meetData.paymode){
							case 0:
							meetData.paymodes = "支付宝"
							break;
							case 1:
							meetData.paymodes = "微信"
							break;
							case 2:
							meetData.paymodes = "钱包支付"
							break;
							case 3:
							meetData.paymodes = "天牛币支付"
							break;
							default:
							meetData.paymodes = "--"
							
						}
				})
			}
		},
		created(){
			this.id = this.$route.query.id;
		},
		mounted(){
			this.getMeetdetail(this.id);
		}
	}
</script>

<style scoped>	
	.shopInfo,.shopPhoto{background:#fff;padding:10px 20px;}	
	p{line-height:22px;font-size:14px;}
	.shopPhoto img{display:block;width:58%;margin-top:10px;}
	.shopInfo h1{line-height:26px; font-size:16px;}
</style>