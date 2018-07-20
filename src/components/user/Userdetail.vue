<template>
	<div class="flex-wrap flex-vertical userDetail">
		<div class="flex-wrap flex-horizontal">
			<div class="flex-wrap flex-horizontal infoBox">
				<div class="imgBox"> <img src="../../assets/images/001.png" alt="" /> </div>
				<div class="rightInfo">
					<p>用户账号：13598096785&nbsp;&nbsp;&nbsp;&nbsp;昵称：小丸子</p>								
					<p>注册时间：2017-12-21&nbsp;&nbsp;&nbsp;&nbsp;推荐人：刘德华</p>
					<p>电池型号：6020锂电1组</p>
					<p>安装状态：已安装</p>
					<p>租期状态：租期中&nbsp;&nbsp;&nbsp;&nbsp;至2018-9-23</p>					
				</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">钱包余额</p>
				<p class="mt-10 fontYellow font-20 tc">￥200.00</p>
				<div class="mt-20 tc"><el-button type="success" size="small" class="btnStyle">充值</el-button><el-button type="success" size="small" class="btnStyle">扣款</el-button></div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">天牛币余额</p>
				<p class="mt-10 fontYellow font-20 tc">15685</p>
				<div class="mt-20 tc"><el-button type="success" size="small" class="btnStyle">充值</el-button><el-button type="success" size="small" class="btnStyle">扣款</el-button></div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">押&nbsp;&nbsp;&nbsp;&nbsp;金</p>
				<p class="mt-10 fontYellow font-20 tc">￥10000</p>
				<p class="font-16 tc mt-20">滞纳金 <span class="fontYellow">￥60.00</span></p>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">换电次数</p>
				<p class="mt-10 fontYellow font-20 tc">200</p>
			</div>
		</div>
		
		<div class="mt-10 mainContent flex-con">
			<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
			</div>	
			<component v-bind:is="current"></component>
		</div>
	</div>
</template>

<script>
	import Orders from '@/components/user/Orders'
	import Rent from '@/components/user/Rent'
	import Deposit from '@/components/user/Deposit'
	import Purse from '@/components/user/Purse'
	import Coin from '@/components/user/Coin'
	import Members from '@/components/user/Members'
	
	export default {
		data(){
			return{
				tabItem:['预约记录','租期记录','押金记录','钱包记录','天牛币记录','会员'],
	        	tabComponents:['Orders','Rent','Deposit','Purse','Coin','Members'],
	        	current:'Orders',
	        	currentI:'0'
			}
			
		},
		methods:{
			changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
	     }
	    
		},
		components:{
			Orders,
			Rent,
			Deposit,
			Purse,
			Coin,
			Members
		}
	}
</script>

<style scoped>
	.userDetailHead{padding:10px 20px 0;}
	.userDetail .infoBox{background:#fff;width:30%;padding:10px 0;margin-right:10px;}
	.userDetail .imgBox{width:30%;text-align:center;}
	.userDetail .imgBox img{display:inline-block;width:80px;height:80px;border-radius:50%;}
	.userDetail .rightInfo p{line-height: 22px;margin-right:10px;}
	.userDetail .itemBox{background:#fff;margin-right:10px;padding:10px 20px;height:130px;}
	.userDetail div.itemBox:nth-child(5){margin-right:0;}	
	.userDetail .mainContent{background:#fff;padding:10px;position:relative;}
	.userDetail .tabCard{background:#fff;border-top:2px solid #FF9900;border-bottom:1px solid #EBF0F4;}
	.userDetail .tabCard div{font-size:16px;line-height: 26px;padding:10px 20px;background:#fff;cursor: pointer;}
	.userDetail .tabCard .actived{background:#FF9900;color:#fff;}
</style>