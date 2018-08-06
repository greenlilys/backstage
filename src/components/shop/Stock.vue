<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addtime" label="补货时间" width="200" align="center">
									</el-table-column>
									<el-table-column prop="Inventorydistribution" label="补货内容" width="300" align="center">
									</el-table-column>
									<el-table-column prop="nickname" label="经办人" width="" align="center">
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
					this.getShopsupplyList(val,this.id)
	        //console.log(`当前页: ${val}`);
				},
				getShopsupplyList(pageNo,id){
					var id=this.id;
		      this.$get('shopLog/supplyList',{
						pageNo:pageNo,
						id:id
					}).then(data=>{
					var arr = data.datas;
	    		for(var i = 0,len=arr.length;i<len;i++){
	    		
						//电池库存/配货
						var battery = arr[i].batteryList;
						arr[i].Inventorydistribution="";
						for(var j = 0,lens=battery.length;j<lens;j++){
							arr[i].Inventorydistribution += '\n';
							arr[i].Inventorydistribution+= battery[j].mode +"          "+ battery[j].groupnum+"组";
						}
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
    	this.getShopsupplyList(1,this.id)
   	 },
  }
</script>

<style>
</style>