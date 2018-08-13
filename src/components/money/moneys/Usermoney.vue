<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="username" label="用户" width="" align="center">
									</el-table-column>
									<el-table-column prop="wallet" label="钱包余额" width="" align="center">
									</el-table-column>
									<el-table-column prop="integral" label="天牛币余额" width="" align="center">
									</el-table-column>		
									<el-table-column prop="" label="操作" align="center">
									    <template slot-scope="scope">										
												<router-link :to="{path:'/Main/Userdetail',query:{id:scope.row.id}}">
														<el-button type="warning" size="mini" class="btnStyle">查看明细</el-button>
												</router-link>
									    </template>
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
			this.cusWalletList(val);
		  },
	  	cusWalletList(pageNo){
			var pageNo = pageNo || "";
			this.$get('capital/cusWalletList',{
				pageNo: pageNo
			}).then(data=>{
				this.tableData = data.datas;
				this.total = Number(data.totalCount);
			});
		  }
		},
		mounted(){
		this.cusWalletList(1);
	  }
	}
</script>

<style scoped>

</style>