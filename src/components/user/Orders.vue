<template>
	<div class="">
		<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="预约编号" width="120" align="center">
									</el-table-column>
									<el-table-column prop="name" label="预约类型" width="160" align="center">
									</el-table-column>
									<el-table-column prop="name" label="预约时间" width="150" align="center">
									</el-table-column>
									<el-table-column prop="address" label="支付金额（积分）" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付方式" width="130" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付订单号" width="130" align="center">
									</el-table-column>
									<el-table-column prop="name" label="完成时间" width="100" align="center">
									</el-table-column>
									<el-table-column prop="name" label="网点编号" width="130" align="center">
									</el-table-column>
									<el-table-column prop="name" label="网点名称" width="150" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle">详情</el-button>	      
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
							      :page-size="8"							    
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

</style>