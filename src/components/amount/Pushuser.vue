<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<el-row class="contentBox" type="flex" align="middle">
				<el-col :span="8">
					 <div class="block">
					    <span class="demonstration">选择时段：&nbsp;</span>
					    {{value6}}
					    <el-date-picker
					      v-model="value6"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					  </div>
				</el-col>
				<el-col :span="1">
					<el-button type="primary" size="medium" class="btnStyle">查询</el-button>		
				</el-col>
			</el-row>
			
			<div class="botBox flex-con contentBox mt-10">
				<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="用户账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="注册时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="押金状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="天牛币余额" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="推荐人数" width="" align="center">
									</el-table-column>				
								</el-table>
							
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
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
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
		          currentPage1:1,
		          value6:''
			}
		},
		methods:{
			handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      }
		}
	}
</script>

<style scoped>
	.numBox>div{padding:20px;}
	.numBox>div:nth-child(1),.numBox>div:nth-child(2){margin-right:10px;}
	.botBox{position:relative;}
</style>