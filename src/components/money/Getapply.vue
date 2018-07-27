<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<el-row  class="contentBox" type="flex" align="middle">
				<el-col :span="6">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">筛选</el-button>
					</el-input>
				</el-col>				
			</el-row>
			<div class="mainlist flex-con mt-10 bw contentBox">
								<template>
									<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
										<el-table-column prop="date" label="提现申请编号" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="提现账户" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="账户类型" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="钱包余额" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="申请提现时间" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="申请提现金额" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="提现账户" width="" align="center">
										</el-table-column>										
										<el-table-column prop="name" label="操作" width="" align="center">
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
		
		
		
		</div>
	</div>
</template>

<script>
	
	
	export default {
      data(){
			return {
				tableData: [{
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1518 弄',
		            money:'￥52220.00',
		            xinghao:'6020锂电',
		            state:'未缴',
		            number:'13598096785',
		            time:'2016-12-05 14:30'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1517 弄',
		            money:'￥52220.00',
		             xinghao:'6020锂电',
		             state:'未缴',
		              number:'13598096785',
		              time:'2016-12-05 14:30'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1519 弄',
		            money:'￥52220.00',
		             xinghao:'6020锂电',
		             state:'未缴',
		              number:'13598096785',
		              time:'2016-12-05 14:30'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1516 弄',
		            money:'￥52220.00',
		             xinghao:'6020锂电',
		             state:'未缴',
		              number:'13598096785',
		              time:'2016-12-05 14:30'
		          }],
		          currentPage1:1
		        }
			},
      methods:{	    	
	    
	      cellStyle({row, column, rowIndex, columnIndex}){
			    if(columnIndex === 5){ //指定坐标
			        return 'color:#FF6600'
			    }else if(columnIndex === 7){
			        return 'color:#FF6600'
			    }else{
			    	return ''
			    }
			}
      },
      components:{
      
      }
    }
</script>

<style scoped>
	.mainlist{position:relative;}
</style>