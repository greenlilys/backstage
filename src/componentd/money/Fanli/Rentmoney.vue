<template>
	<div>
			<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="begintime" label="租金开始时间" width="" align="left">
				</el-table-column>
				<el-table-column prop="mode" label="租用产品" align="center">
				</el-table-column>
				<el-table-column prop="" label="租金类型" align="center">
					<template slot-scope="scope">						
							<div v-if=" scope.row.leaseterm == '0' ">月租</div>
							<div v-if=" scope.row.leaseterm == '1' ">季租</div>
							<div v-if=" scope.row.leaseterm == '2' ">年租</div>
					</template>
				</el-table-column>				
				<el-table-column prop="shopNo" label="服务网点" width="" align="left">
				</el-table-column>
				<el-table-column prop="username" label="用户" width="" align="left">
				</el-table-column>
				<el-table-column prop="paymode" label="支付方式" width="" align="left">
				</el-table-column>
				<el-table-column prop="amount" label="支付金额" width="" align="left">
				</el-table-column>
				<el-table-column prop="margin" label="平台利润（扣减安装成本后）" width="" align="left">
				</el-table-column>
				<el-table-column prop="profit" label="运营商分润" width="" align="left">
				</el-table-column>
				<el-table-column prop="state" label="分润进度" width="" align="left">
				</el-table-column>
			</el-table>
		</template>
		<template>
			<div class="block page">
				<el-pagination 
					 
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
				currentPage: 1,
				totalCount:10
				
			};
		},
		methods: {			
			handleCurrentChange(val) {
				this.getAllRenew({pageNo:val});
			},
			getAllRenew({pageNo=1,id=this.id,begin=this.searchTime[0] || "",end=this.searchTime[1] || ""}={}){
				this.$get('operProfit/getAllRenew',{
					id:id,
					pageNo:pageNo,
					begin:begin,
					end:end
				}).then(data=>{
					this.tableData = data.datas;
					this.totalCount = data.totalCount;
				})
			}
		
		},
		mounted(){
			this.getAllRenew();		
		},
		props:['searchTime'],
		watch:{
			searchTime:function(newVal,oldVal){
				this.getAllRenew();
				this.currentPage=1;
			},
			deep:true
		}
	}
</script>

<style>
</style>