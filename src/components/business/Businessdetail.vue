<template>
	<div class="flex-wrap flex-vertical businessDetail">
		<div class="flex-wrap flex-horizontal topBox">
			<div class="flex-wrap flex-vertical infoBox">
				<div class="nameBox font-18">天牛网开封城区运营部（TNC0001）</div>
					<div class="rightInfo">
						<p>联系人：张三</p>								
						<p>代理商级别：二级代理</p>
						<p>合约经营周期：2016-03-08&nbsp;&nbsp;至&nbsp;&nbsp;2018-06-09</p>
									
					</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">运营网点</p>
				<p class="mt-20 fontYellow font-20 tc">200</p>
				
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">电池</p>
				<div class="flex-wrap flex-horizontal flex-justify-around mt-20">
					<div><p class="tc font-16">60V20A</p><p class="tc font-20 fontYellow">128</p></div>
					<div><p class="tc font-16">72V20A</p><p class="tc font-20 fontYellow">84</p></div>
				</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">返利余额</p>
				<p class="mt-20 fontYellow font-20 tc">￥10000</p>
				
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">账号状态</p>
				<p class="mt-20 fontYellow font-16 tc">启用中&nbsp;&nbsp;&nbsp;&nbsp;
					<el-button type="primary" size="mini" class="btnStyle font-16">禁&nbsp;&nbsp;用</el-button>		
				</p>
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
	
	.businessDetail .infoBox{width:30%;background:#fff;padding:10px 20px 0;margin-right:10px;}
	.businessDetail .nameBox{line-height: 32px;}
	.businessDetail .topBox{height:130px;}
	.businessDetail .imgBox{width:30%;text-align:center;}
	.businessDetail .imgBox img{display:inline-block;width:80px;height:80px;border-radius:50%;}
	.businessDetail .rightInfo p{line-height: 22px;margin-right:10px;}
	.businessDetail .itemBox{background:#fff;margin-right:10px;padding:10px 20px;height:130px;}
	.businessDetail div.itemBox:nth-child(5){margin-right:0;}	
	.businessDetail .mainContent{background:#fff;padding:10px;position:relative;}
	.businessDetail .tabCard{background:#fff;border-top:2px solid #FF9900;border-bottom:1px solid #EBF0F4;}
	.businessDetail .tabCard div{font-size:16px;line-height: 26px;padding:10px 20px;background:#fff;cursor: pointer;}
	.businessDetail .tabCard .actived{background:#FF9900;color:#fff;}
</style>