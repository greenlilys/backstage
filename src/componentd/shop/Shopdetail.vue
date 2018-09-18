<template>
	<div class="bgHui flex-wrap flex-vertical">		
			<div class="boxborder bw p-10 boxheight flex-wrap flex-horizontal">
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
					<el-button type="primary" size="small" class="mr-20" @click="handles(shopInfo.isonline)" >{{shopInfo.isonline == 0 ? goonline : downline}}</el-button>
					<router-link :to="{path:'/Main/ChangeShopInfo',query:{id:id}}">
						<el-button type="primary" size="small">查看/修改网点信息</el-button>
					</router-link>
				</div>
			</div>	
			
			<div class="numInfo flex-wrap flex-horizontal flex-justify-between">
				<div class="account tc">
					<h1 class="font-16 colorYellow">账号管理</h1>
					<div class="font-14 mt-20">账号：{{shopInfo.username}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{shopInfo.status == 0? "启用中" : "已禁用"}}</div>

					<el-button type="primary" size="small" class="mt-10" @click="handle(shopInfo.status,shopInfo.userid)" >{{shopInfo.status == 0 ? nouse : canuse}}</el-button>	

				</div>
				<div class="tc ">
					<h1 class="font-16">产品库存</h1>
					<div class="font-14 mt-10 fontYellow"><div v-for="item in shopInfo.batteryList" :key="item.value" class="flex-wrap flex-horizontal flex-justify-between">
						<span class="ml-20">{{item.mode}}</span> <span class="mr-20">{{item.stocknum}}/{{item.distrinum}}</span></div>
					</div>	
					<el-button class="mt-10" type="primary" size="small" @click="repleniShment">+&nbsp;补货记录</el-button>
				</div>
				<div class="tc">
					<h1 class="font-16">配货成本</h1>
					<h2 class="fontYellow font-18 mt-20 ">￥{{shopInfo.costdistribute}}</h2>
				</div>
				<div class="tc">
					<h1 class="font-16">钱包余额</h1>
					<div class="fontYellow font-18 mt-20">￥{{shopInfo.wallet}}</div>					
				</div>
				<div class="tc">
					<h1 class="font-16">退还回收电池</h1>
					<div class="font-14 mt-10 fontYellow">
						<span v-for="item in shopInfo.batteryList" :key="item.value">
							<label v-if="item.returnnum>0">{{item.mode}}&nbsp;&nbsp;{{item.returnnum}}&nbsp;&nbsp;&nbsp;</label>
						</span>
					</div>
					<el-button class="mt-20" type="primary" size="small" @click="recovery">+&nbsp;回收记录</el-button>
				</div>
			</div>
			
			<div class="conBottom mt-10 flex-con paddinglist">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>
				<component v-bind:is="current" :id="id"></component>
			</div>

			<el-dialog title="添加补货记录" :visible.sync="dialogFormVisible2" width="30%">
				<el-form :model="form2" :label-width="formLabelWidths">
					<el-form-item label="补货时间：">
						 <el-date-picker v-model="form2.replenitime" type="datetime" placeholder="选择日期时间" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss" @keyup.enter.native="repleniShment()" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="补货数量：">
						<el-row>
							<span v-if="repleni.length==0">暂时不需要补货</span>
							<div class="mt-10" v-for="item in repleni" :key="item.value">
								<span>{{item.mode}}</span>
								<template>
									<el-input-number v-model="item.replenilist"  @change="handleChange" :min="1" :max="10" label="电池"></el-input-number>
								</template>
							</div>
						</el-row>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="confirmRepleni">确 定</el-button>
				</div>
			</el-dialog>
			
			<el-dialog title="添加回收记录" :visible.sync="dialogFormVisible3" width="30%">
				<el-form :model="form3" :label-width="formLabelWidths">
					<el-form-item label="回收时间：" >
						 <el-date-picker v-model="form3.recoverytime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" default-time="12:00:00" @keyup.enter.native="recovery()" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="回收数量：">
						<el-row>
							<span v-if="recover.length==0">暂时不需要回收</span>
							<el-col :span="20" class="mt-10" v-for="item in recover" :key="item.value">
								<span>{{item.mode}}</span>
								<template>
									<el-input-number v-model="item.returnnum"  @change="handleChange" :min="1" :max="10" label="电池"></el-input-number>
								</template>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible3 = false">取 消</el-button>
					<el-button type="primary" @click="confirmRecovery">确 定</el-button>
				</div>
			</el-dialog>
			
			<Dialogue :textContent="textContent" :dialogVisible="dialogVisible" v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
			<Dialogue :textContent="textContent" :dialogVisible="dialogVisibles" v-on:confirm="confirmIsonline" v-on:cancel="canceluses"></Dialogue>
			
	</div>
	
</template>

