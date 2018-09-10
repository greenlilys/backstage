<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="nickname" label="会员名称" width="160" align="center">
									</el-table-column>
									<el-table-column prop="username" label="会员账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="addtime" label="下单时间" align="center">
									</el-table-column>
									<el-table-column prop="refereeinte" label="获得返利" align="center">
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
					if(columnIndex === 3){ //指定坐标
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
		      this.$get('shopLog/memberList',{
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