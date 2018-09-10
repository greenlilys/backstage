<template>
	<div>
			<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="date" label="租金开始时间" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="租金类型" align="center">
				</el-table-column>
				<el-table-column prop="name" label="安装/续约" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="服务网点" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="用户" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="支付方式" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="支付金额" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="平台利润（扣减安装成本后）" width="230" align="center">
				</el-table-column>
				<el-table-column prop="name" label="运营商分润" width="" align="center">
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
				currentPage: 1,
				totalCount:100
				
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				
			},
			getAllRenew({id=this.id}={}){
				this.$get('operProfit/getAllRenew',{
					id:id
				}).then(data=>{
					this.tableData = data.datas;
					this.totalCount = data.totalCount;
				})
			}
			
		
		
		},
		mounted(){
			this.getAllRenew();
		},
		props:['id']
	}
</script>

<style>
</style>