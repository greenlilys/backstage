<template>
	<div class="flex-wrap flex-vertical userDetail">
		<div class="flex-wrap flex-horizontal">
			<div class="flex-wrap flex-horizontal infoBox">
				<div class="imgBox"> <img src="../../assets/images/001.png" alt="" /> </div>
				<div class="rightInfo font-14">
					<p>昵称：{{userInfo.nickname || '无'}}&nbsp;&nbsp;&nbsp;&nbsp;账号：{{userInfo.username}}&nbsp;&nbsp;推荐人：{{userInfo.referee || '无'}}</p>	
					<p>身份证：{{userInfo.legalID || '无'}}</p>
					<!--<p>注册时间：{{userInfo.addTime}}</p>-->
					<p>租用产品：{{userInfo.mode}}</p>
					<p>产品信息：{{userInfo.framenum}} / {{userInfo.platenum}}</p>
					<!--<p>安装状态：{{isdeposit == 1 ? (userInfo.isinstall == 1? "未安装" : "已安装") : "未安装" }}</p>-->
					<p>当前租期：{{isdeposit ==1 && userInfo.isinstall == 0 ? (userInfo.isoverdue==1? "逾期" : "租期中") : "--"}}&nbsp;&nbsp;&nbsp;&nbsp;{{userInfo.duedate}}</p>					
				</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">钱包余额</p>
				<p class="mt-10 fontYellow font-20 tc">￥{{userInfo.wallet}}</p>
				<div class="mt-20 tc">
					<el-button type="success" size="small"  @click="recharge">充值</el-button>
					<el-button type="success" size="small"  @click="walletDebit">扣款</el-button>
				</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">天牛币余额</p>
				<p class="mt-10 fontYellow font-20 tc">{{userInfo.integral}}</p>
				<div class="mt-20 tc">
					<el-button type="success" size="small" @click="tnrecharge">充值</el-button>
					<el-button type="success" size="small" @click="tnWalletDebit">扣款</el-button>
				</div>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">押&nbsp;&nbsp;&nbsp;&nbsp;金</p>
				<p class="mt-10 fontYellow font-20 tc">￥{{userInfo.deposit}}</p>
				<p class="font-16 tc mt-20">待缴滞纳金 <span class="fontYellow">￥{{userInfo.unpaidlatefee}}</span></p>
			</div>
			
			<div class="itemBox flex-con">
				<p class="tc font-16">换电次数</p>
				<p class="mt-10 fontYellow font-20 tc">{{userInfo.num}}</p>
			</div>
		</div>
		
		<div class="mt-10 conBottom flex-con paddinglist">
			<div class="tabCard flex-wrap flex-horizontal">				
				<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
			</div>	
			<component v-bind:is="current" :id="id"></component>
		</div>
		
		<el-dialog title="钱包充值" :visible.sync="dialogFormVisible" width="30%">
			  <el-form :model="form">
			  	<el-form-item label="密码：" :label-width="formLabelWidth">
			     	<el-input v-model="password" type="password" placeholder="请输入密码" clearable @change="RechargePassword"></el-input>
			    </el-form-item>
			    <el-form-item label="充值金额：" :label-width="formLabelWidth">
			     	<el-input v-model="form.amount" placeholder="请输入充值金额" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="备注：" :label-width="formLabelWidth">
			     	<el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="success" @click="confirmRecharge" :disabled='isuse'>确 定</el-button>
			  </div>
		</el-dialog>
		
		<el-dialog title="钱包扣款" :visible.sync="dialogFormVisible1" width="30%">
			  <el-form :model="form1">
			  	<el-form-item label="密码：" :label-width="formLabelWidth">
			     	<el-input v-model="password" type="password" placeholder="请输入密码" clearable @change="RechargePassword"></el-input>
			    </el-form-item>
			    <el-form-item label="扣款金额：" :label-width="formLabelWidth">
			     	<el-input v-model="form1.amount" placeholder="请输入扣款金额" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="备注：" :label-width="formLabelWidth">
			     	<el-input v-model="form1.remark" placeholder="请输入备注" clearable></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
			    <el-button type="success" @click="confirmDebit" :disabled='isuse'>确 定</el-button>
			  </div>
		</el-dialog>
		
		<el-dialog title="天牛币充值" :visible.sync="dialogFormVisible2" width="30%">
			  <el-form :model="form2">
			  	<el-form-item label="密码：" :label-width="formLabelWidth">
			     	<el-input v-model="password" type="password" placeholder="请输入密码" clearable @change="RechargePassword"></el-input>
			    </el-form-item>
			    <el-form-item label="充值数量：" :label-width="formLabelWidth">
			     	<el-input v-model="form2.amount" placeholder="请输入扣款金额" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="备注：" :label-width="formLabelWidth">
			     	<el-input v-model="form2.remark" placeholder="请输入备注" clearable></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
			    <el-button type="success" @click="confirmIntegral" :disabled='isuse'>确 定</el-button>
			  </div>
		</el-dialog>
		
		<el-dialog title="天牛币扣减" :visible.sync="dialogFormVisible3" width="30%">
			  <el-form :model="form3">
			  	<el-form-item label="密码：" :label-width="formLabelWidth">
			     	<el-input v-model="password" type="password" placeholder="请输入密码" clearable @change="RechargePassword"></el-input>
			    </el-form-item>
			    <el-form-item label="扣减数量：" :label-width="formLabelWidth">
			     	<el-input v-model="form3.amount" placeholder="请输入扣款金额" clearable></el-input>
			    </el-form-item>
			    <el-form-item label="备注：" :label-width="formLabelWidth">
			     	<el-input v-model="form3.remark" placeholder="请输入备注" clearable></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
			    <el-button type="success" @click="confirmtnDebit" :disabled='isuse'>确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>

