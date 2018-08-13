<template>
	<div class="mt-10">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addtime" label="钱包充值时间" width="160" align="center">
									</el-table-column>
									<el-table-column prop="amount" label="充值金额" width="" align="center">
									</el-table-column>
									<el-table-column prop="balance" label="钱包金额" align="center">
									</el-table-column>
									<el-table-column prop="remark" label="充值说明" align="center">
									</el-table-column>								
									<el-table-column prop="nickname" label="经办人" align="center">
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
	export default {
      data() {
        return {
          tableData: [],
					currentPage:1,
					total:0,
      }
      },
      methods:{
	      handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
					this.getShopServiceList(val,this.id)
	        //console.log(`当前页: ${val}`);
				},
				getShopServiceList(pageNo,id){
					var id=this.id;
		      this.$get('shopLog/rechargeList',{
						pageNo:pageNo,
						id:id
					}).then(data=>{
					var arr = data.datas;
	    		this.tableData = arr;
	    		this.total= Number(data.totalCount);
	    		})
	      },
			},
			props:['id'],
			ceeated(){
    	},
    	mounted(){
    	this.getShopServiceList(1,this.id)
   	 },
  }
</script>
<style>
</style>