<template>
	<div>
			<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="date" label="救援完成时间" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="救援单号" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="救援网点" width="" align="center">
				</el-table-column>
				
				<el-table-column prop="name" label="用户" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="救援类型" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="支付方式" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="救援费用" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="平台利润（扣减网点补贴后）" width="230" align="center">
				</el-table-column>
				<el-table-column prop="name" label="运营商获取分润" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="分润进度" width="" align="center">
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
				currentPage:1,
				totalCount:100
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			getAllRescue({id=this.id}={}){
				this.$get('operProfit/getAllRescue',{
					id:id
				}).then(data=>{
					this.totalCount = data.totalCount;
					this.tableData = data.datas;
				})
			}	
		
		},
		mounted(){
			this.getAllRescue();
		},
		props:['id']
	}
</script>

<style>
</style>