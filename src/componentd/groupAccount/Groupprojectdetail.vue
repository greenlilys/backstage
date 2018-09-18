<template>
	<div>
		<div class="hf flex-wrap flex-vertical">
			<div class="headItem flex-wrap flex-horizontal">
				<div>
					<h1 class="font-20">{{resData.name}}</h1>
					<p>联系人：{{resData.contactname}}&nbsp;&nbsp;{{resData.contactcellphone}}</p>
					<p>主账号：{{resData.username}}</p>
					<p>所在区域：{{resData.provincename}}、{{resData.cityname}}、{{resData.countyname}}</p>
				</div>
				<div>
					<div class="flex-wrap flex-horizontal flex-justify-between">
						<h1 class="font-20">套餐详情</h1>
						<el-button type="success" @click="toMod" v-if='resData.state' disabled>编辑</el-button>
						<el-button type="success" @click="toMod" v-else>编辑</el-button>
					</div>
					<p>租用电池：{{resData.mode}}&nbsp;&nbsp;每组押金：￥{{resData.deposit}}</p>
					<p>月租金：￥{{resData.monthrent}}（每月{{resData.monthinte}}天牛币）</p>
					<p>季租金：￥{{resData.quarterrent}}（每月{{resData.quarterinte}}天牛币）</p>
					<p>年租金：￥{{resData.annualrent}}（每月{{resData.annualinte}}天牛币）</p>
				</div>
				<div>
					<h1 class="font-16">可添加子账号数量：<span v-if='!resData.paystate'>— —</span><span class="fontYellow" v-else>{{resData.totalnum}}</span></h1>
					<h1 class="font-16">已添加子账号数量：<span v-if='!resData.paystate'>— —</span><span class="fontYellow" v-else>{{resData.cusCount}}</span></h1>
					<div class="fontYellow old-pay tc" v-if='!resData.paystate'>等待主账号支付押金&租金</div>
					<div class="flex-wrap flex-justify-between" v-else>
						<div class="tc old-pay">
							<div class="fontYellow font-20">{{resData.cusCount}}组</div>
							<div>租用电池数量</div>
						</div>
						<div class="tc old-pay">
							<div class="fontYellow font-20">￥{{resData.totalDeposit}}</div>
							<div>押金总计</div>
						</div> 
						<div class="tc old-pay">
							<div class="fontYellow font-20">￥{{resData.totalLateFee}}</div>
							<div>当前滞纳金总计</div>
						</div>
					</div>

				</div>
			</div>
			<el-dialog title="添加子账号" :visible.sync="dialogFormVisible" width="800px">
				<el-row type='flex' justify="center">
					<el-col :span="15" class="addId">
						<p class="fontYellow">• 请电池/电车使用者先下载天牛网APP并完成注册。</p>
						<P class="fontYellow">• 已租用天牛网电池/电车的用户无法添加为子账户，请完成退租、并赎回押金后重新添加。</P>
						<P class="fontYellow">• 添加为子账号的用户，无法通过签到、评价、平台活动、推荐好友等方式获取天牛币奖励。</P>
						<el-form label-width="80px" class="amend">
							<el-form-item label='子账号:'>
								<el-input placeholder='天牛网APP用户账号...' auto-complete="off" v-model='idForm.username'></el-input>
							</el-form-item>
						</el-form>
						<el-form label-width="80px" class="amend" v-if='resData.type'>
							<el-form-item label='车牌号:'>
								<el-input placeholder='该用户租用车辆的车牌号' auto-complete="off" v-model='idForm.platenum'></el-input>
							</el-form-item>
						</el-form>
						<el-form label-width="80px" class="amend" v-if='resData.type'>
							<el-form-item label='车架号:'>
								<el-input placeholder='该用户租用车辆的车牌号' auto-complete="off" v-model='idForm.framenum'></el-input>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>

				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="warning" @click="submitForm()" class="btnStyle">确认添加</el-button>
				</div>

			</el-dialog>
			<div class="conBottom paddinglist flex-con mt-10">						
				<div class="tabCard clear">
						<div class="fl" v-for="(v,i) in tabItem" @click="changeItem(v,i)" :class="{actived : i == currentI}">{{v}}</div>		

						<el-button type="success" class="fr mt-10"  size="small" @click="downProject" v-if='!resData.paystate||resData.state' disabled>关闭项目</el-button>	
						<el-button type="success" class="fr mt-10"  size="small" @click="downProject" v-else >关闭项目</el-button>		

						<el-button type="success" class="fr mt-10 mr-10" size="small" @click="dialogFormVisible=true" v-if='!resData.paystate||resData.state' disabled>+&nbsp;添加子帐号</el-button>					
						<el-button type="success" class="fr mt-10 mr-10" size="small" @click="dialogFormVisible=true" v-else>+&nbsp;添加子帐号</el-button>
						<!-- <el-button type="warning" class="btnStyle fr mt-10"  size="small" @click="downProject" :disabled="!resData.paystate">关闭项目</el-button>				
						<el-button type="warning" class="btnStyle fr mt-10 mr-10" size="small" @click="" :disabled="!resData.paystate">+&nbsp;添加子帐号</el-button>				 -->


				</div>
				<div v-if='!resData.paystate' class="tc detail-mar">未开通子账号</div>
				<div v-else>
					<el-row class="searchBox" type="flex" align="middle">
						<el-col :span="5" :offset="13">
							<p v-if='resData.state'>{{resData.closetime}} &nbsp;已关闭 &nbsp;操作人：{{resData.nickname}}</p>
						</el-col>
						<el-col :span="6">
							<div>
								<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable  @clear='search' @keyup.enter.native='search'>
									<el-button slot="append" icon="el-icon-search" @click='search'>搜索</el-button>
								</el-input>
							</div>
						</el-col>
					</el-row>
					<component v-bind:is="current" :resData='resData' ref='child'></component>
				</div>

			</div>
		</div>
		<Dialogue textContent="此操作将关闭项目, 是否继续?" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="dialogVisible=false"></Dialogue>
	</div>
