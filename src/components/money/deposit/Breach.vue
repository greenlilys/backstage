<template>
	<div class="mt-10">
		<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="username" label="用户账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="names" label="租用电池类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="adddate" label="违约时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="types" label="违约原因" width="" align="center">
									</el-table-column>
									<el-table-column prop="amounts" label="违约扣除押金" width="" align="center">
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
					if(columnIndex === 4){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		  },
	      handleCurrentChange(val) {
			this.defaultList(val,this.begin,this.end);
		  },
	  	  defaultList(pageNo,begin,end){
			var pageNo = pageNo || "";
			var begin = this.begin;
			var end = this.end
			console.log(begin+end)
			this.$get('capital/defaultLog',{
				pageNo: pageNo,
				begin:begin,
				end:end
			}).then(data=>{
				var arr = data.datas;
				for(var i = 0, len = arr.length; i < len; i++) {
					arr[i].names=arr[i].name+"   "+arr[i].groupnum+"组"
					if(arr[i].type==0){
						arr[i].types="逾期"
					}else if(arr[i].type==1){
						arr[i].types="提前退租"
					}else{
						arr[i].types="电池损坏"
					}
					arr[i].amounts="￥"+arr[i].amount
				}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
		  }
		},
		props:['begin','end'],	
		mounted(){
			this.defaultList(1,this.begin,this.end);
		},
		created(){	  	
		  
	 	}
	}
</script>

<style scoped>

</style>