<template>
	<div>
		<div class="flex-wrap flex-vertical hf">
			<div class="p-10 bw boxborder">
				<h1 class="font-18 tc p-10">保证金总计：<span class="font-20 fontYellow">￥{{platBond}}</span></h1>				
			</div>
			<div class="paddinglist pr boxborder mt-10 bw flex-con ">
				<el-row  class="p-10 boxborder bw" type="flex" align="middle" justify='end'>
					<el-col :span="6">
						<el-input placeholder="请输入支付宝订单号" v-model="find" class="input-with-select" clearable @keyup.enter.native='search'>
							<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
						</el-input>
					</el-col>				
				</el-row>
				<template>
					<el-table :data="platBonds" style="width: 100%;" :cell-style="cellStyle">
						<el-table-column prop="no" label="网点编号" width="" align="center">
						</el-table-column>
						<el-table-column prop="name" label="网点名称" width="" align="center">
						</el-table-column>
						<el-table-column prop="username" label="网点账号" width="" align="center">
						</el-table-column>
						<el-table-column prop="platbonds" label="保证金" width="" align="center">
						</el-table-column>
						<el-table-column prop="paytime" label="付款时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="paymodes" label="支付方式" width="" align="center">
						</el-table-column>
						<el-table-column prop="paymentno" label="支付订单号" width="" align="center">
						</el-table-column>
						<el-table-column prop="signtimebegins" label="加盟有效期" width="" align="center">
						</el-table-column>
						<el-table-column prop="" label="操作" align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.isreturn==1">已退款</span>
								<span v-if="scope.row.isreturn==0"><el-button type="warning" size="mini" class="btnStyle" @click="handle(scope.$index, scope.row)" >解约退款</el-button></span>
							</template>
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
		</div>
		<Dialogue :textContent="textContent" :dialogVisible="dialogVisible" v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'

	export default {
		name: '',
		data() {
			return {
				navtitle: '资金>保证金',
				platBonds: [],
				currentPage: 1,
				total: 0,
				platBond: '',
				dialogVisible: false, //解约提示框
				textContent: '', //提示框文本
				find:'',

			}
		},
		methods: {
			search(){
				this.platBondList(1,this.find);
			},
			cellStyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 3) { //指定坐标
					return 'color:#FF6600'
				} else {
					return ''
				}
			},
			handleCurrentChange(val) {
				this.platBondList(val);
			},
			handle(index, row) { //解约启用按钮	      	
				this.currentId = row.id;
				this.dialogVisible = true;
				this.textContent = "请在与加盟网点解约，并退还保证金后，进行本次操作。确定后，该加盟网点保证金将从总额中扣除。"
			},
			platBondList(pageNo,find) {
				this.$get('capital/platBondList', {
					pageNo: pageNo,
					no:find
				}).then(data => {
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						arr[i].signtimebegins = arr[i].signtimebegin + "-" + arr[i].signtimeend;
						//支付方式
						if(arr[i].paymode == 0) {
							arr[i].paymodes = "支付宝"
						} else if(arr[i].paymode == 1) {
							arr[i].paymodes = "微信"
						} else {
							arr[i].paymodes = "钱包支付"
						}
						arr[i].platbonds = "￥" + arr[i].platbond;
					}
					this.platBonds = arr;
					this.total = Number(data.totalCount);
				});
			},
			platBondStatistics() {
				this.$get('capital/platBondStatistics', {}).then(data => {						
					this.platBond = data;
				})
			},
			confirmIsuse() { //确认解约
				var id = this.currentId;
				this.$post('capital/updateShopPlatBond', {
					id: id
				}).then(data => {
					this.dialogVisible = false;
					this.$ye();
					this.platBondStatistics();
					this.platBondList(this.currentPage,this.find);
				})
			},
			canceluse() { //取消或者关闭
				this.dialogVisible = false;
			}
		},
		mounted() {
			this.platBondStatistics();
			this.platBondList(1);
			this.$sendTitle(this.navtitle);
		},
		components: {
			Dialogue
		}
	}
</script>

<style scoped>

</style>