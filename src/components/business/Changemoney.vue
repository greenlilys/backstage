<template>
	<div>
			<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="profittime" label="分润时间" width="" align="center">
				</el-table-column>
				<el-table-column prop="no" label="预约单号" width="" align="center">
				</el-table-column>
				<el-table-column prop="shopNo" label="服务网点" width="" align="center">
				</el-table-column>
				<el-table-column prop="username" label="用户" width="" align="center">
				</el-table-column>
				<el-table-column prop="paymode" label="支付方式" width="" align="center">
				</el-table-column>
				<el-table-column prop="amount" label="金额/天牛币" width="" align="center">
				</el-table-column>
				<el-table-column prop="margin" label="平台利润（扣减换电成本后）" width="300" align="center">
				</el-table-column>
				<el-table-column prop="profit" label="运营商获取分润" width="" align="center">
				</el-table-column>
				<el-table-column prop="state" label="分润进度" width="" align="center">
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
					:total="totalCount">
				</el-pagination>
			</div>
		</template>
	</div>
</template>
<script>
export default {
		data() {
			return {
				tableData: [],
				totalCount:10,
				currentPage: 1				
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			getoperProfit({id=this.id,begin=this.searchTime[0] || "",end=this.searchTime[1] || ""}={}){
				this.$get('operProfit/getAllReplace',{
					id:id,
					begin:begin,
					end:end
				}).then(data=>{
					this.tableData = data.datas;
					this.totalCount = data.totalCount;
				})
			}
		
		},
		mounted(){
			console.log(this.id,this.searchTime);
			this.getoperProfit();
		},
		props:['searchTime','id'],
		watch:{
			searchTime:function(newVal,oldVal){
				this.getoperProfit();
			},
			deep:true
		}
	}
</script>

<style>
</style>