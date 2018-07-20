<template>
	<div class="shopList flex-wrap flex-vertical">
		<el-row class="row joinshop" type="flex" align="middle">
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

			<el-col :span="6" :offset="6" style="text-align:right;">				
				<button type="button" class="btn btnStyle" @click="navAddbusiness">
				  <span class="glyphicon glyphicon-plus"></span>  &nbsp;添加运营商
				</button>
			</el-col>
		</el-row>
		
		<div class="listDetail mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="运营商编号" width="150" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商名称" width="160" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商等级" width="130" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商账号" width="130" align="center">
									</el-table-column>
									<el-table-column prop="name" label="联系人/联系电话" width="130" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营网点" width="100" align="center">
									</el-table-column>
									<el-table-column prop="name" label="合约经营周期" width="150" align="center">
									</el-table-column>
									<el-table-column prop="name" label="账户状态" width="130" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle" @click="navBusinessdetail">详情</el-button>	
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
	      navAddbusiness(){
	      	this.$router.push('/Businesslist/Addbusiness');
	      },
	      navBusinessdetail(){
	      	this.$router.push('/Businesslist/Businessdetail')
	      }
	     
		}
	}
</script>

<style scoped>
	.shopList {width: 100%;box-sizing: border-box;}	
	.joinshop {	background: #fff;padding: 10px 20px;}	
	.row {margin: 0;}
	.joinshop .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>