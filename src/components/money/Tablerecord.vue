<template>
	<div>
			<div class="outsideBox">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>				
				
				<el-row  class="contentBox" type="flex" align="middle">
				<el-col :span="6" :offset="18">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">筛选</el-button>
					</el-input>
				</el-col>				
				</el-row>
						
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="用户账户" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付订单号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付金额" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="订单类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="支付时间" width="" align="center">
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
</template>

<script>
	
	export default {
      data(){
			return {
				tabItem:['平台钱包操作记录','平台天牛币记录'],
	        	currentI:'0',
	        	tableData: [{
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1518 弄',
		            money:'￥52220.00',
		            xinghao:'6020锂电',
		            state:'未缴',
		            number:'13598096785',
		            time:'2016-12-05 14:30'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1517 弄',
		            money:'￥52220.00',
		             xinghao:'6020锂电',
		             state:'未缴',
		              number:'13598096785',
		              time:'2016-12-05 14:30'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1519 弄',
		            money:'￥52220.00',
		             xinghao:'6020锂电',
		             state:'未缴',
		              number:'13598096785',
		              time:'2016-12-05 14:30'
		          }, {
		            date: '2016',
		            name: '王小虎',
		            address: '上海市普陀区金沙江路 1516 弄',
		            money:'￥52220.00',
		             xinghao:'6020锂电',
		             state:'未缴',
		              number:'13598096785',
		              time:'2016-12-05 14:30'
		          }],
		          currentPage1:1,
		          find:''
		        }
			},
      methods:{	    	
	    changeItem(v,i){
	      	this.currentI = i;
	      	
	      }
	     
      },
      components:{
      	
      }
    }
</script>

<style scoped>
	.outsideBox{position:relative;}
</style>