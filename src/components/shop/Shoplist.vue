<template>
	<div>
		
	
	<div class="outsideBox1 flex-wrap flex-vertical">
		<el-row class="contentBox" type="flex" align="middle">
			<el-col :span="6">
				上线状态：
				<template>
					<el-radio v-model="radio" label="1">已上线</el-radio>
					<el-radio v-model="radio" label="2">未上线</el-radio>					
				</template>
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">搜索</el-button>
					</el-input>
				</div>
			</el-col>

			<el-col :span="6" :offset="6" style="text-align:right;">	
				<el-button type="primary" size="medium" class="btnStyle" @click="navAddshop">+&nbsp;添加网点</el-button>
				
			</el-col>
		</el-row>
		
		<div class="contentBox mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="店铺编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="店铺名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="店铺账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="address" label="店铺地址" width="300" align="center">
									</el-table-column>
									<el-table-column prop="name" label="所属运营商" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="库存/配货" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="保证金" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="上线状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" width="250" align="center">
										
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle" @click="navShopdetail">详情</el-button>							    								         
																		
											<el-button type="primary" size="mini" class="btnStyle">禁用</el-button>										    								         
									 										
											<el-button type="primary" size="mini" class="btnStyle">网点下线</el-button>										    								         
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
	      navAddshop(){
	      	this.$router.push('/Shoplist/Addshop');
	      },
	      navShopdetail(){
	      	this.$router.push('/Shoplist/Shopdetail');
	      }
		}
	}
</script>

<style scoped>
	.contentBox{position:relative;}
</style>