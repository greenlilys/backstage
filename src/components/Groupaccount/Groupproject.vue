<template>
	<div >
		<div class="shopList flex-wrap flex-vertical">	
		
		<el-row class="row" type="flex" align="middle">
			<el-col :span="7">
				 <span class="font-14">账号状态：</span>
				<template>
					<el-radio-group v-model="radio1"  @change = "handleRadio1">
						<el-radio  label="1">全部</el-radio>
						<el-radio  label="1">正在使用</el-radio>
						<el-radio  label="2">已停用</el-radio>	
					</el-radio-group>
				</template>
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">筛选</el-button>
					</el-input>
				</div>
			</el-col>

			<el-col :span="6" :offset="5" style="text-align:right;">
				<router-link to='/Main/Addgroupproject'>
					<el-button type="success" size="small">+&nbsp;添加团购项目</el-button>
				</router-link>			
				
			</el-col>
		</el-row>
		
		<div class="listDetail mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="项目名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="主账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="联系人" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="子账号数量" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="租用电池类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="子账号押金" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="创建时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="项目状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">	
									    	<router-link to='/Main/Groupprojectdetail'>
												<el-button type="warning" class="btnStyle" size="mini">详情</el-button>
											</router-link>	
												
										      
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
	      },
	      navAddgroupproject(){
	      	this.$router.push('/Groupproject/Addgroupproject')
	      },
	  
	      navGroupprojectdetail(){
	      	this.$router.push('/Groupproject/Groupprojectdetail')
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