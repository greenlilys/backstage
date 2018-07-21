<template>
	<div>
		<div class="businessSetting">
							<div class="headTitle font-18 fontYellow">运营商等级设置</div>
							<template>
								<el-table :data="tableData" style="width: 40%;">
									<el-table-column prop="leval" label="运营商等级" width='130' align="center">
									</el-table-column>
									<el-table-column prop="money" label="代理费用" width="140" align="center">
									</el-table-column>
									<el-table-column prop="money" label="网点营收分润" width="150" align="center">
									</el-table-column>
									
									<el-table-column prop="action" label="操作" width="220" align="center">
										
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle">编辑</el-button>	
											<el-button type="primary" size="mini" class="btnStyle">删除</el-button>	       
									    </template>
									</el-table-column>
								</el-table>
							</template>
							<el-row class="mt-10">
								<el-button type="success" class="btnStyle" @click="submitForm('ruleForm2')">+&nbsp;添加运营商级别</el-button>
							</el-row>
							
							
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
		            leval:'查看详情'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1517 弄',
		            money:50.00,
		            leval:'查看详情'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1519 弄',
		            money:50.00,
		            leval:'查看详情'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1516 弄',
		            money:50.00,
		            leval:'查看详情'
		          }]
				
			};
		},
		methods: {
			
		}
	}
</script>

<style>
.businessSetting{background:#fff;padding:10px 20px;height:100%;}
.headTitle{line-height: 40px;}
</style>