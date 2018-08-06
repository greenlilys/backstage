<template>
	<div class="flex-wrap flex-vertical">
		
			<el-row class="contentBox">
				<el-col :span="6" :offset="18" style="text-align:right;">
					<router-link to='/Main/Editactive'>
							<el-button type="primary" size="small" class="btnStyle">+&nbsp;新建活动</el-button>
					</router-link>				
				</el-col>
			</el-row>
		
		<div class="flex-con contentBox mt-10 pr">
				<template>
								<el-table :data="tableData" style="width: 100%;">
								
									<el-table-column prop="name" label="活动周期" width="200" align="center">
									</el-table-column>
									<el-table-column prop="name" label="参与活动门店" width="300" align="center">
									</el-table-column>									
									<el-table-column prop="action" label="备注" align="center">
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle">修改</el-button>
											<el-button type="primary" size="mini" class="btnStyle">取消活动</el-button>
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
	</div>
</template>

<script>
	export default {
		data(){
			return{
					 tableData: [{
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            money:50.00,
            action:'查看详情'
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
			Editactive(){
				this.$router.push('/Shopactive/Editactive');
			}
		}
	}
</script>

<style scoped>
	
	
</style>