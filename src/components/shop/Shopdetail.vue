<template>
	<div class="shopDetail bgHui flex-wrap flex-vertical">		
			<div class="baseInfo flex-wrap flex-horizontal">
				<div class="baseLeft flex-wrap flex-horizontal">
					<img src="../../assets/images/001.png"/>
					<div class="leftName flex-wrap flex-vertical flex-justify-around"> 
						<div><span class="font-18 fw6">{{shopInfo.name}}</span><span class="font-14">网点编号：{{shopInfo.no}}</span></div>
						<div class="star"><img v-for="item in scores" :key="item.value"  src="../../assets/images/002.png"/><img v-if="shopInfo.score%2 !=0" src="../../assets/images/003.png"/></div>
						
					</div>
				</div>
				<div class="baseCenter">
					<div class="font-14">所属运营商：{{shopInfo.oname}}（{{shopInfo.ono}}）</div>
				</div>
				<div class=" flex-wrap flex-horizontal flex-align-center flex-justify-end baseRight font-14">
					<div class="stage"><span>网点状态：</span><span>{{shopInfo.isonline == 1? "已下线" : "上线中"}}</span></div>
					<el-button type="warning" size="small" class="btnStyle mr-10" @click="handles(shopInfo.isonline)" >{{shopInfo.isonline == 0 ? goonline : downline}}</el-button>
					<router-link to='/Main/ChangeShopInfo'>
						<el-button type="warning" size="small" class="btnStyle">查看/修改网点信息</el-button>
					</router-link>
						
				</div>
			</div>	
			
			<div class="numInfo flex-wrap flex-horizontal flex-justify-between">
				<div class="account tc">
					<h1 class="font-16 colorYellow">账号管理</h1>
					<div class="font-14 mt-10">账号：{{shopInfo.username}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.status == 0? "启用中" : "已禁用"}}</div>
					<el-button type="warning" size="small" class="btnStyle mt-10" @click="handle(shopInfo.status)" >{{shopInfo.status == 0 ? nouse : canuse}}</el-button>	
				</div>
				<div class="tc ">
					<h1 class="font-16 colorYellow">电池库存</h1>
					<div class="font-14 mt-10"><span v-for="item in shopInfo.batteryList" :key="item.value">{{item.mode}}&nbsp;&nbsp;{{item.stocknum}}/{{item.distrinum}}&nbsp;&nbsp;&nbsp;</span></div>
					<el-button type="warning" size="small" class="btnStyle mt-10">+&nbsp;补货记录</el-button>	
				</div>
				<div class="tc">
					<h1 class="font-16 colorYellow">配货成本</h1>
					<h2 class="font-14 mt-20 ">￥{{shopInfo.costdistribute}}</h2>
				</div>
				<div class="tc">
					<h1 class="font-16 colorYellow">钱包余额</h1>
					<div class="font-14 mt-10">￥{{shopInfo.wallet}}</div>
					<el-button type="warning" size="small" class="btnStyle mt-10" @click="recharge">充&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;值</el-button>
					<el-button type="warning" size="small" class="btnStyle mt-10" @click="walletDebit">扣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款</el-button>
				</div>
				<div class="tc">
					<h1 class="font-16 colorYellow">退换回收电池</h1>
					<div class="font-14 mt-10"><span v-for="item in shopInfo.batteryList" :key="item.value">{{item.mode}}&nbsp;&nbsp;{{item.returnnum}}/{{item.recoverynum}}&nbsp;&nbsp;&nbsp;</span></div>
					<el-button type="warning" size="small" class="btnStyle mt-10">+&nbsp;回收记录</el-button>	
				</div>
			</div>
			
			<div class="conBottom mt-10 flex-con">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>				
				
				<component v-bind:is="current" :id="id"></component>
			</div>
			<el-dialog title="钱包充值" :visible.sync="dialogFormVisible" width="30%">
			  <el-form :model="form">
			    <el-form-item label="充值金额：" :label-width="formLabelWidth">
			     	<el-input v-model="form.recharge" placeholder="请输入充值金额" @keyup.enter.native="confirmRecharge()" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="备注：" :label-width="formLabelWidth">
			     	<el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="confirmRecharge">确 定</el-button>
			  </div>
			</el-dialog>
			
			<el-dialog title="钱包扣款" :visible.sync="dialogFormVisible1" width="30%">
				<el-form :model="form1">
					<el-form-item label="扣款金额：" :label-width="formLabelWidth">
						<el-input v-model="form1.walletDebit" placeholder="请输入扣款金额" @keyup.enter.native="confirmDebit()" clearable></el-input>
					</el-form-item>
					<el-form-item label="备注：" :label-width="formLabelWidth">
						<el-input v-model="form1.remark" placeholder="请输入备注" clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible1 = false">取 消</el-button>
					<el-button type="primary" @click="confirmDebit">确 定</el-button>
				</div>
			</el-dialog>
			<Dialogue :textContent="textContent" :dialogVisible="dialogVisible" v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
			<Dialogue :textContent="textContent" :dialogVisible="dialogVisibles" v-on:confirm="confirmIsonline" v-on:cancel="canceluse"></Dialogue>
			
	</div>
	
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	import Order from '@/components/shop/Order'
	import Stock from '@/components/shop/Stock'
	import Confifure from '@/components/shop/Confifure'
	import Money from '@/components/shop/Money'
	import Recharge from '@/components/shop/Recharge'
	import Member from '@/components/shop/Member'
	import Exchange from '@/components/shop/Exchange'
	import Help from '@/components/shop/Help'

	import {exp} from '@/assets/js/common'
	
	export default {
      data() {
        return {
        	tabItem:['预约服务记录','补货记录','配货记录','钱包记录','钱包充值记录','会员','退还电池回收记录','救援服务记录'],
        	tabComponents:['Order','Stock','Confifure','Money','Recharge','Member','Exchange','Help'],
        	current:'Order',
			currentI:'0',
			shopInfo:{},
			id:'',//用户id
			scores:'',
			nouse:'禁用',
			canuse:"启用",
			dialogVisible:false,//禁用启用提示框
			dialogVisibless:false,//上线提示框   
			dialogFormVisible:false,
	        dialogFormVisible1:false,    	       
			textContent:'',//提示框文本
			currentStatus:'',//当前禁用启用状态 0 或 1
			currentOnline:'',//当前上线下线状态 0 或 1
			currentId:'',//当前网点id
			goonline:'下线',
			downline:'上线',
			form:{//钱包充值金额
				recharge:'',
				remark:''
	        },
	        form1:{//钱包扣款金额
				walletDebit:'',
				remark:''
	        },
        }
      },
      methods:{	   	
	      changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
		  },
		  handle(status){//禁用启用按钮	      	
	      	this.currentStatus = status;
	      	this.dialogVisible = true;
	      	this.textContent = status == 0? "确认禁用该网点吗？" :"确认启用该网点吗？"
		  },
		  handles(isonline){//上下线按钮	      	
			this.currentOnline = isonline;
	      	this.dialogVisible = true;
	      	this.textContent = isonline == 0? "确认下线该网点吗？" :"确认上线该网点吗？"

	      },
		  confirmIsuse(){//确认禁用或者启用
	       var status = this.currentStatus == 0 ? 1 : 0;
	       this.$post('shop/updateShopUser',{
	      		userId:this.id,
	      		state:status
	      	}).then(data=>{
	      		this.dialogVisible = false;
				this.$ye();
				this.joinShopDetail(this.id)
	      	})
		  },
		  confirmIsonline(){//确认上下线
	       var online = this.currentOnline == 0 ? 1 : 0;
	       this.$post('shop/updateShopOnline',{
	      		id:this.id,
	      		isonline:online
	      	}).then(data=>{
	      		this.dialogVisible = false;
				this.$ye();
				this.joinShopDetail(this.id)
	      	})
	      },
		  canceluse(){//取消或者关闭
	      	this.dialogVisible = false;
		  },
		  joinShopDetail(id){
		  this.id = this.$route.query.id;				
			this.$get('shop/joinShopDetail',{
				id:this.id
			}).then(data=>{
				this.shopInfo = data;
				if((this.shopInfo.score %2) ==0){
					this.scores=this.shopInfo.score/2
				}else{
					this.scores=(this.shopInfo.score-1)/2
				}	
			})
		},
		recharge(){
		this.dialogFormVisible = true;
		},
		walletDebit(){
		this.dialogFormVisible1 = true;
		},
		confirmRecharge(){
		     	var id = this.id;
		     	var amount = Number(this.form.recharge);
		     	var remark = this.form.remark;
		     	console.log(id,amount,remark)
		     	if(!exp.test(amount)){
		     		this.$message.info("请输入有效数字，小数点后最多保留两位");
		     		return false;
		     	}else{
		     		this.$post('shop/recharge',{
		     		id:id,
		     		amount:amount,
		     		remark:remark
			     	}).then(data=>{
			     		this.dialogFormVisible = false;			     				     		
			     		this.joinShopDetail(this.id)
			     		this.$ye('充值成功');	
			     	})
					
		     	}
		     	
		     },
		     confirmDebit(){//钱包扣款
		     	var id = this.id;
		     	var amount = Number(this.form1.walletDebit);
		     	var remark = this.form.remark;
		     	if(!exp.test(amount)){
		     		this.$message.info("请输入有效数字，小数点后最多保留两位");
		     		return false;
		     	}else{
		     		this.$post('shop/debit',{
		     		id:id,
		     		amount:amount,
		     		remark:remark
			     	}).then(data=>{
			     		this.dialogFormVisible1 = false;			     				     		
			     		this.joinShopDetail(this.id)
			     		this.$ye('扣款成功');	
			     	})
					
		     	}
		     }
	  },
	  mounted(){
		this.joinShopDetail(this.id)
	  },
      components:{
		Dialogue,
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
	
</style>