<script>
	import Orders from '@/components/user/Orders'
	import Rent from '@/components/user/Rent'
	import Deposit from '@/components/user/Deposit'
	import Purse from '@/components/user/Purse'
	import Coin from '@/components/user/Coin'
	import Members from '@/components/user/Members'
	
	import {exp} from '@/assets/js/common'
	
	export default {
		data(){
			return{
				navtitle:'用户>用户列表>详情',
				formLabelWidth: '120px',
				tabItem:['预约记录','租期记录','押金记录','钱包记录','天牛币记录','会员'],
	        	tabComponents:['Orders','Rent','Deposit','Purse','Coin','Members'],
	        	current:'Orders',
	        	currentI:'',
	        	userInfo:{},
	        	id:'',//用户id
	        	isdeposit:'',//押金状态 1 缴纳 0 未缴纳
	        	form:{//钱包充值金额
	        		amount:'',	        		
	        		remark:''
	        	},
	        	form1:{//钱包扣款金额
	        		amount:'',
	        		remark:''
	        	},
	        	form2:{//天牛币增加
	        		amount:'',
	        		remark:''
	        	},
	        	form3:{//天牛币扣减
	        		amount:'',
	        		remark:''
	        	},
	        	password:'',
	        	dialogFormVisible:false,
	        	dialogFormVisible1:false,
	        	dialogFormVisible2:false,
	        	dialogFormVisible3:false,
	        	isuse:true
	        	
			}
			
		},
		methods:{
			changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
		     },
		     getUserInfo(){
		     	   let id = this.id;
		     	    this.$get('customer/cusDetail',{
					    id:id
					}).then(data=>{
						this.userInfo = data.detail;
						this.userInfo.num = data.num;
					})
		     },
		     recharge(){
		     	this.dialogFormVisible = true;
		     },
		     RechargePassword(v){//验证密码
		     	console.log(v);
		     	if(v){
		     		this.$get('set/AuthenticationPass',{
			     		password:v
			     	}).then(data=>{			     		
			     		this.isuse = false;
			     	})
		     	}else{
		     		this.isuse = true;
		     	}
		     	
		     },
		     setinput(){//清空密码框
		     	this.password = '';
				this.isuse = true;
		     },
		     walletDebit(){
		     	this.dialogFormVisible1 = true;
		     },
		    
		     confirmRecharge(){//钱包充值
				
			     	var id = this.id;
			     	var amount = Number(this.form.amount);
			     	var remark = this.form.remark;
			     	
			     	if(!exp.test(amount)){
			     		this.$message.info("请输入有效数字，小数点后最多保留两位");
			     		return false;
			     	}else{
			     		this.$post('customer/recharge',{
			     		id:id,
			     		amount:amount,
			     		remark:remark
				     	}).then(data=>{				     		
				     		this.dialogFormVisible = false;			     				     		
				     		this.getUserInfo();
				     		this.$ye('充值成功');	
				     	})
						
			     	}		     	
		     	
		     },
		     confirmDebit(){//钱包扣款
		     	var id = this.id;
		     	var amount = Number(this.form1.amount);
		     	var remark = this.form1.remark;
		     	if(!exp.test(amount)){
		     		this.$message.info("请输入有效数字，小数点后最多保留两位");
		     		return false;
		     	}else{
		     		this.$post('customer/walletDebit',{
		     		id:id,
		     		amount:amount,
		     		remark:remark
			     	}).then(data=>{			     		
			     		this.dialogFormVisible1 = false;			     				     		
			     		this.getUserInfo();
			     		this.$ye('扣款成功');	
			     	})
					
		     	}
		     },
		     tnrecharge(){//天牛币充值
		     	this.dialogFormVisible2 = true;
		     },
		     confirmIntegral(){//天牛币充值
		     	var id = this.id;
		     	var regu = /^\+?[1-9][0-9]*$/;//验证正整数
		     	var amount = Number(this.form2.amount);
		     	var remark = this.form2.remark;
		     	if(!regu.test(amount)){
		     		this.$message.info("请输入正整数");
		     		return false;
		     	}else{
		     		this.$post('customer/rechargeIntegral',{
		     		id:id,
		     		integral:amount,
		     		remark:remark
			     	}).then(data=>{			     		
			     		this.dialogFormVisible2 = false;			     				     		
			     		this.getUserInfo();
			     		this.$ye('充值成功');	
			     	})					
		     	}
		     },
		
		     tnWalletDebit(){
		     	this.dialogFormVisible3 = true;
		     },
		     confirmtnDebit(){//天牛币扣款
		     	var id = this.id;
		     	var regu = /^\+?[1-9][0-9]*$/;//验证正整数
		     	var amount = Number(this.form3.amount);		     
		     	var remark = this.form3.remark;
		     	if(!regu.test(amount)){		     		
		     		this.$message.info("请输入正整数");
		     		return false;
		     	}else{
		     		
		     		this.$post('customer/integralDebit',{
		     		id:id,
		     		integral:amount,
		     		remark:remark
			     	}).then(data=>{			     		
			     		this.dialogFormVisible3 = false;			     				     		
			     		this.getUserInfo();
			     		this.$ye('扣减成功');	
			     	})
					
		     	}
		     }
		    
		},
		beforeMount(){	
			console.log(this.$route.query)
			this.isdeposit = this.$route.query.isdeposit;
			this.id = this.$route.query.id;	
			this.currentI = this.$route.query.currentI || 0;
			if(this.$route.query.currentI==3){
				this.current=Purse;
			}
		},
		mounted(){						
			this.getUserInfo();
			this.$sendTitle(this.navtitle);
		},
		
		  beforeRouteLeave (to, from, next) {
		  	console.log(to,from)
		  	next()
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
		  },
		  watch:{
		  	  dialogFormVisible:function(newVal,oldVel){
		  	  	if(!newVal){
		  	  		this.setinput();
		  	  	}
		  	  },
		  	  dialogFormVisible1:function(newVal,oldVel){
		  	  	if(!newVal){
		  	  		this.setinput();
		  	  	}
		  	  },
		  	  dialogFormVisible2:function(newVal,oldVel){
		  	  	if(!newVal){
		  	  		this.setinput();
		  	  	}
		  	  },
		  	  dialogFormVisible3:function(newVal,oldVel){
		  	  	if(!newVal){
		  	  		this.setinput();
		  	  	}
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
	.userDetail .itemBox{background:#fff;margin-right:10px;padding:10px 20px;box-sizing: border-box;}
	.userDetail div.itemBox:nth-child(5){margin-right:0;}	
	
</style>