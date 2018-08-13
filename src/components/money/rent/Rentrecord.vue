<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addTime" label="租金支付时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="交租用户" width="" align="center">
									</el-table-column>
									<el-table-column prop="names" label="租用电池类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="leaseterms" label="租期类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="amount" label="租金/积分金额" width="" align="center">
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
				total:0
			}
		},
		methods:{
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
			this.rentList(val,"",this.begin,this.end);
			},
			rentList(pageNo){
			var pageNo = pageNo || "";
			this.$get('capital/rentList',{
				pageNo: pageNo,
				isrent :"",
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
					//租期方式
					if(arr[i].leaseterm == 0) {
						arr[i].leaseterms = "月租"
					} else if(arr[i].leaseterm == 1){
						arr[i].leaseterms = "季租"
					} else{
						arr[i].leaseterms = "年租"
					}
				}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
			}
		},
		props:['begin','end'],
		mounted(){
		this.rentList(1,"",this.begin,this.end);
		}
	}
</script>


<style scoped>

</style>