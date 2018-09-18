<template>
	<div >
		<div class="shopList flex-wrap flex-vertical">		
			<el-row class="row" type="flex" align="middle">
				<el-col :span="11">
					<span class="font-14">预约类型：</span>				
						 <el-radio-group v-model="radio1" @change="handleChange">
						 	<el-radio  label="">全部</el-radio>
							<el-radio  label="0">安装预约</el-radio>
							<el-radio  label="1">换电预约</el-radio>
							<el-radio  label="2">退电预约</el-radio>
							<el-radio  label="3">提车预约</el-radio>
							<el-radio  label="4">退车预约</el-radio>
						</el-radio-group>				
				</el-col>
				<el-col :span="5">	
					<span class="font-14">预约状态：</span>
					<el-radio-group v-model="radio2" @change="handleChange1">
						<el-radio  label="">全部</el-radio>
						<el-radio  label="1">已完成</el-radio>
						<el-radio  label="3">已取消</el-radio>
					</el-radio-group>
				</el-col>
				<el-col :span="6" :offset="3">
					<div>
						<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable @keyup.enter.native='search'>
							<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
						</el-input>
					</div>
				</el-col>
			</el-row>
		<div class="listDetail mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="no" label="预约编号" width="" align="left">
									</el-table-column>									
									<el-table-column prop="types" label="预约类型" width="" align="left">
									</el-table-column>
									<el-table-column prop="username" label="预约用户" width="" align="left">
									</el-table-column>
									<el-table-column prop="paymodes" label="支付方式" width="" align="left">
									</el-table-column>
									<el-table-column prop="costs" label="支付金额（积分）" width="" align="left">
									</el-table-column>
									<el-table-column prop="states" label="预约状态" width="" align="left">
									</el-table-column>
									<el-table-column prop="finishtime" label="完成/撤销时间" width="" align="left">
									</el-table-column>
									<el-table-column prop="shopno" label="网点编号" width="" align="left">
									</el-table-column>
									<el-table-column prop="name" label="网点名称" width="" align="left">
									</el-table-column>
									<el-table-column prop="" label="操作" align="left">
									    <template slot-scope="scope">
									    	<router-link :to="{path:'/Main/Meetdetail',query:{id:scope.row.id}}">
												<el-button type="warning" class="btnStyle" size="mini">详情</el-button>
											</router-link>											
									    </template>
									</el-table-column>
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination							      
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage"
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="totalCount">
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
				navtitle:'预约>预约列表',
				tableData: [],
				totalCount: 10,
				radio1: "",
				radio2: "",
				find: '',
				currentPage: 1
				

			};
		},
		methods: {
			
			handleCurrentChange(val) {
				this.getSelectList(this.find,this.radio1,this.radio2,val);
			},
			cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 4){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		 	},
		
			handleChange(value) {//预约类型查询				
				this.getSelectList(this.find,value,this.radio2,1);
				this.currentPage = 1;
			},
			handleChange1(value) {//预约状态查询
				this.getSelectList(this.find,this.radio1,value,1);
				this.currentPage = 1;
			},
			getSelectList(nickName,type,state,pageNo){
				this.$get('appointOrder/selectList',{
					nickName:nickName,
					type:type,
					state:state,
					pageNo:pageNo
				}).then(data=>{
					var tableData = data.datas;
					this.totalCount = data.totalCount;
					this.tableData = tableData;
					for(var i = 0,len=tableData.length;i<len;i++){
						switch(tableData[i].type){
							case 0:
							tableData[i].types = "安装预约"
							break;
							case 1:
							tableData[i].types = "更换预约"
							break;
							case 2:
							tableData[i].types = "退租预约"
							break;
							case 3:
							tableData[i].types = "提车预约"
							break;
							case 4:
							tableData[i].types = "退车预约"
							break;
							default:
							tableData[i].types = "--"
							
						}
						switch(tableData[i].paymode){
							case 0:
							tableData[i].paymodes = "支付宝"
							break;
							case 1:
							tableData[i].paymodes = "微信"
							break;
							case 2:
							tableData[i].paymodes = "钱包支付"
							break;
							case 3:
							tableData[i].paymodes = "天牛币支付"
							break;
							default:
							tableData[i].paymodes = "--"
							
						}
						if(tableData[i].paymode == 3){
							tableData[i].costs=tableData[i].cost;
						}else{
							tableData[i].costs="￥"+tableData[i].cost;
						}
						
						switch(tableData[i].state){
							case 0:
							tableData[i].states = "预约中"
							break;
							case 1:
							tableData[i].states = "处理成功"
							break;
							case 2:
							tableData[i].states = "过期"
							break;
							case 3:
							tableData[i].states = "已取消"
							break;
							case 4:
							tableData[i].states = "型号不符"
							break;
							case 5:
							tableData[i].states = "电池报损处理中"
							break;
							case 6:
							tableData[i].states = "电池已损坏"
							break;
							case 99:
							tableData[i].states = "支付中"
							break;
							default:
							tableData[i].states = "--"
							
						}
					}
				})
			},
			search(){
				this.getSelectList(this.find,this.radio1,this.radio2,1);
				this.currentPage = 1;
				
			}

		},
		mounted(){
			this.getSelectList(this.find,this.radio1,this.radio2,1);
			this.$sendTitle(this.navtitle);
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