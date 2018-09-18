<template>
	<div>
		<div class="boxborder hf bw flex-wrap flex-vertical">
			<el-row class="row p-10 pb-0" type="flex" align="middle">
				<el-col :span="5">
					<span class="font-14">账号状态：</span>
					<template>
						<el-radio-group v-model="radio1" @change="handleRadio">
							<el-radio label="">全部</el-radio>
							<el-radio label="0">启用</el-radio>
							<el-radio label="1">禁用</el-radio>
						</el-radio-group>
					</template>
				</el-col>
				
				<el-col :span="6">
					<div>
						<el-input placeholder="请输入内容" v-model="find" class="input-with-select" @keyup.enter.native='search'>
							<el-button slot="append" icon="el-icon-search" @click="search" clearable>筛选</el-button>
						</el-input>
					</div>
				</el-col>

				<el-col :span="6" :offset="7" style="text-align:right;">
					<router-link to='/Main/Addbusiness'>
						<el-button type="success" size="small">+&nbsp;添加运营商</el-button>
					</router-link>
				</el-col>
			</el-row>

			<div class="paddinglist flex-con">
				<template>
					<el-table :data="tableData" style="width: 100%;">
						<el-table-column prop="no" label="运营商编号" width="" align="center">
						</el-table-column>
						<el-table-column prop="name" label="运营商名称" width="" align="center">
						</el-table-column>
						<el-table-column prop="levelName" label="运营商等级" width="" align="center">
						</el-table-column>
						<el-table-column prop="username" label="运营商账号" width="" align="center">
						</el-table-column>
						<el-table-column prop="contactname" label="联系人" width="" align="center">
						</el-table-column>
						<el-table-column prop="contactcellphone" label="联系电话" width="" align="center">
						</el-table-column>
						<el-table-column prop="shopCount" label="运营网点" width="" align="center">
						</el-table-column>
						<el-table-column prop="signtimebegin" label="合约经营开始时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="signtimeend" label="合约经营结束时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="statusd" label="账户状态" width="" align="center">
						</el-table-column>
						<el-table-column prop="action" label="操作" align="center">
							<template slot-scope="scope">
								<router-link :to="{path:'/Main/Businessdetail',query:{id:scope.row.id}}">
									<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
								</router-link>
								<el-button type="warning" size="mini" class="btnStyle" @click="handleDelete(scope.$index, scope.row)">
									{{scope.row.status == 0 ? nouse : canuse}}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<template>
					<div class="block page">
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="totalCount">
						</el-pagination>
					</div>
				</template>
				<Dialogue :textContent="textContent" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
			</div>
		</div>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'

	export default {
		data() {
			return {
				navtitle:'运营商>运营商列表',
				tableData: [],
				radio1: '',
				find: '',
				totalCount: 10,
				currentPage: 1,
				nouse: '禁用',
				canuse: "启用",
				textContent: '',
				dialogVisible: false,
				currentStatus: '',
				currentId: ''
			}
		},
		methods: {
			
			handleCurrentChange(val) { //分页
				this.getOperlist({
					pageNo: val					
				});
			},
			handleRadio() { //启用禁用查询	      	
				this.getOperlist();
			},
			search() { //筛选
				this.getOperlist({
					status: this.radio1,
					name: this.find
				});
				
			},
			getOperlist({
				pageNo = 1,
				status = this.radio1,
				name = this.find
			} = {}) {
				this.$get('operAdmin/getAll', {
					pageNo: pageNo,
					status: status,
					name: name
				}).then(data => {
					this.totalCount = data.totalCount;
					let tableData = data.datas;
					for(let i = 0, len = tableData.length; i < len; i++) {
						switch(tableData[i].status) {
							case 0:
								tableData[i].statusd = '已启用';
								break;
							case 1:
								tableData[i].statusd = '禁用';
								break;
							default:
								tableData[i].statusd = '--';
						}
					}
					this.tableData = tableData;
				})
			},
			confirmIsuse() { //确认
				var status = this.currentStatus == 0 ? 1 : 0;
				var userId = this.currentId;
				var currentPage = this.currentPage;
				var find = this.find;
				var radio1 = this.radio1;

				this.$post('operAdmin/updateStatus', {
					id: userId,
					status: status
				}).then(data => {
					this.dialogVisible = false;
					this.getOperlist({
						pageNo: currentPage,
						name: find,
						status: radio1
					}); //刷新当前页
					this.$ye();
				})
			},
			canceluse() { //取消
				this.dialogVisible = false;
			},
			handleDelete(index, row) { //禁用启用按钮	      	
				this.currentStatus = row.status;
				this.currentId = row.id;
				this.dialogVisible = true;
				this.textContent = row.status == 0 ? "确认禁用该运营商吗？" : "确认启用该运营商吗？";

			}

		},
		mounted() {
			this.getOperlist(); //初始化列表
			this.$sendTitle(this.navtitle);
		},
		components: {
			Dialogue
		}
	}
</script>

<style scoped>
	
	/*.row {margin: 0;}*/
	 .btnReset{color:#fff;}

	
</style>