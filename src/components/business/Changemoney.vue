<template>
	<div>
			<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="date" label="分润时间" width="150" align="center">
				</el-table-column>
				<el-table-column prop="name" label="预约单号" width="160" align="center">
				</el-table-column>
				<el-table-column prop="name" label="服务网点" width="130" align="center">
				</el-table-column>
				<el-table-column prop="name" label="用户" width="100" align="center">
				</el-table-column>
				<el-table-column prop="address" label="支付方式" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="金额/天牛币" width="120" align="center">
				</el-table-column>
				<el-table-column prop="name" label="平台利润（扣减换电成本后）" width="300" align="center">
				</el-table-column>
				<el-table-column prop="name" label="运营商获取分润" width="130" align="center">
				</el-table-column>
				<el-table-column prop="name" label="分润进度" width="130" align="center">
				</el-table-column>
				
			</el-table>
		</template>
		<template>
			<div class="block page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="8" layout="total, prev, pager, next" :total="100">
				</el-pagination>
			</div>
		</template>
	</div>
</template>
<script>
export default {
		data() {
			return {
				tableData: [{
					date: '2016',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					money: 50.00,
					action: '查看详情'
				}, {
					date: '2016',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					money: 50.00,
					action: '查看详情'
				}, {
					date: '2016',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					money: 50.00,
					action: '查看详情'
				}, {
					date: '2016',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					money: 50.00,
					action: '查看详情'
				}],
		
				currentPage1: 1
				
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		
		
		}
	}
</script>

<style>
</style>