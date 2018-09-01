<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<el-row class="headBox" type="flex" align="middle">
				<div class="block">
					<span class="font-14">选择时段：&nbsp;</span>
					<el-date-picker v-model="valueTime" type="daterange"  range-separator="至" start-placeholder="开始日期" 
							end-placeholder="结束日期" value-format="yyyy-MM-dd">
					</el-date-picker>
				</div>
			</el-row>

			<div class="botBox flex-con contentBox mt-10">
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column prop="username" label="用户账号" width="" align="center">
					</el-table-column>
					<el-table-column prop="addtime" label="注册时间" width="" align="center">
					</el-table-column>
					<el-table-column prop="isdeposits" label="押金状态" width="" align="center">
					</el-table-column>
					<el-table-column prop="integral" label="天牛币余额" width="" align="center">
					</el-table-column>
					<el-table-column prop="lengths" label="推荐人数" width="" align="center">
					</el-table-column>
				</el-table>
				<div class="block page">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navtitle:'统计>推荐用户',
				tableData: [],
				currentPage: 1,
				valueTime: [],
				total: 0

			}
		},
		methods: {

			handleCurrentChange(val) {
				this.Recommendlist({
					pageNo: val,
					begin:this.valueTime[0],
					end:this.valueTime[1]
				});
			},
			Recommendlist({
				pageNo = 1,
				begin = '',
				end = ''
			} = {}) {
				this.$get('reportform/refereeNumber', {
					pageNo: pageNo,
					begin: begin,
					end: end
				}).then(data => {
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						if(arr[i].isdeposit == 0) {
							arr[i].isdeposits = "未缴"
						} else if(arr[i].isdeposit == 1) {
							arr[i].isdeposits = "已缴"
						}
					}
					this.tableData = arr;
					this.total = Number(data.totalCount);
				});
			}
		},
		mounted() {
			this.Recommendlist();
			this.$sendTitle(this.navtitle);
		},
		watch: {
			valueTime(newVal, oldVal) {
				if(newVal) {
					this.Recommendlist({
						begin: newVal[0],
						end: newVal[1]
					})
					this.currentPage = 1;
				}
			}
		}
	}
</script>

<style scoped>
	.numBox>div {
		padding: 20px;
	}
	
	.numBox>div:nth-child(1),
	.numBox>div:nth-child(2) {
		margin-right: 10px;
	}
	
	.botBox {
		position: relative;
	}
</style>