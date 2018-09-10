<template>
	<div>
		<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="addTime" label="积分变动时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="categorys" label="变动类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="integral" label="天牛币变动" width="" align="center">
									</el-table-column>
									<el-table-column prop="margin" label="天牛币余额" width="" align="center">
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
							      :total="100">
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
		        currentPage1:1,
		        totalCount:10
			}
		},
		methods:{
			 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
		  },
		  cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 2){ //指定坐标
						return 'color:#FF6600'
					}else if(columnIndex === 3){
						return 'color:#FF6600'
					}else{
						return ''
					}
		  },
	      handleCurrentChange(val) {
	      	let id = this.id;
	        this.getIntegralList(id,val);
	      },
	      getIntegralList(id,pageNo){
	      	  this.$get('customerLog/integralList',{
					id:id,
					pageNo:pageNo					
				}).then(data=>{
					let tableData = data.datas;
					this.tableData = tableData;
					this.totalCount = data.totalCount;
					for(let i = 0,len = tableData.length;i<len;i++){
						switch (tableData[i].category){
							case 0:
							tableData[i].categorys = "租金退还"
							break;
							case 1:
							tableData[i].categorys = "换电费退还"
							break;
							case 2:
							tableData[i].categorys = "活动赠送"
							break;
							case 3:
							tableData[i].categorys = "推荐会员"
							break;
							case 4:
							tableData[i].categorys = "评价赠送"
							break;
							case 5:
							tableData[i].categorys = "后台充值"
							break;
							case 8:
							tableData[i].categorys = "用户充值"
							break;
							case 7:
							tableData[i].categorys = "续租奖励"
							break;
							case 10:
							tableData[i].categorys = "订单付款"
							break;
							case 11:
							tableData[i].categorys = "租金支付"
							break;
							case 12:
							tableData[i].categorys = "换电费支付"
							break;
							case 13:
							tableData[i].categorys = "充值奖励"
							break;
							case 14:
							tableData[i].categorys = "平台扣款"
							break;
							default:
							tableData[i].categorys = "--"
							
						}
					}
				})
	      }
		},
		props:['id'],
		mounted(){
			this.getIntegralList(this.id,1);
		}
	}
</script>

<style scoped>

</style>