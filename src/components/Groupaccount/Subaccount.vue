<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="用户账户" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="起租时间（添加子帐号）" width="200" align="center">
									</el-table-column>
									<el-table-column prop="address" label="电池型号" align="center">
									</el-table-column>
									<el-table-column prop="money" label="押金金额" align="center">
									</el-table-column>	
									<el-table-column prop="money" label="滞纳金" align="center">
									</el-table-column>	
									<el-table-column prop="money" label="租期状态" align="center">
									</el-table-column>
									<el-table-column prop="money" label="租期" align="center">
									</el-table-column>
									<el-table-column prop="money" label="钱包余额" align="center">
									</el-table-column>
									<el-table-column prop="money" label="天牛币余额" align="center">
									</el-table-column>
									<el-table-column prop="money" label="账户状态" align="center">
									</el-table-column>
									<el-table-column prop="money" label="操作" width="200" align="center">
										 <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle" @click="">详情</el-button>							    								         
											<el-button type="primary" size="mini" class="btnStyle">退租</el-button>	
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
	export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            money:50.00
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            money:50.00
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            money:50.00
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            money:50.00
          }],
          currentPage1:1,
          activeName2: 'first'
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

<style>
</style>