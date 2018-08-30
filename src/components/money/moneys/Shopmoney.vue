<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="no" label="网点编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="网点名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="网点账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="wallets" label="钱包余额" width="" align="center">
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
			cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 3){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		    },
	    handleCurrentChange(val) {
			this.shopWalletList(val);
		  },
	  	shopWalletList(pageNo){
			var pageNo = pageNo || "";
			this.$get('capital/shopWalletList',{
				pageNo: pageNo
			}).then(data=>{
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						arr[i].wallets="￥"+arr[i].wallet
					}
					this.tableData=arr;
				this.total = Number(data.totalCount);
			});
		  }
		},
		mounted(){
		this.shopWalletList(1);
	  }
	}
</script>

<style scoped>

</style>