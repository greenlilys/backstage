<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="预约编号" width="200" align="center">
									</el-table-column>
									<el-table-column prop="name" label="预约类型" width="200" align="center">
									</el-table-column>
									<el-table-column prop="address" label="完成时间" align="center">
									</el-table-column>
									<el-table-column prop="money" label="预约服务分润" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
										<template slot-scope="scope">										
											<el-button type="primary" size="small" class="btnStyle">编辑</el-button>										    								         
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
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            money:50.00,
            action:'查看详情'
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