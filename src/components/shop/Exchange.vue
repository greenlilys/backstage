<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addtime" label="回收记录时间" width="160" align="center">
									</el-table-column>
									<el-table-column prop="Inventorydistribution" label="回收内容" width="" align="center">
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
							      :current-page.sync="currentPage1"
							      :page-size="8"							    
							      layout="total, prev, pager, next"
							      :total="100">
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
		      this.$get('shopLog/recoveryList',{
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
    	this.getShopServiceList(1,this.id)
   	 },
  }
</script>

<style>
</style>