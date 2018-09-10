<template>
	<div>
		<template>
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="addtime" label="回收记录时间" width="160" align="center">
				</el-table-column>
				<el-table-column prop="" label="回收内容" width="" align="center">
					<template slot-scope="scope">
						<div v-for="item in scope.row.Inventorydistribution">{{item}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="nickname" label="经办人" align="center">
				</el-table-column>
			</el-table>
		</template>
		<template>
			<div class="block page">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="8" layout="total, prev, pager, next" :total="total">
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
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.getShopServiceList(val, this.id)
			},
			getShopServiceList(pageNo, id) {
				var id = this.id;
				this.$get('shopLog/recoveryList', {
					pageNo: pageNo,
					id: id
				}).then(data => {
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {

						//电池库存/配货
						var battery = arr[i].batteryList;
						arr[i].Inventorydistribution = [];
						for(var j = 0, lens = battery.length; j < lens; j++) {
							arr[i].Inventorydistribution.push(battery[j].mode + " " + battery[j].groupnum + "组");
						}
					}
					this.tableData = arr;
					this.total = Number(data.totalCount);
				})
			},
		},
		props: ['id'],
		ceeated() {},
		mounted() {
			this.getShopServiceList(1, this.id)
		},
	}
</script>

<style>

</style>