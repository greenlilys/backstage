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
				total:0,
				begin:'',
				end:''
			}
		},
		methods:{		  
		  cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 4){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		  },
	      handleCurrentChange(val) {
			this.defaultList({pageNo:val});
		  },
	  	  defaultList({pageNo=1,begin=this.begin,end=this.end}={}){
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
		props:['valueTime'],	
		mounted(){
			this.defaultList();
		},
		watch: {
			valueTime(newVal, oldVal) {
				if(newVal) {
					this.defaultList({
						begin: newVal[0],
						end: newVal[1]
					});
					this.currentPage = 1;
					this.begin = newVal[0];
					this.end = newVal[1];
				}
			}
		}
		
	}
</script>

<style scoped>

</style>