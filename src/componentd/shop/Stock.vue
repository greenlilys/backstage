<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addtime" label="补货时间" width="" align="left">
									</el-table-column>
									<el-table-column prop="" label="补货内容" width="" align="left">
										<template slot-scope="scope">						
											<div v-for="item in scope.row.Inventorydistribution">{{item}}</div>
										</template>	
									</el-table-column>
									<el-table-column prop="nickname" label="经办人" width="" align="left">
									</el-table-column>									
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination							     
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
	      
	      handleCurrentChange(val) {
					this.getShopsupplyList(val,this.id)
	        
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
						arr[i].Inventorydistribution=[];
						for(var j = 0,lens=battery.length;j<lens;j++){							
							arr[i].Inventorydistribution.push(battery[j].mode +" "+ battery[j].groupnum+"组");
						}
	    		}
	    		this.tableData = arr;
	    		this.total= Number(data.totalCount);
	    		})
	      },
			},
		props:['id'],
		
    	mounted(){
    	this.getShopsupplyList(1,this.id)
   	 },
  }
</script>

<style>
</style>