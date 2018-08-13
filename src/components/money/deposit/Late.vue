<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="username" label="用户账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="adddate" label="开始逾期日期" width="" align="center">
									</el-table-column>
									<el-table-column prop="deposit" label="滞纳金" width="" align="center">
									</el-table-column>
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
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
		export default{
			data(){
				return {
					tableData: [],
					currentPage:1,
					total:0
				}
			},
			methods:{
				handleSizeChange(val) {
						console.log(`每页 ${val} 条`);
					},
				handleCurrentChange(val) {
				this.depositList(val,12,this.begin,this.end);
				},
					depositList(pageNo){
				var pageNo = pageNo || "";
				this.$get('capital/depositPay',{
					pageNo: pageNo,
					category : 12,
					begin:this.begin,
					end:this.end
				}).then(data=>{
					var arr = data.datas;
					this.tableData=arr;
					this.total = Number(data.totalCount);
				});
				}
			},
			props:['begin','end'],
			mounted(){
			this.depositList(1,12,this.begin,this.end);
				}
		}
</script>

<style scoped>

</style>