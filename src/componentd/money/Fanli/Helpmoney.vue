<template>
	<div>
			<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="paytime" label="救援完成时间" width="" align="left">
				</el-table-column>
				<el-table-column prop="rescueid" label="救援单号" width="" align="left">
				</el-table-column>
				<el-table-column prop="shopNo" label="救援网点" width="" align="left">
				</el-table-column>				
				<el-table-column prop="username" label="用户" width="" align="left">
				</el-table-column>
				<el-table-column prop="faulttype" label="救援类型" width="" align="left">
				</el-table-column>
				<el-table-column prop="paymode" label="支付方式" width="" align="left">
				</el-table-column>
				<el-table-column prop="amount" label="救援费用" width="" align="left">
				</el-table-column>
				<el-table-column prop="margin" label="平台利润（扣减网点补贴后）" width="" align="left">
				</el-table-column>
				<el-table-column prop="profit" label="运营商获取分润" width="" align="left">
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
				currentPage:1,
				totalCount:100
			};
		},
		methods: {		
			handleCurrentChange(val) {
				this.getAllRescue({pageNo:val});
			},
			getAllRescue({pageNo=1,begin=this.searchTime[0] || "",end=this.searchTime[1] || ""}={}){
				this.$get('operProfit/getAllRescue',{					
					pageNo:pageNo,
					begin:pageNo,
					end:end
				}).then(data=>{
					this.totalCount = data.totalCount;
					this.tableData = data.datas;
				})
			}	
		
		},
		mounted(){
			this.getAllRescue();
		},
		props:['searchTime'],
		watch:{
			searchTime:function(newVal,oldVal){
				this.getAllRescue();
				this.currentPage=1;
			},
			deep:true
		}
	}
</script>

<style>
</style>