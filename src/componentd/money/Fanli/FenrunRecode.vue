<template>
	<div>
			<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="addtime" label="结算时间" width="" align="left">
				</el-table-column>
				<el-table-column prop="remark" label="结算项" width="" align="left">
				</el-table-column>
				<el-table-column prop="rebate" label="结算金额" width="" align="left">
				</el-table-column>
				<el-table-column prop="" label="结算方式" width="" align="left">
					<template slot-scope="scope">
						<div>{{scope.row.acctype == 0 ? '网银支付' : '支付宝' }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="account" label="结算账户" width="" align="left">
				</el-table-column>
				<el-table-column prop="orderno" label="订单号" width="" align="left">
				</el-table-column>
				<el-table-column prop="hander" label="经办人" width="300" align="left">
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
		data(){
			return{
				tableData: [],
				totalCount:10,
				currentPage: 1
			}
		},
		methods: {			
			handleCurrentChange(val) {
				
			},
			getoperExtract(){
				this.$get('operExtract/getAll',{
					
				}).then(data=>{					
					this.tableData = data.datas;
				})
			}
		},
		mounted(){
			this.getoperExtract();
		}
	}
</script>

<style>
</style>