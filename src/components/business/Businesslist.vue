<template>
	<div>
		<div class="shopList flex-wrap flex-vertical">
		<el-row class="row" type="flex" align="middle">
			<el-col :span="5">
				<span class="font-14">账号状态：</span>
				<template>
					<el-radio-group v-model="radio1"  @change = "handleRadio">
						<el-radio  label="">全部</el-radio>
						<el-radio label="0">启用</el-radio>
						<el-radio  label="1">禁用</el-radio>	
					</el-radio-group>
				</template>
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="search" clearable>筛选</el-button>
					</el-input>
				</div>
			</el-col>

			<el-col :span="6" :offset="7" style="text-align:right;">
				<router-link to='/Main/Addbusiness'>
					<el-button type="success" size="small">+&nbsp;添加运营商</el-button>
					
				</router-link>
				
			</el-col>
		</el-row>
		
		<div class="listDetail mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="no" label="运营商编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="levelName" label="运营商等级" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="运营商账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="contactname" label="联系人" width="" align="center">
									</el-table-column>
									<el-table-column prop="contactcellphone" label="联系电话" width="" align="center">
									</el-table-column>
									<el-table-column prop="shopCount" label="运营网点" width="" align="center">
									</el-table-column>
									<el-table-column prop="signtimebegin" label="合约经营开始时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="signtimeend" label="合约经营结束时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="statusd" label="账户状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">	
									    	<router-link :to="{path:'/Main/Businessdetail',query:{id:scope.row.id}}">
												<el-button type="warning" size="mini" class="btnStyle">详情</el-button>												
											</router-link>												
											<el-button type="warning" size="mini" class="btnStyle">禁用</el-button>	        
									    </template>
									</el-table-column>
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
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
				 tableData: [],
				 radio1: '',
				 find: '',
				 totalCount:10,
				 currentPage:1
			}
		},
		methods: {
		  handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        this.getOperlist({pageNo:val,status:this.radio1,name:this.find});
	      },	
	      handleRadio(v){//启用禁用	      	
	      	this.getOperlist({status:v,name:this.find});
	      },
	      search(){
	      	this.getOperlist({status:this.radio1,name:this.find});
	      },
	      getOperlist({pageNo=1,status='',name=''}={}){
	      	this.$get('operAdmin/getAll',{
	      		pageNo:pageNo,
	      		status:status,
	      		name:name
	      	}).then(data=>{
	      		this.totalCount = data.totalCount;
	      		let tableData = data.datas;
	      		this.tableData = tableData;
	      		for(let i = 0,len = tableData.length;i<len;i++){
	      			switch(tableData[i].status){
	      				case 0:
	      				tableData[i].statusd = '已启用';
	      				break;
	      				case 1:
	      				tableData[i].statusd = '禁用';
	      				break;
	      				default:
	      				tableData[i].statusd = '--';
	      			}
	      		}
	      	})
	      }
	     
		},
		mounted(){
	      	this.getOperlist();
	    }
	}
</script>

<style scoped>
	.shopList {width: 100%;box-sizing: border-box;height:100%;}	
	.row {margin: 0;}
	.listDetail,.row {background: #fff;padding: 10px;}
	.listDetail .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>