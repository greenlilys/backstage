<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="时间" width="160" align="center">
									</el-table-column>
									<el-table-column prop="name" label="记录类型" width="200" align="center">
									</el-table-column>
									<el-table-column prop="address" label="关联配货订单" align="center">
									</el-table-column>
									<el-table-column prop="money" label="配货内容" align="center">
									</el-table-column>
									<el-table-column prop="money" label="结算单价" align="center">
									</el-table-column>
									<el-table-column prop="money" label="总计金额" align="center">
									</el-table-column>
									<el-table-column prop="money" label="配货成本余额" align="center">
									</el-table-column>
									<el-table-column prop="money" label="经办人" align="center">
									</el-table-column>
									<!--<el-table-column prop="action" label="操作" align="center">
										<template slot-scope="scope">										
											<el-button type="primary" size="small" class="btnStyle">编辑</el-button>										    								         
									    </template>
									</el-table-column>-->
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
            address: '上海市',
            money:50.00
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市',
            money:50.00
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市',
            money:50.00
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市',
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