<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="addTime" label="押金缴纳时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="用户账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="names" label="租用电池类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="deposits" label="押金金额" width="" align="center">
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
							      :current-page.sync="currentPage"
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="total">
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
				currentPage:1,
				total:0,
				begin:'',
				end:''
			}
		},
		methods:{
		  handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
		  },
		  cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 3){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		  },
	      handleCurrentChange(val) {
			this.depositList(val,0,this.begin,this.end);
		  },
	  	  depositList(pageNo){
			var pageNo = pageNo || "";
			this.$get('capital/depositPay',{
				pageNo: pageNo,
				category : 0,
				begin:this.begin,
				end:this.end
			}).then(data=>{
				var arr = data.datas;
				for(var i = 0, len = arr.length; i < len; i++) {
					arr[i].names=arr[i].name+"   "+arr[i].groupnum+"组"
					//支付方式
					if(arr[i].paymode == 0) {
						arr[i].paymodes = "支付宝"
					} else if(arr[i].paymode == 1){
						arr[i].paymodes = "微信"
					} else{
						arr[i].paymodes = "钱包支付"
					}
					arr[i].deposits="￥"+arr[i].deposit
				}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
		  }
		},
		props:['valueTime'],		
		mounted(){
		this.depositList(1,0,this.begin,this.end);
		},
		watch:{
			valueTime:function(newVal,oldVal){
					console.log(newVal,oldVal)
					if(newVal){
						this.begin = newVal[0];
						this.end = newVal[1];
						this.depositList(1,0,newVal[0],newVal[1]);
					}
			}
		}
	}
</script>

<style scoped>

</style>