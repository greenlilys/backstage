<template>
	<div >
		<div class="shopList flex-wrap flex-vertical">	
		
		<el-row class="row" type="flex" align="middle">
			<el-col :span="6">
				账号状态：
				<template>
					<el-radio v-model="radio" label="1">启用</el-radio>
					<el-radio v-model="radio" label="2">禁用</el-radio>					
				</template>
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">筛选</el-button>
					</el-input>
				</div>
			</el-col>

		</el-row>
		
		<div class="listDetail mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="主账号" width="" align="center">
									</el-table-column>									
									<el-table-column prop="name" label="联系人" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="管理团购项目" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="账号创建时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="账号状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">	
												<el-button type="primary" class="btnStyle" size="mini">修改</el-button>
												<el-button type="primary" class="btnStyle" size="mini">停用</el-button>
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
	      }
	     
		}
	}
</script>

<style scoped>
	.shopList {width: 100%;box-sizing: border-box;height:100%;}	
	.row {margin: 0;}
	.row,.listDetail{background: #fff;padding: 10px;}
	.shopList .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>