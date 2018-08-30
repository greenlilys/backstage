<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="addTime" label="押金变动时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="categorys" label="变动类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="deposits" label="金额" width="" align="center">
									</el-table-column>								
									<el-table-column prop="balances" label="押金余额" width="" align="center">
									</el-table-column>
									<el-table-column prop="paymodes" label="支付方式" width="" align="center">
									</el-table-column>
									<el-table-column prop="paymentno" label="支付订单号" width="" align="center">
									</el-table-column>
									
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage1"
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="totalCount">
							    </el-pagination>
							 	 </div>
							</template>		
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData: [],
		        currentPage1:1,
		        totalCount:10
			}
		},
		methods:{
			 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
		  },
		  cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 2){ //指定坐标
						return 'color:#FF6600'
					}else if(columnIndex === 3){
						return 'color:#FF6600'
					}else{
						return ''
					}
		  },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      },
	      getDepositList(id,pageNo){
	      	  this.$get('customerLog/depositList',{
					id:id,
					pageNo:pageNo				
				}).then(data=>{
					let tableData = data.datas; 
					this.totalCount = data.totalCount;
					for(let i = 0,len=tableData.length;i<len;i++){
						switch (tableData[i].paymode){
							case 0:
							tableData[i].paymodes = "支付宝"
							break;
							case 1:
							tableData[i].paymodes = "微信"
							break;
							case 2:
							tableData[i].paymodes = "钱包支付"
							break;
							default:
							tableData[i].paymodes = "--";
						}
						
						switch (tableData[i].category){
							case 0:
							tableData[i].categorys = "押金缴纳"
							break;
							case 1:
							tableData[i].categorys = "滞纳金补足"
							break;
							case 10:
							tableData[i].categorys = "电池损毁"
							break;
							case 11:
							tableData[i].categorys = "押金提现"
							break;
							case 12:
							tableData[i].categorys = "逾期扣款"
							break;
							default:
							tableData[i].categorys = "--";
						}
						tableData[i].balances="￥"+tableData[i].balance;
						tableData[i].deposits="￥"+tableData[i].deposit;
					}
					this.tableData = tableData;
				})
	      }
		},
		props:['id'],
		mounted(){					
			this.getDepositList(this.id,1);			
		},
		watch:{
			
		}
	}
</script>

<style scoped>

</style>