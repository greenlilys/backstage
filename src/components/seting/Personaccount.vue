<template>
	<div>
		<div class="outsideBox1 flex-wrap flex-vertical">
			<el-row class="contentBox" type="flex" align="middle">
				<el-col :span="6" :offset="18" class="tr">	
					<router-link to='/Main/Creataccount'>
						<el-button type="primary" size="small" class="btnStyle">+&nbsp;创建员工账号</el-button>	
					</router-link>
				</el-col>
			</el-row>
		
			<div class="contentBox mt-10 flex-con bw pr">	
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="用户账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="账号状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="姓名" width="" align="center">
									</el-table-column>
									<el-table-column prop="address" label="手机" width="300" align="center">
									</el-table-column>
									<el-table-column prop="name" label="职务" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="权限" width="" align="center">
									</el-table-column>
								
									<el-table-column prop="action" label="管理" width="250" align="center">
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle" @click="navShopdetail">管理</el-button>
											<el-button type="primary" size="mini" class="btnStyle">禁用</el-button>		         
									    </template>
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
	export default {
		data() {
			return {
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
				radio: '1',
				find: '',
				 currentPage1:1,
			};
		},
		methods: {
		handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      },
	      navCreataccount(){
	      	this.$router.push('/Personaccount/Creataccount');
	      }
	      
		}
	}
</script>

<style scoped>
	
</style>