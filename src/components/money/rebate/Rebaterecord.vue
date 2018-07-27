<template>
	<div class="">
		<el-row  class="contentBox" type="flex" align="middle">
				<el-col :span="6" :offset="18">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">筛选</el-button>
					</el-input>
				</el-col>				
		</el-row>
		<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="结算时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="结算项" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="结算金额" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="结算方式" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="结算账户" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="订单号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="经办人" width="" align="center">
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
		          currentPage1:1,
		          find:''
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