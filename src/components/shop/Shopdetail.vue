<template>
	<div class="shopDetail bgHui flex-wrap flex-vertical">		
			<div class="baseInfo flex-wrap flex-horizontal">
				<div class="baseLeft flex-wrap flex-horizontal">
					<img src="../../assets/images/001.png"/>
					<div class="leftName flex-wrap flex-vertical flex-justify-around"> 
						<div><span class="font-18 fw6">小李电动快修</span><span class="font-14">网点编号：Z001</span></div>
						<div class="star"><img src="../../assets/images/002.png"/><img src="../../assets/images/002.png"/></div>
					</div>
				</div>
				<div class="baseCenter">
					<div class="font-14">所属运营商：郑州第一运营中心（TNC0001）</div>
				</div>
				<div class=" flex-wrap flex-horizontal flex-align-center flex-justify-end baseRight font-14">
					<div class="stage"><span>网点状态：</span><span>上线中</span></div>
					<el-button type="primary" size="small" class="btnStyle">下&nbsp;&nbsp;&nbsp;线</el-button>	
					<el-button type="primary" size="small" class="btnStyle" @click="navChangeShopInfo">查看/修改网点信息</el-button>	
				</div>
			</div>	
			
			<div class="numInfo flex-wrap flex-horizontal flex-justify-between">
				<div class="account tc">
					<h1 class="font-16 colorYellow">账号管理</h1>
					<div class="font-14 mt-10">账号：18843411171&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;启用中</div>
					<el-button type="primary" size="small" class="btnStyle mt-10">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>	
				</div>
				<div class="tc ">
					<h1 class="font-16 colorYellow">电池库存</h1>
					<div class="font-14 mt-10">60&20&nbsp;&nbsp;15/15组&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;72&20&nbsp;&nbsp;10/12组</div>
					<el-button type="primary" size="small" class="btnStyle mt-10">+&nbsp;补货记录</el-button>	
				</div>
				<div class="tc">
					<h1 class="font-16 colorYellow">配货成本</h1>
					<h2 class="font-14 mt-20 ">￥15200.00</h2>
				</div>
				<div class="tc">
					<h1 class="font-16 colorYellow">钱包余额</h1>
					<div class="font-14 mt-10">￥3564.00</div>
					<el-button type="primary" size="small" class="btnStyle mt-10">充&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;值</el-button>
					<el-button type="primary" size="small" class="btnStyle mt-10">扣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款</el-button>
				</div>
				<div class="tc">
					<h1 class="font-16 colorYellow">退换回收电池</h1>
					<div class="font-14 mt-10">60&20&nbsp;&nbsp;5组&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;72&20&nbsp;&nbsp;10组</div>
					<el-button type="primary" size="small" class="btnStyle mt-10">+&nbsp;回收记录</el-button>	
				</div>
			</div>
			
			<div class="conBottom mt-10 flex-con">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>				
				
				<component v-bind:is="current"></component>
			</div>
			
			
	</div>
	
</template>

<script>
	import Order from '@/components/shop/Order'
	import Stock from '@/components/shop/Stock'
	import Confifure from '@/components/shop/Confifure'
	import Money from '@/components/shop/Money'
	import Recharge from '@/components/shop/Recharge'
	import Member from '@/components/shop/Member'
	import Exchange from '@/components/shop/Exchange'
	import Help from '@/components/shop/Help'
	
	export default {
      data() {
        return {
        	tabItem:['预约服务记录','补货记录','配货记录','钱包记录','钱包充值记录','会员','退还电池回收记录','救援服务记录'],
        	tabComponents:['Order','Stock','Confifure','Money','Recharge','Member','Exchange','Help'],
        	current:'Order',
        	currentI:'0'
         
        }
      },
      methods:{	    	
	      navChangeShopInfo(){	      	
	      	this.$router.push('/Shoplist/Shopdetail/ChangeShopInfo');
	      },
	    
	      changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
	      }
      },
      components:{
      	Order,
      	Stock,
      	Confifure,
      	Money,
      	Recharge,
      	Member,
      	Exchange,
      	Help
      }
    }
</script>

<style scoped>
	.shopDetail{box-sizing: border-box;}
	.baseInfo{height:100px;background:#fff;box-sizing: border-box;padding:10px 20px;}
	.baseLeft,.baseCenter{width:30%;border-right:1px solid #EBF0F4;}
	.baseLeft img{display:inline-block;width:80px;border-radius:50%;}
	.leftName{margin-left:10px;}
	.leftName span:nth-child(1){margin-right:10px;}
	.star img{display:inline-block;height:30px;width:30px;margin-right:4px;}
	.baseCenter div{text-align:center;height:80px;line-height:80px;}
	.baseRight{width:40%;}
	.baseRight div:nth-child(1),.baseRight div:nth-child(2){margin-right:10px;}
	.baseRight div:nth-child(2),.baseRight div:nth-child(3){cursor: pointer;}
	.stage span:nth-child(2){color:#FF9900;margin-right:20px;}
	
	.numInfo>div{background:#fff;margin-right:10px;flex:1;margin-top:10px;padding:10px 0px;}
	.numInfo div:nth-child(5){margin-right:0;}
	
	.conBottom{width:100%;padding:10px;background:#fff;position:relative;}
	.tabCard{background:#fff;border-top:2px solid #FF9900;border-bottom:1px solid #EBF0F4;}
	.tabCard div{font-size:16px;line-height: 26px;padding:10px 20px;background:#fff;cursor: pointer;}
	.tabCard .actived{background:#FF9900;color:#fff;}	
	
</style>