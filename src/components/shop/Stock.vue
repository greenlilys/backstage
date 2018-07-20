<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="补货时间" width="200" align="center">
									</el-table-column>
									<el-table-column prop="name" label="补货内容" width="300" align="center">
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
	export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎'
            
          }, {
            date: '2016-05-04',
            name: '王小虎'
            
          }, {
            date: '2016-05-01',
            name: '王小虎'
            
          }, {
            date: '2016-05-03',
            name: '王小虎'
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

<style>
</style>