<template>
	<div class="mt-10">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addtime" label="时间" width="160" align="center">
									</el-table-column>
									<el-table-column prop="types" label="记录类型" width="80" align="center">
									</el-table-column>
									<el-table-column prop="pickno" label="关联配货订单" align="center">
									</el-table-column>
									<el-table-column prop="Inventorydistribution" label="配货内容" width="95" align="center">
									</el-table-column>
									<el-table-column prop="pickprices" label="结算单价" width="100"  align="center">
									</el-table-column>
									<el-table-column prop="picktotals" label="总计金额" align="center">
									</el-table-column>
									<el-table-column prop="costdistributes" label="配货成本余额" align="center">
									</el-table-column>
									<el-table-column prop="nickname" label="经办人"  align="center">
									</el-table-column>
									<!--<el-table-column prop="action" label="操作" align="center">
										<template slot-scope="scope">										
											<el-button type="primary" size="small" class="btnStyle">编辑</el-button>										    								         
									    </template>
									</el-table-column>-->
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
					this.getShoppickList(val,this.id)
	        //console.log(`当前页: ${val}`);
				},
				getShoppickList(pageNo,id){
					var id=this.id;
		      this.$get('shopLog/pickList',{
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
						arr[i].pickprices="";
						for(var j = 0,lens=battery.length;j<lens;j++){
							arr[i].pickprices+="￥"+battery[j].pickprice+"元/组"
						}
						if(arr[i].type==0){
							arr[i].types="加盟配货";
						}else if(arr[i].type==1){
								arr[i].types="增加配货";
						}else{
							arr[i].types="减少配货";
						}
						arr[i].picktotals="￥"+arr[i].picktotal;
						arr[i].costdistributes="￥"+arr[i].costdistribute;
						
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
    	this.getShoppickList(1,this.id)
   	 },
  }
</script>

<style>
</style>