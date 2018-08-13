<template>
	<div class="flex-wrap flex-vertical businessDetail v-cloak">
		<div class="flex-wrap flex-horizontal topBox">
			<div class="infoBox">
					<div class="nameBox font-18">{{info.name}}（{{info.no}}）</div>
					<div class="rightInfo">
						<p>联系人：{{info.contactname}}</p>								
						<p>代理商级别：{{info.levelName}}</p>
						<p>合约经营周期：{{info.signtimebegin}}&nbsp;&nbsp;至&nbsp;&nbsp;{{info.signtimeend}}</p>									
					</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">运营网点 </p>
				<p class="mt-20 fontYellow font-20 tc">{{info.shopCount}}</p>				
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">电池</p>
				<div class="flex-wrap flex-horizontal flex-justify-around mt-20">
					<template v-for="item in info.batteryList">
						<div><p class="tc font-16">{{item.mode}}</p><p class="tc font-20 fontYellow">{{item.distrinum}}</p></div>
					</template>									
				</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">返利余额</p>
				<p class="mt-20 fontYellow font-20 tc">￥{{info.rebate}}</p>				
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">账号状态</p>
				<p class="mt-20 fontYellow font-14 tc">{{info.status == 0? canuse : nouse}}&nbsp;&nbsp;&nbsp;&nbsp;
					<el-button type="success" size="mini" class="font-14" @click="setUse">{{info.status == 0?  nouse: canuse}}</el-button>		
				</p>
			</div>
		</div>
		
		<div class="mt-10 mainContent flex-con">
			<div class="tabCard flex-wrap flex-horizontal">				
				<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
			</div>	
			<keep-alive>
				<component v-bind:is="current" :id="id"></component>
			</keep-alive>
			
		</div>
		<Dialogue :textContent="textContent" :dialogVisible="dialogVisible"  v-on:confirm="confirmset" v-on:cancel="canceluse"></Dialogue>
	</div>
</template>

<script>
	import Developarea from '@/components/business/Developarea'
	import Serviceprice from '@/components/business/Serviceprice'
	import Recordprofits from '@/components/business/Recordprofits'
	import Information from '@/components/business/Information'
	import Operatorsetting from '@/components/business/Operatorsetting'
	
	import Dialogue from '@/components/common/Dialogue'
	
	export default {
		data(){
			return{
				tabItem:['运营区域/网点','服务定价','分润记录','信息管理','运营设置'],
	        	tabComponents:['Developarea','Serviceprice','Recordprofits','Information','Operatorsetting'],
	        	current:'Developarea',
	        	currentI:'0',	        
		        find:'',
		        id:'',
		        info:[],
		        nouse:'禁用',
	       		canuse:"启用",
	       		textContent:'',
	       		dialogVisible:false
			}
			
		},
		methods:{
			changeItem(v,i){
		      	this.currentI = i;
		      	this.current = this.tabComponents[i];
		    },
		    getOperdetail({id=this.id}={}){		    	
		    	this.$get('operAdmin/getOper',{
		    		id:id
		    	}).then(data=>{
		    		this.info = data;
		    	})
		    },
		    handleDelete(index,row){//禁用启用按钮	      	
	      	this.currentStatus = row.status;
	      	this.currentId = row.id;
	      	this.dialogVisible = true;
	      	this.textContent = row.status == 0? "确认禁用该用户吗？" :"确认启用该用户吗？";
	      	this.title = "提示";

	     },
	     setUse(){	     	
	     	this.textContent = this.info.status == 0? "确认禁用该运营商吗？" : "确认启用该运营商吗？"
	     	this.dialogVisible = true;	     	
	     },
	      canceluse(){//取消或者关闭
	      	this.dialogVisible = false;
	      },
	      confirmset({id=this.id,status=this.info.status==0? 1 : 0}={}){//设置状态
	      	this.$post('operAdmin/updateStatus',{
	      		id:id,
	      		status:status
	      	}).then(data=>{
	      		this.$ye();
	      		this.dialogVisible = false;
	      		this.getOperdetail();
	      	})
	      }
	    
		},
		created(){
			this.id = this.$route.query.id;
		},
		mounted(){
			this.getOperdetail();
		},
		components:{
			Developarea,
			Serviceprice,
			Recordprofits,
			Information,
			Operatorsetting,
			Dialogue
		}
	}
</script>

<style scoped>	
	.businessDetail .infoBox{width:30%;background:#fff;padding:10px 20px 0;margin-right:10px;}
	.businessDetail .nameBox{line-height: 32px;}
	.businessDetail .topBox{height:130px;}
	.businessDetail .imgBox{width:30%;text-align:center;}
	.businessDetail .imgBox img{display:inline-block;width:80px;height:80px;border-radius:50%;}
	.businessDetail .rightInfo p{line-height: 22px;font-size:14px;}
	.businessDetail .itemBox{background:#fff;margin-right:10px;padding:10px 20px;}
	.businessDetail div.itemBox:nth-child(5){margin-right:0;}	
	.businessDetail .mainContent{background:#fff;padding:10px;position:relative;}
	.businessDetail .tabCard{background:#fff;border-top:2px solid #FF9900;border-bottom:1px solid #EBF0F4;}
	.businessDetail .tabCard div{font-size:16px;line-height: 26px;padding:10px 20px;background:#fff;cursor: pointer;}
	.businessDetail .tabCard .actived{background:#FF9900;color:#fff;}
	
</style>