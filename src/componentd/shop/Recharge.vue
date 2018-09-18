<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="addtime" label="钱包充值时间" width="" align="left">
									</el-table-column>
									<el-table-column prop="amounts" label="充值金额" width="" align="left">
									</el-table-column>
									<el-table-column prop="balances" label="钱包金额" align="left">
									</el-table-column>
									<el-table-column prop="remark" label="充值说明" align="left">
									</el-table-column>								
									<el-table-column prop="nickname" label="经办人" align="left">
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
				cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 1){ //指定坐标
						return 'color:#FF6600'
					}else if(columnIndex === 2){
						return 'color:#FF6600'
					}else{
						return ''
					}
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
					for(var i = 0, len = arr.length; i < len; i++) {
						arr[i].amounts="￥"+arr[i].amount;
						arr[i].balances="￥"+arr[i].balance;
					}
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