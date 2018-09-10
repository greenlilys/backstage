<template>
	<div class="shopList flex-wrap flex-vertical">
		<el-row class="bw p-10" type="flex" align="middle">
			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="nickName" class="input-with-select" clearable>
						<el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
					</el-input>
				</div>
			</el-col>

		</el-row>

		<div class="pr bw mt-10 flex-con paddinglist boxborder">			
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column prop="no" label="店铺名称" width="" align="center">
					</el-table-column>
					<el-table-column prop="username" label="店铺账号" width="" align="center">
					</el-table-column>
					<el-table-column prop="address" label="店铺地址" width="300" align="center">
					</el-table-column>
					<el-table-column prop="contactnameiphone" label="联系人" width="" align="center">
					</el-table-column>
					<el-table-column prop="addTime" label="申请加盟时间" width="" align="center">
					</el-table-column>
					<el-table-column prop="auditstatus" label="审核状态" width="" align="center">
					</el-table-column>
					<el-table-column prop="ispayfee" label="保证金支付状态" width="" align="center">
					</el-table-column>
					<el-table-column prop="action" label="操作" align="center">
						<template slot-scope="scope">
							<router-link :to="{path:'/Main/Joindetail',query:{ id:scope.row.id}}">
								<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
							</router-link>
						</template>
					</el-table-column>
				</el-table>
		
				<div class="block page">
					<el-pagination 
						@current-change="handleCurrentChange" 
						:current-page.sync="currentPage" 
						:page-size="10" layout="total, prev, pager, next" 
						:total="total">
					</el-pagination>
				</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				navtitle:'网点>加盟申请',
				nickName: '',
				tableData: [],
				currentPage: 1,
				total: 10
			}
		},
		methods: {		
			handleCurrentChange(v) {
				this.getShopApplyList({pageNo:v});
			},
			getShopApplyList({pageNo=1,nickName=this.nickName}={}) {				
				this.$get('shop/applyShopList', {
					pageNo: pageNo,
					nickName: nickName
				}).then(data => {
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						//店铺地址
						arr[i].address = arr[i].provincename + arr[i].address;
						//联系人
						arr[i].contactnameiphone = arr[i].contactname + arr[i].contactcellphone;

						//审核状态
						if(arr[i].auditstatus == 0) {
							arr[i].auditstatus = "等待审核"
						} else if(arr[i].auditstatus == 1) {
							arr[i].auditstatus = "审核不通过"
						} else {
							arr[i].auditstatus = "审核通过"
						}
						//支付状态
						if(arr[i].ispayfee == 0) {
							arr[i].ispayfee = "未支付"
						} else {
							arr[i].ispayfee = "已支付"
						}

					}
					this.tableData = arr;
					this.total = Number(data.totalCount);
				})
			},
		
			search() {
				if(this.nickName){
					this.getShopApplyList();
					this.currentPage = 1;
				}else{
					this.$fail('请输入搜索内容')
				}				
				
			}
		},

		mounted() {
			this.getShopApplyList();
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style scoped>

</style>