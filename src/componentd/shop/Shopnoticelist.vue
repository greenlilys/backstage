<template>
	<div>
		<div class="hf flex-wrap flex-vertical">
			<el-row class="bw p-10" type="flex" align="middle">
				<el-col :span="6" :offset="18" class="tr">
					<router-link to='/Main/AddShopNotice'>
						<el-button type="success" size="small">+&nbsp;添加公告</el-button>
					</router-link>
				</el-col>
			</el-row>

			<div class="paddinglist mt-10 flex-con bw">
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column prop="title" label="公告标题" width="" align="center">
					</el-table-column>
					<el-table-column prop="addTime" label="发布时间" width="" align="center">
					</el-table-column>
					<el-table-column prop="action" label="操作" width="250" align="center">
						<template slot-scope="scope">
							<router-link :to="{path:'/Main/ShopUpdNotice',query:{id:scope.row.id}}">
								<el-button type="warning" size="mini" class="btnStyle">修改</el-button>
							</router-link>
							<el-button type="warning" size="mini" class="btnStyle" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<div class="block page">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="total">
					</el-pagination>
				</div>
			</div>
		</div>
		<Dialogue :textContent="textContent" :dialogVisible="dialogVisible" v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
		data() {
			return {
				navtitle:'网点>网点公告',
				tableData: [],
				currentPage: 1,
				total: 0,
				currentId: '',
				dialogVisible: false,
				textContent: '', //提示框文本
				currentId: '',
				id: ''
			};
		},
		methods: {
		
			handleCurrentChange(val) {
				this.getProblormList({pageNo:val});
			},
			handleDelete(index, row) {
				this.currentId = row.id;
				this.dialogVisible = true;
				this.textContent = "确认删除该公告吗？";
				this.title = "提示";
			},
			getProblormList({pageNo=1}={}) {
				this.$get('platformNotice/noticeList', {
					pageNo: pageNo
				}).then(data => {
					this.tableData = data.datas;
					this.total = data.totalCount;
				})
			},
			confirmIsuse() {
				var id = this.currentId;
				this.$post('platformNotice/deleteNotice', {
					id: id
				}).then(data => {
					this.dialogVisible = false;
					this.getProblormList(this.currentPage); //刷新当前页
					this.$ye();
				})
			},
			canceluse() { //关闭
				this.dialogVisible = false;
			}
		},
		mounted() {
			console.log('mounted')
			this.getProblormList();
			this.$sendTitle(this.navtitle);
			
		},		
		components: {
			Dialogue
		}
	}
</script>

<style scoped>
	.contentBox {
		position: relative;
	}
</style>