<script>
	import Dialogue from '@/componentd/common/Dialogue'
	import Order from '@/componentd/shop/Order'
	import Stock from '@/componentd/shop/Stock'
	import Confifure from '@/componentd/shop/Confifure'
	import Money from '@/componentd/shop/Money'
	import Recharge from '@/componentd/shop/Recharge'
	import Member from '@/componentd/shop/Member'
	import Exchange from '@/componentd/shop/Exchange'
	import Help from '@/componentd/shop/Help'
	import {exp} from '@/assets/js/common'
	
	export default {
      data() {
        return {
        	navtitle:'网点>加盟网点详情',
			formLabelWidth: '120px',
			formLabelWidths: '90px',
        	tabItem:['预约服务记录','补货记录','配货记录','钱包记录','钱包充值记录','会员','退还电池回收记录'],
        	tabComponents:['Order','Stock','Confifure','Money','Recharge','Member','Exchange'],
        	current:'Order',
			currentI:'0',
			shopInfo:{},
			id:'',//网点id
			userid:'',
			scores:'',
			nouse:'禁用',
			canuse:"启用",
			dialogVisible:false,//禁用启用提示框
			dialogVisibles:false,//上线提示框   
			
			dialogFormVisible2:false,   
			dialogFormVisible3:false,        
			textContent:'',//提示框文本
			currentStatus:'',//当前禁用启用状态 0 或 1
			currentOnline:'',//当前上线下线状态 0 或 1
			currentId:'',//当前网点id
			goonline:'下线',
			downline:'上线',
			
			form2:{//补货数据
				replenitime:'',
				batterylist:[]
			},
			form3:{//回收数据
				recoverytime:'',
				batterylist:[]
			},
			repleni:[],
			recover:[],
			pickerOptions: {
				shortcuts: [{
					text: '今天',
					onClick(picker) {
					picker.$emit('pick', new Date());
					}
				}, {
					text: '昨天',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24);
					picker.$emit('pick', date);
					}
				}, {
					text: '一周前',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', date);
					}
				}]
			},
			value: ''
        }
      },
      methods:{	   	
	    changeItem(v,i){//选项卡
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
		},
		
	
		handle(status,userid){//禁用启用按钮	      	
			this.currentStatus = status;
			this.userid=userid;
	      	this.dialogVisible = true;
	      	this.textContent = status == 0? "确认禁用该网点吗？" :"确认启用该网点吗？"
		},
		handles(isonline){//上下线按钮	      	
			this.currentOnline = isonline;
	      	this.dialogVisibles = true;
	      	this.textContent = isonline == 0? "确认下线该网点吗？" :"确认上线该网点吗？"
	    },
		confirmIsuse(){//确认禁用或者启用
	       var status = this.currentStatus == 0 ? 1 : 0;
	       this.$post('shop/updateShopUser',{
	      		userId:this.userid,
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
	      		this.dialogVisibles = false;
				this.$ye();
				this.joinShopDetail(this.id)
	      	})
	    },
		canceluse(){//禁用启用按钮取消
			this.dialogVisible = false;
		},
		canceluses(){//上下线取消
			this.dialogVisibles = false;
		},
		joinShopDetail(id){			
			this.$get('shop/joinShopDetail',{
				id:id
			}).then(data=>{
				this.shopInfo = data;
				if((this.shopInfo.score %2) ==0){
					this.scores=this.shopInfo.score/2
				}else{
					this.scores=(this.shopInfo.score-1)/2
				}	
			})
		},

		repleniShment(){//补货按钮
			this.pendReplenish(this.id);
			this.dialogFormVisible2 = true;
		},
		recovery(){//回收按钮
			this.recoverylenish(this.id);
			this.dialogFormVisible3 = true;
		},
		handleChange(){
			
		},
	
		pendReplenish(id){//补货信息			
			this.$get('shopBattery/pendReplenish',{
				shopid:this.id
			}).then(data=>{
				this.repleni = data;
			})
		},
		recoverylenish(id){//回收信息
			this.$get('shopBattery/pendRecovery',{
				shopid:this.id
			}).then(data=>{
				this.recover = data;
			})
		},
		confirmRepleni(){//确认添加补货记录
		var supplyTime =this.form2.replenitime;
		let batterylist = JSON.stringify(this.repleni);
		console.log(supplyTime)
		if(!supplyTime){
			this.$message.info("请输入补货时间");
			return false;
		}else{
			this.$post('shopSupply/putReplenish',{
			shopid:this.id,
			supplyTime:supplyTime,
			battery:batterylist
			}).then(data=>{
				this.dialogFormVisible2 = false;			     				     		
				this.joinShopDetail(this.id)
				this.$ye('补货成功');	
			})
			
			}
		},
		confirmRecovery(){//确认添加回收记录
			var supplyTime =this.form3.recoverytime;
			let batterylist = JSON.stringify(this.recover);
			if(!supplyTime){
				this.$message.info("请输入回收时间");
				return false;
			}else{
				this.$post('shopSupply/putRecovery',{
				shopid:this.id,
				supplyTime:supplyTime,
				battery:batterylist
				}).then(data=>{
					this.dialogFormVisible3 = false;			     				     		
					this.joinShopDetail(this.id)
					this.$ye('添加成功');	
				})
			}
		}
	  },
	  created(){	  	
	  	this.id = this.$route.query.id;
	  },
	  mounted(){
		this.joinShopDetail(this.id);
		this.$sendTitle(this.navtitle);
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
	.boxheight{height:100px;}
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