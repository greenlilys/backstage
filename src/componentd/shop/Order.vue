<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;"  :cell-style="cellStyle">
									<el-table-column prop="no" label="预约编号" width="" align="left">
									</el-table-column>
									<el-table-column prop="types" label="预约类型" width="" align="left">
									</el-table-column>
									<el-table-column prop="finishtime" label="完成时间" align="left">
									</el-table-column>
									<el-table-column prop="costs" label="预约服务分润" align="left">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="left">
										<template slot-scope="scope">
											<router-link :to="{path:'/Main/Meetdetail',query:{id:scope.row.id}}">
												<el-button type="warning" class="btnStyle" size="mini">详情</el-button>
											</router-link>											
									    </template>
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
							      :total="total">
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
				total: 0,
			}
		},
		methods: {
			
			cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 3){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		 	},
			handleCurrentChange(val) {
				this.getShopServiceList(val, this.id);				
			},
			getShopServiceList(pageNo, id) {
				var id = this.id;
				this.$get('shopLog/serviceList', {
					pageNo: pageNo,
					id: id
				}).then(data => {
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						//预约状态
						if(arr[i].type == 0) {
							arr[i].types = "安装"
						} else if(arr[i].type == 1) {
							arr[i].types = "更换"
						} else {
							arr[i].types = "退租"
						}
						if(arr[i].paymode == 3){
							arr[i].costs=arr[i].cost;
						}else{
							arr[i].costs="￥"+arr[i].cost;
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
			if(this.id){
				this.getShopServiceList(1, this.id);
			}			
		},
		watch:{
			id:function(newVal,oldVal){
				console.log(newVal);
				if(newVal){this.getShopServiceList(1,newVal);}else{
					this.$message({
						type:'error',
						message:'id没有获取'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.el-table th{border-top:none;}	
</style>