</template>

<script>
	import Subaccount from '@/components/Groupaccount/Subaccount'
	import Payrecord from '@/components/Groupaccount/Payrecord'
	import Dialogue from '@/components/common/Dialogue'
	
	export default{
		data(){
			return{
				dialogFormVisible:false,
				id:0,
				idForm:{
					id:0,
					username:'',
					platenum:'',
					framenum:''
				},
				navtitle:'团购账号>团购项目>详情',
				resData:{},
				tabItem:['项目子帐号','支付记录'],
	        	tabComponents:['Subaccount','Payrecord'],
	        	current:'Subaccount',
	        	currentI:'0',
				find:'',
				dialogVisible:false
			}
			
		},
		watch:{
			current(val){
				if(this.current=='Payrecord'){
					// this.$refs.child.getId(this.id)
				}
			}
		},
		methods:{
			search(){
				// console.log(this.find.trim())
				// if(this.find.trim()){
				// 	console.log(this);
					this.$refs.child.parentMsg(this.find)
				// }
			},
			confirmIsuse(){
				this.$post('/groupPro/close',{id:this.id}).then(data=>{
					this.$message({
						type: 'success',
						message: '关闭成功!'
					});	
					this.getData();
				})
				this.dialogVisible=false;
			},
			changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
		  },
		//   添加子账号
		  submitForm(){
			  console.log(this.idForm)
			  this.$post('/groupCus/add',this.idForm).then(data=>{
				  this.dialogFormVisible=false;
				  this.idForm.username='';
				  this.idForm.platenum='';
				  this.idForm.framenum='';
				  this.$ye('添加子账号成功！');
				  this.$refs.child.parentMsg(this.find)
			  })
		  },
		  toMod(){
			//   
			var that=this;
			this.$router.push({
				path:'/Main/GroupprojectMod',
				query:{
					id:that.id
				}
			})
		  },
		  getData(){
			  this.$get('/groupPro/get',{
				  id:this.id
			  }).then(data=>{
				  console.log(data);
				  this.resData=data
			  })
		  },
		  getSonData(){
			  this.$get('/groupCus/getAll',{
				  id:this.id,
				  state:0
			  }).then(data=>{
				  console.log(data);
			  })
		  },
		  downProject(){
			  this.dialogVisible=true;
		  }
		},
		components:{
			Subaccount,
			Payrecord,
			Dialogue
		},
		mounted:function(){
			this.$sendTitle(this.navtitle);
			this.id=this.$route.query.id;
			this.idForm.id=this.$route.query.id;
			this.getData();
			if(!this.resData.paystate){
				this.getSonData()
			}
		
		}
	}
</script>

<style scoped>
	
	.headItem>div{margin-right:10px;flex:1;height:140px;background:#fff;padding:10px 20px;}
	.headItem>div:nth-child(3){margin-right:0;}
	.headItem h1{line-height: 30px;}
	.headItem p{line-height: 24px;}		
	.searchBox{padding:10px 0;}
	.old-pay{line-height: 30px;padding: 20px 5px}
	.detail-mar{margin: 100px 0;color: #c0c4cc}
	.addId p{line-height: 25px}
	.amend{margin-top: 20px}
</style>