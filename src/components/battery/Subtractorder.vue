<template>
	<div >
		<div class="hf flex-wrap flex-vertical">	
		
		<el-row class="p-10 boxborder bw pb-0" type="flex" align="middle">
			<el-col :span="7">
				<span class="font-14">订单状态：</span>
					 <el-radio-group v-model="radio" @change="handleRedio">
						<el-radio  label="">全部</el-radio>
						<el-radio  label="0">待处理</el-radio>
						<el-radio  label="1">已完成</el-radio>
						<el-radio  label="2">已驳回</el-radio>
					</el-radio-group>				
			</el-col>			
			<el-col :span="6" :offset="1">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select" @keyup.enter.native='search'>
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</div>
			</el-col>
		</el-row>
			<div class="paddinglist bw boxborder pr flex-con">					
				<template>
					<el-table :data="tableData" style="width: 100%;">
						<el-table-column prop="pickno" label="订单号" width="" align="center">
						</el-table-column>									
						<el-table-column prop="addtime" label="下单时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="no" label="运营商编号" width="" align="center">
						</el-table-column>
						<el-table-column prop="name" label="运营商名称" width="" align="center">
						</el-table-column>
						<el-table-column prop="provincenames" label="店铺地址" width="" align="center">
						</el-table-column>
						<el-table-column prop="mode" label="减少配货内容" width="" align="center">
							<template slot-scope="scope">						
								<div v-for="item in scope.row.modes">{{item}}组</div>
							</template>
						</el-table-column>
						<el-table-column prop="picktotals" label="退还金额" width="" align="center">
						</el-table-column>
						<el-table-column prop="orderstates" label="订单状态" width="" align="center">
						</el-table-column>
						<el-table-column prop="handler" label="经办人" width="" align="center">
						</el-table-column>
						<el-table-column prop="name" label="操作" width="" align="center">
							<template slot-scope="scope">										
								<span><el-button type="warning" size="mini" class="btnStyle" @click="Shment(scope.$index, scope.row)" >不予退货</el-button></span>
								<span><el-button type="warning" size="mini" class="btnStyle" @click="Shments(scope.$index, scope.row)" >退款</el-button></span>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<template>
					<div class="block page">							    
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-size="10"							    
						layout="total, prev, pager, next"
						:total="total">
					</el-pagination>
						</div>
				</template>								
			</div>
		</div>
		<el-dialog title="确认接受退货并进行退款？" :visible.sync="dialogFormVisibles" width="30%">
				<div class="font-14">
					<div class="mb-10">确认后：</div>
					<div>1.该订单中的退货数量从对应运营商配货数量中减少；</div>
					<div>2.该订单中的退还金额从配货成本余额中扣除；</div>
					<el-input v-model="paymentno" class="mt-10" placeholder="请输入转账单号" clearable></el-input>
					<div class="fontYellow mt-10">请在确定退货回收完成、完成退款后，再进行确认操作。</div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisibles = false">取 消</el-button>
					<el-button type="success" @click="confirmIsuses">确 定</el-button>
				</div>
		</el-dialog>
		<el-dialog title="确认不接受本订单退货？" :visible.sync="dialogFormVisible" width="30%">
				<div class="font-14">
					<div class="mb-10">确认后，该订单失效。</div>
					<div class="fontYellow">若运营商的退货要求不符合平台要求，请进行确认操作。</div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="success" @click="confirmIsuse">确 定</el-button>
				</div>
		</el-dialog>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
      data(){
			return {
				navtitle:'产品>运营商减少配订单',
				tableData: [],
		        currentPage:1,
				radio:'',
				total:0,
				find:'',
				dialogFormVisible:false,
				dialogFormVisibles:false,
				formLabelWidth: '120px',
				currentId:'',//当前id
				paymentno:''
		        }
			},
      	methods:{
			handleRedio(v) {
				this.AddBattery(v, this.find, this.radio)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(v) {
				this.AddBattery(v, this.find,this.radio)
			},	 
			Shment(index,row){
				this.currentId=row.id;
				this.dialogFormVisible = true;
			}, 
			Shments(index,row){
				this.currentId=row.id;
				this.dialogFormVisibles = true;
			},   	
	    	AddBattery(pageNo,find){
				var pageNo = pageNo || "";
				var find = this.find || "";
				var radio = this.radio || "";
				this.$get('operPick/reduceList',{
					pageNo: pageNo,
					name: find,
					orderstate:radio
				}).then(data=>{
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						arr[i].provincenames=arr[i].provincename+arr[i].cityname+arr[i].countyname+arr[i].address;

						if(arr[i].orderstate==0){
							arr[i].orderstates="待配货"
						}else if(arr[i].orderstate==1){
							arr[i].orderstates="已完成"
						}else if(arr[i].orderstate==2){
							arr[i].orderstates="不接受申请，订单取消"
						}
						if(arr[i].paymode==0){
							arr[i].paymodes="支付宝"+arr[i].paymentno;
						}else if(arr[i].paymodes==1){
							arr[i].paymodes="微信"+arr[i].paymentno;
						}else if(arr[i].paymodes==2){
							arr[i].paymodes="钱包支付"+arr[i].paymentno;
						}else if(arr[i].paymodes==4){
							arr[i].paymodes="银行卡"+arr[i].paymentno;
						}
						
						if(arr[i].mode){
							if(arr[i].mode.includes(';')){
								arr[i].modes = arr[i].mode.split(';');
							}else{
								arr[i].modes = [];
								arr[i].modes.push(arr[i].mode);
							}
						}else{
							arr[i].modes = [];
						}
						
						arr[i].picktotals="￥"+arr[i].picktotal
					}
					this.tableData=arr;
					this.total = Number(data.totalCount);
				});
			},
			search(v) {
			this.AddBattery(this.currentPage,this.find,this.radio)
			},
			confirmIsuse() { 
				var id = this.currentId;
				this.$post('operPick/withdraw', {
					id: id
				}).then(data => {
					this.dialogFormVisible = false;
					this.$ye();
					this.AddBattery(this.currentPage, this.find,1)
				})
			},
			confirmIsuses() { 
				var id = this.currentId;
				this.$post('operPick/refund', {
					id: id,
					paymentno:this.paymentno
				}).then(data => {
					this.dialogFormVisibles= false;
					this.$ye();
					this.AddBattery(this.currentPage, this.find,1)
				})
			},
			canceluse() { //取消或者关闭
				this.dialogFormVisible = false;
				this.dialogFormVisibles = false;
			}	
	  },
	  mounted(){
		this.AddBattery(1,this.find,this.radio);
		this.$sendTitle(this.navtitle);
	  },
      components:{
		  Dialogue
      }
    }
</script>

<style scoped>
	
	
	
</style>