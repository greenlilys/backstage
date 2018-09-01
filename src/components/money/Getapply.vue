<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<el-row  class="contentBox" type="flex" align="middle">
				<el-col :span="6">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable>
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</el-col>				
			</el-row>
			<div class="mainlist flex-con mt-10 bw contentBox">
				<template>
					<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
						<el-table-column prop="no" label="提现申请编号" width="" align="center">
						</el-table-column>
						<el-table-column prop="username" label="提现账户" width="" align="center">
						</el-table-column>
						<el-table-column prop="usertype" label="账户类型" width="" align="center">
						</el-table-column>
						<el-table-column prop="balance" label="钱包余额" width="" align="center">
						</el-table-column>
						<el-table-column prop="addtime" label="申请提现时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="amounts" label="申请提现金额" width="" align="center">
						</el-table-column>
						<el-table-column prop="typea" label="提现账户" width="" align="center">
						</el-table-column>
						<el-table-column prop="realname" label="用户姓名" width="" align="center">
						</el-table-column>						
						<el-table-column prop="" label="操作" align="center">
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
		<el-dialog title="提现处理" :visible.sync="dialogFormVisible" width="30%">
				<el-form :model="form">
					<el-form-item label="提现账户：" :label-width="formLabelWidth">
						{{info.username}}
					</el-form-item>
					<el-form-item label="账户类型：" :label-width="formLabelWidth">
						{{info.usertype}}
					</el-form-item>
					<el-form-item label="申请时间：" :label-width="formLabelWidth">
						{{info.addtime}}
					</el-form-item>
					<el-form-item label="提现金额：" :label-width="formLabelWidth">
						￥{{info.amount}}
					</el-form-item>
					<el-form-item label="账户余额：" :label-width="formLabelWidth">
						￥{{info.balances}}
					</el-form-item>
					<el-form-item label="提现方式：" :label-width="formLabelWidth">
						{{info.typea}}
					</el-form-item>
					<el-form-item  label="" :label-width="formLabelWidths">
						<span class="font-15 fontYellow">完成转账后，请提交处理结果</span>
					</el-form-item>
					<el-form-item label="提现处理：" :label-width="formLabelWidth">
						<template>
							<el-select v-model="form.result" placeholder="请选择">
								<el-option label="已完成指定账户转账" value="1"></el-option>
								<el-option label="转账失败(即提现失败)" value="2"></el-option>
							</el-select>
						</template>
					</el-form-item>
					<el-form-item label="处理时间：" :label-width="formLabelWidth">
						 <el-date-picker v-model="form.handletime" type="datetime" placeholder="选择日期时间" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm" @keyup.enter.native="Shment()" >
						</el-date-picker>
					</el-form-item>
					<el-form-item label="备注：" :label-width="formLabelWidth">
						<el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="success" @click="confirmIsuse">确 定</el-button>
				</div>
			</el-dialog>
	</div>
</template>
<script>
	import Dialogue from '@/components/common/Dialogue'
	export default{
		data(){
			return {
				navtitle:'资金>提现申请',
				tableData: [],
				currentPage:1,
				total:0,
				find:'',
				dialogFormVisible:false,
				formLabelWidth: '120px',
				formLabelWidths: '36px',
				info:{},
				currentId:'',//当前id
				form:{	//钱包充值金额
					handletime:'',
					result:'',
					remark:''
	        	},
			}
		},
		methods:{
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			cellStyle({row, column, rowIndex, columnIndex}){
			    if(columnIndex === 5){ //指定坐标
			        return 'color:#FF6600'
			    }else if(columnIndex === 7){
			        return 'color:#FF6600'
			    }else if(columnIndex === 3){
			        return 'color:#FF6600'
			    }else{
			    	return ''
			    }
			},
			handleCurrentChange(val) {
				this.cashList(val);
			},
			Shment(index,row){
				this.currentId=row.id;
			 	this.cashInfo(this.currentId);
				this.dialogFormVisible = true;
			},
			cashList(pageNo,find){
				var pageNo = pageNo || "";
				var find = this.find || "";
				this.$get('capital/cashList',{
					pageNo: pageNo,
					no: find,
					result:0
				}).then(data=>{
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						if(arr[i].type==0){
							arr[i].types="支付宝"
						}else{
							arr[i].types="微信"
						}
						arr[i].typea=arr[i].types+":"+arr[i].accounts

						if(arr[i].result==0){
							arr[i].results="处理中"
						}else if(arr[i].result==1) {
							arr[i].results="已完成"
						}else{
							arr[i].results="转账失败"
						}
						if(arr[i].customerid!=null){
							arr[i].usertype="用户"
						}else if(arr[i].shopid!=null){
							arr[i].usertype="加盟网点"
						}
						arr[i].amounts="￥"+arr[i].amount
					}
					this.tableData=arr;
					this.total = Number(data.totalCount);
				});
			},
			search(v) {
			this.cashList(this.currentPage, this.find)
			},	
			cashInfo(id){			
				this.$get('capital/cashInfo',{
					id:this.currentId
				}).then(data=>{
					var arr = data;
					if(arr.type==0){
						arr.types="支付宝"
					}else{
						arr.types="微信"
					}
					arr.typea=arr.types+":"+arr.accounts
					arr.balances=arr.balance+arr.amount
					if(arr.customerid!=null){
						arr.usertype="用户"
					}else if(arr.shopid!=null){
						arr.usertype="加盟网点"
					}
					this.info=arr;

				})
			},
			confirmIsuse() { //处理提现
				var id = this.currentId;
				var handletime =this.form.handletime;
				var result =this.form.result;
				var remark =this.form.remark;
				this.$post('capital/updateCash', {
					id: id,
					handletime:handletime,
					result:result,
					remark:remark
				}).then(data => {
					this.dialogFormVisible = false;
					this.$ye();
					this.cashList(this.currentPage, this.find)
				})
			},
			canceluse() { //取消或者关闭
				this.dialogFormVisible = false;
			}
		},
		mounted(){
		this.cashList(1,this.find,0);
		this.$sendTitle(this.navtitle);
		},
      	components:{
			Dialogue
     	}
    }
</script>

<style scoped>
	.mainlist{position:relative;}
	/*.el-form-item{margin-bottom:10px;}*/
	form.el-form div.el-form-item:nth-child(1),div.el-form-item:nth-child(2),div.el-form-item:nth-child(3),div.el-form-item:nth-child(4)
	,div.el-form-item:nth-child(5),div.el-form-item:nth-child(6),div.el-form-item:nth-child(7){margin-bottom:0;}
	
</style>