<template>
	<div class="flex-wrap flex-vertical">		
			
			<el-row type="flex" align="middle" class="rowHead">
					<el-col :span="6">
						<div>
							<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
								<el-button slot="append" icon="el-icon-search">搜索</el-button>
							</el-input>
						</div>
					</el-col>
				
				
				
				<el-col :span="8" :offset="10" style="text-align:right;">
					<el-button type="success" size="medium" class="btnStyle">增加租期</el-button>
					<el-button type="success" size="medium" class="btnStyle">扣减租期</el-button>
					<el-button type="success" size="medium" class="btnStyle">批量增加租期</el-button>
					<el-button type="success" size="medium" class="btnStyle">群发短信</el-button>
				</el-col>
			</el-row>
			
			<el-row type="flex" align="middle" class="rowHead mt-10" >
					<el-col :span="4">
					押金状态：
					<template>
						<el-radio v-model="radio1" label="1">未缴</el-radio>
						<el-radio v-model="radio1" label="2">已缴</el-radio>					
					</template>
				</el-col>
				
				<el-col :span="4">
					租期状态：
					<template>
						<el-radio v-model="radio2" label="1">租期中</el-radio>
						<el-radio v-model="radio2" label="2">已逾期</el-radio>					
					</template>
				</el-col>
				<el-col :span="4" :offset="12" style="text-align:right;">
					<el-button type="info" size="small">导出excel</el-button>				
				</el-col>
			</el-row>
			
			<el-row class="rowBottom flex-con">
				<el-col>
					<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="number" label="用户账号" width="110" align="center">
									</el-table-column>
									<el-table-column prop="name" label="用户昵称" width="90" align="center">
									</el-table-column>
									<el-table-column prop="time" label="注册时间" width="150" align="center">
									</el-table-column>
									<el-table-column prop="address" label="所在区域" width="240" align="center">
									</el-table-column>
									<el-table-column prop="state" label="押金状态" width="80" align="center">
									</el-table-column>
									<el-table-column prop="money" label="押金金额" width="100" align="center">
									</el-table-column>
									<el-table-column prop="xinghao" label="电池型号" width="100" align="center">
									</el-table-column>
									<el-table-column prop="name" label="安装状态" width="80" align="center">
									</el-table-column>
									<el-table-column prop="time" label="租期" width="150" align="center">
									</el-table-column>
									<el-table-column prop="money" label="钱包余额" width="100" align="center">
									</el-table-column>
									<el-table-column prop="money" label="天牛币余额" width="100" align="center">
									</el-table-column>
									<el-table-column prop="name" label="账户状态" width="80" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle" @click="navUserdetail">详情</el-button>	
											<el-button type="primary" size="mini" class="btnStyle">禁用</el-button>		         
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
				</el-col>
			</el-row>
		
	</div>
</template>
<script>
	export default {
    name: '',
    data(){
      return{
          radio1:'1',
          radio2:'1',
          find:'',
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
	      navUserdetail(){
	      	this.$router.push('/Userlist/Userdetail');
	      }
    },
    components:{
    	
    }
  }

</script>
<style scope>
.rowHead{padding:0px 20px;background:#fff;height:60px;}
.rowBottom{position:relative;background:#fff;}
 
.rowBottom .el-table .cell, .rowBottom .el-table th div, .rowBottom .el-table--border td:first-child .cell, .rowBottom .el-table--border th:first-child .cell{padding:0;}
</style>