<template>
	<div >
		<div class="shopList flex-wrap flex-vertical">	
		
		<el-row class="row" type="flex" align="middle">
			<el-col :span="7">
				预约类型：
				
					 <el-radio-group v-model="radio" @change="handleChange">
						<el-radio  label="1">安装预约</el-radio>
						<el-radio  label="2">换电预约</el-radio>
						<el-radio  label="3">退电预约</el-radio>
					</el-radio-group>
				
			</el-col>
			<el-col :span="6">	
				商品状态：
				<el-radio-group v-model="radio1" @change="handleChange1">
					<el-radio  label="1">已完成</el-radio>
					<el-radio  label="2">已取消</el-radio>
				</el-radio-group>
			</el-col>
			<el-col :span="6" :offset="5">
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
									<el-table-column prop="date" label="预约编号" width="" align="center">
									</el-table-column>									
									<el-table-column prop="name" label="预约类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="预约用户" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付方式" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付金额（积分）" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="预约状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="完成/撤销时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="网点编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="网点名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="" label="操作" align="center">
									    <template slot-scope="scope">
									    	<router-link to='/Main/Replacedetail'>
												<el-button type="primary" class="btnStyle" size="mini">详情</el-button>
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
				radio1: '1',
				find: '',
				 currentPage1:1,
				 checkList:['已完成']
			
			};
		},
		methods: {
			 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      },
	     
	  
	      navdetail(){
	      	if(this.radio == 1){
	      		this.$router.push('/Meetlist/Installdetail')
	      	}else if(this.radio == 2){
	      		this.$router.push('/Meetlist/Changedetail')
	      	}else{
	      		this.$router.push('/Meetlist/Throwdetail')
	      	}
	      	
	      },
	      handleChange(value){
	      },
	      handleChange1(value){
	      	console.log(value)
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