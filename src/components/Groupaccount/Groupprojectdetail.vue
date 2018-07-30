<template>
	<div>
		<div class="groupProjectDetail flex-wrap flex-vertical">
			<div class="headItem flex-wrap flex-horizontal">
				<div>
					<h1 class="font-20">经开区第三配送中心</h1>
					<p>联系人：王晓易&nbsp;&nbsp;18596385695</p>
					<p>主账号：JD10856</p>
					<p>所在区域：河南省、郑州市、经开区</p>
				</div>
				<div>
					<div class="flex-wrap flex-horizontal flex-justify-between">
						<h1 class="font-20">套餐详情</h1>
						<el-button type="primary" class="btnStyle" @click="">编辑</el-button>
					</div>
					<p>租用电池：6020&nbsp;&nbsp;每组押金：￥500.00</p>
					<p>月租金：￥228.00（每月21000天牛币）</p>
					<p>季租金：￥599.00（每月63000天牛币）</p>
					<p>年租金：￥2269.00（每月21000天牛币）</p>
				</div>
				<div>
					<h1 class="font-20">可添加子账号数量：</h1>
					<h1 class="font-20">已添加子账号数量：</h1>
					<p class="fontYellow">等待主账号支付押金&租金</p>
				</div>
			</div>
			
			<div class="conBottom mt-10 flex-con">						
				<div class="tabCard clear">
						<div class="fl" v-for="(v,i) in tabItem" @click="changeItem(v,i)" :class="{actived : i == currentI}">{{v}}</div>						
						<el-button type="primary" class="btnStyle fr mt-10" size="small" @click="" >+&nbsp;添加子帐号</el-button>
						<el-button type="primary" class="btnStyle fr mt-10 mr-10" size="small" @click="" >关闭项目</el-button>					
				</div>
				<el-row class="searchBox" type="flex" align="middle">
					<el-col :span="6" :offset="18">
						<div>
							<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
								<el-button slot="append" icon="el-icon-search">搜索</el-button>
							</el-input>
						</div>
					</el-col>
				</el-row>
				<component v-bind:is="current"></component>
			</div>
		</div>
	</div>
</template>

<script>
	import Subaccount from '@/components/Groupaccount/Subaccount'
	import Payrecord from '@/components/Groupaccount/Payrecord'
	
	export default{
		data(){
			return{
				tabItem:['项目子帐号','支付记录'],
	        	tabComponents:['Subaccount','Payrecord'],
	        	current:'Subaccount',
	        	currentI:'0',
	        	find:''
			}
			
		},
		methods:{
			changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
	      }
		},
		components:{
			Subaccount,
			Payrecord
		}
	}
</script>

<style scoped>
	.groupProjectDetail{height:100%;}
	.headItem>div{margin-right:10px;flex:1;height:160px;background:#fff;padding:10px 20px;}
	.headItem>div:nth-child(3){margin-right:0;}
	.headItem h1{line-height: 30px;}
	.headItem p{line-height: 24px;}		
	.searchBox{padding:10px 0;}
</style>