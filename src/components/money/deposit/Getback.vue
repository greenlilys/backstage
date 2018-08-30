<template>
	<div class="mt-10">
		<template>
			<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
				<el-table-column prop="username" label="用户账号" width="" align="center">
				</el-table-column>
				<el-table-column prop="addTime" label="赎回时间" width="" align="center">
				</el-table-column>
				<el-table-column prop="deposits" label="赎回金额" width="" align="center">
				</el-table-column>
			</el-table>
		</template>
		<template>
			<div class="block page">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
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
				total: 10,
				begin: '',
				end: ''
			}
		},
		methods: {

			cellStyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 2) { //指定坐标
					return 'color:#FF6600'
				} else {
					return ''
				}
			},
			handleCurrentChange(val) {
				this.depositList({
					pageNo: val
				});
			},
			depositList({
				pageNo = 1,
				category = 11,
				begin = this.begin,
				end = this.end
			} = {}) {

				this.$get('capital/depositPay', {
					pageNo: pageNo,
					category: category,
					begin: begin,
					end: end
				}).then(data => {
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						//支付方式
						if(arr[i].paymode == 0) {
							arr[i].paymodes = "支付宝"
						} else if(arr[i].paymode == 1) {
							arr[i].paymodes = "微信"
						} else {
							arr[i].paymodes = "钱包支付"
						}
						arr[i].deposits = "￥" + arr[i].deposit
					}
					this.tableData = arr;
					this.total = Number(data.totalCount);
				});
			}
		},
		props: ['valueTime'],
		mounted() {
			this.depositList();
		},
		watch: {
			valueTime(newVal, oldVal) {
				if(newVal) {
					this.depositList({
						begin: newVal[0],
						end: newVal[1]
					});
					this.currentPage = 1;
					this.begin = newVal[0];
					this.end = newVal[1];
				}
			}
		}
	}
</script>
<style scoped>

</style>