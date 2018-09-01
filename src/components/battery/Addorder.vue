<template>
	<div >
		<div class="shopList flex-wrap flex-vertical">	
		
		<el-row class="row" type="flex" align="middle">
			<el-col :span="7">
					<span class="font-14">订单状态：</span>
					 <el-radio-group v-model="radio" @change="handleRedio">
						<el-radio  label="">全部</el-radio>
						<el-radio  label="0">待配货</el-radio>
						<el-radio  label="1">已完成</el-radio>
					</el-radio-group>
				
			</el-col>
			
			<el-col :span="6" :offset="1">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</div>
			</el-col>
		</el-row>
			<div class="listDetail mt-10 flex-con">					
				<template>
					<el-table :data="tableData" style="width: 100%;">
						<el-table-column prop="pickno" label="增配订单号" width="" align="center">
						</el-table-column>									
						<el-table-column prop="addtime" label="下单时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="no" label="运营商编号" width="" align="center">
						</el-table-column>
						<el-table-column prop="name" label="运营商名称" width="" align="center">
						</el-table-column>
						<el-table-column prop="provincenames" label="店铺地址" width="" align="center">
						</el-table-column>
						<el-table-column prop="mode" label="配货内容" width="180" align="center">
								<template slot-scope="scope">						
									<div v-for="item in scope.row.modes">{{item}}组</div>
								</template>
						</el-table-column>
						<el-table-column prop="picktotals" label="配货金额" width="" align="center">
						</el-table-column>
						<el-table-column prop="paymodes" label="支付流水" width="" align="center">
						</el-table-column>
						<el-table-column prop="orderstates" label="订单状态" width="" align="center">
						</el-table-column>
						<el-table-column prop="handler" label="经办人" width="" align="center">
						</el-table-column>
						<el-table-column prop="name" label="操作" width="" align="center">
							<template slot-scope="scope">										
								<span><el-button type="warning" size="mini" class="btnStyle" @click="Shment(scope.$index, scope.row)" >立刻处理</el-button></span>
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
		<el-dialog title="确认已完成配货？" :visible.sync="dialogFormVisible" width="30%">
				<div class="font-16 tl">
					<div class="font-14 mb-10">确认后：</div>
					<div class="font-14">1.该配货订单中的配货数量添加至对应运营商配货数量；<br/>
						2.本配货订单中的配货金额添加至对应运营商配货成本余额；
					</div>					
					<div class="font-14 mt-10 fontYellow">请在核对配货单据后，进行确认。</div>
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
				navtitle:'产品>运营商增配订单',
				tableData: [],
		        currentPage:1,
				radio:'',
				total:0,
				find:'',
				dialogFormVisible:false,
				formLabelWidth: '120px',
				currentId:'',//当前id
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
	    	AddBattery(pageNo,find){
				var pageNo = pageNo || "";
				var find = this.find || "";
				var radio = this.radio || "";
				this.$get('operPick/increaseList',{
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
				this.$post('operPick/finishPick', {
					id: id
				}).then(data => {
					this.dialogFormVisible = false;
					this.$ye();
					this.AddBattery(this.currentPage, this.find,1)
				})
			},
			canceluse() { //取消或者关闭
				this.dialogFormVisible = false;
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
	.shopList {width: 100%;box-sizing: border-box;height:100%;}	
	.row {margin: 0;}
	.row,.listDetail{background: #fff;padding: 10px;}
	.shopList .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>