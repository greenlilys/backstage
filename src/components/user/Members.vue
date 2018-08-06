<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="nickname" label="会员名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="会员账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="addtime" label="关联时间" width="" align="center">
									</el-table-column>
									
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage1"
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="totalCount">
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
		        currentPage1:1,
		        totalCount:10
			}
		},
		methods:{
			 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	      	let id = this.id;
	        this.getMemberList(id,val);
	      },
	      getMemberList(id,pageNo){
	      	  this.$get('customerLog/memberList',{
					id:id,
					pageNo:	pageNo				
				}).then(data=>{					
					this.tableData = data.datas;
					this.totalCount = data.totalCount;
				})
	      }
		},
		props:['id'],
		mounted(){
			this.getMemberList(this.id,1);
		}
	}
</script>

<style scoped>

</style>