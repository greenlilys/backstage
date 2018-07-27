<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<div class="contentBox">
				<h1 class="font-18 tc mt-10">保证金总计</h1>
				<p class="font-20 fontYellow tc mt-10">￥<span>86502.20</span></p>
			</div>
			<div class="mainlist flex-con mt-10 bw contentBox">
								<template>
									<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
										<el-table-column prop="date" label="网点编号" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="网点名称" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="网点账号" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="保证金" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="付款时间" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="支付方式" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="支付订单号" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="加盟有效期" width="" align="center">
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
	      },
	      cellStyle({row, column, rowIndex, columnIndex}){
			    if(columnIndex === 8){ //指定坐标
			        return 'color:#FF6600'
			    }else{
			        return ''
			    }
			}
		}
	}
</script>

<style scoped>
	.mainlist{position:relative;}
</style>