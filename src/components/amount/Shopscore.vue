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
			
			<div class="flex-wrap flex-horizontal mt-10 numBox">
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">545</h1>
					<p class="font-16 tc mt-10">安装预约合计</p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">21450</h1>
					<p class="font-16 tc mt-10">换电预约合计</p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">168</h1>
					<p class="font-16 tc mt-10">退电预约合计</p>
				</div>
			</div>
			
			<el-row type="flex" align="middle" class="contentBox mt-10"> 
				<el-col :span="6">
					<div class="font-14">数据明细：（2017-03-01至2017-03-08）</div>
				</el-col>
				<el-col :span="6" :offset="12" class="tr">
					<el-button type="primary" size="mini" class="btnStyle">导出当前数据</el-button>
				</el-col>
			</el-row>
			
			<div class="botBox flex-con contentBox">
				<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="网点编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="网点名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="安装预约" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="换电预约" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="退电预约" width="" align="center">
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