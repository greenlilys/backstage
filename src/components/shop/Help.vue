<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="救援用户" width="200" align="center">
									</el-table-column>
									<el-table-column prop="name" label="用户下单时间" width="200" align="center">
									</el-table-column>
									<el-table-column prop="name" label="距离" width="100" align="center">
									</el-table-column>
									<el-table-column prop="money" label="交通费" align="center">
									</el-table-column>
									<el-table-column prop="money" label="支付方式" align="center">
									</el-table-column>
									<el-table-column prop="money" label="支付状态" align="center">
									</el-table-column>
									<el-table-column prop="money" label="故障类型" align="center">
									</el-table-column>
									<el-table-column prop="money" label="平台救援分润" align="center">
									</el-table-column>
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage"
							      :page-size="10"							    
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
          tableData: [],
          currentPage:1,
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

<style scoped>
</style>