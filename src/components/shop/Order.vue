<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="no" label="预约编号" width="200" align="center">
									</el-table-column>
									<el-table-column prop="types" label="预约类型" width="200" align="center">
									</el-table-column>
									<el-table-column prop="finishtime" label="完成时间" align="center">
									</el-table-column>
									<el-table-column prop="costs" label="预约服务分润" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
										<template slot-scope="scope">										
											<el-button type="primary" size="small" class="btnStyle">详情</el-button>										    								         
									    </template>
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
					currentPage1:1,
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
		      this.$get('shopLog/serviceList',{
						pageNo:pageNo,
						id:id
					}).then(data=>{
					var arr = data.datas;
	    		for(var i = 0,len=arr.length;i<len;i++){
						//预约状态
	    			if(arr[i].type == 0){
	    				arr[i].types = "安装"
	    			}else if(arr[i].type == 1){
	    				arr[i].types = "更换"
						}else{
							arr[i].types = "退租"
						}
						arr[i].costs = "¥"+arr[i].cost
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