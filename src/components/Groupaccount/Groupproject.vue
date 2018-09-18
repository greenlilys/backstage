<template>
	<div >
		<div class=" hf flex-wrap flex-vertical">	
		
		<el-row class="bw p-10 pb-0" type="flex" align="middle">
			<el-col :span="7">
				 <span class="font-14">账号状态：</span>				
					<el-radio-group v-model="radio"  @change = "handleRadio">
						<el-radio  label="">全部</el-radio>
						<el-radio  label="0">正在使用</el-radio>
						<el-radio  label="1">已停用</el-radio>	
					</el-radio-group>				
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入运营商账号、项目名称..." v-model="find" clearable  @clear='clear' class="input-with-select" @keyup.enter.native='screen'>
						<el-button slot="append" icon="el-icon-search" @click='screen'>筛选</el-button>
					</el-input>
				</div>
			</el-col>

			<el-col :span="6" :offset="5" style="text-align:right;">
				<router-link to='/Main/Addgroupproject'>
					<el-button type="success" size="small">+&nbsp;添加团购项目</el-button>
				</router-link>			
				
			</el-col>
		</el-row>
		
		<div class="paddinglist bw flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="name" label="项目名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="主账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="contactname" label="联系人" width="" align="center">
									</el-table-column>
									<el-table-column prop="totalnum" label="子账号数量" width="" align="center">
									</el-table-column>
									<el-table-column prop="mode" label="租用电池类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="deposit" label="子账号押金" width="" align="center">
									</el-table-column>
									<el-table-column prop="addtime" label="创建时间" width="" align="center">
									</el-table-column>
									<el-table-column label="项目状态" width="" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium">{{scope.row.state?'禁用':'正常'}}</el-tag>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">	
											<el-button type="warning" class="btnStyle" size="mini" @click='toDetails(scope.row.id)'>详情</el-button>
									    </template>
									</el-table-column>
								</el-table>
							</template>
							<!-- :current-page="currentPage" -->
							<template>
								<div class="block page">							    
							    <el-pagination
							      @current-change="handleCurrentChange"
								  :current-page.sync='currentPage'
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="total">
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
			navtitle:'团购账号>团购项目',
			tableData: [],
			radio: '',
			find: '',

			total:0,//总数据数
			radio1:'',
			currentPage:1
			};
		},
		methods: {
	      handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.getData(val,this.find,this.radio);
	      },
	      navAddgroupproject(){
	      	this.$router.push('/Groupproject/Addgroupproject')
	      },
	  	  handleRadio(value){
				this.radio=value;
				this.currentPage=1;
				this.getData(1,this.find,this.radio);
			},
	      navGroupprojectdetail(){
	      	this.$router.push('/Groupproject/Groupprojectdetail')

	      },
	      handleRadio1(){      	
	     

		  },
		  toDetails(value){
			  console.log(value);
			  this.$router.push({
					// name: 'checkDetails',
					path: '/Main/Groupprojectdetail',
					query: {
						id: value
					}
				});
		  },
		  clear(){
			  this.getData(1,this.find,this.radio);
		  },
		//   筛选
		  screen(){
			  this.currentPage=1;
			  this.getData(1,this.find,this.radio);
		  },
		  getData(pageNo,find,status){
			  var that=this;
			  this.$get('/groupPro/getAll',{
				  pageNo:pageNo,
				  name:find,
				  status:status
			  }).then(data=>{
				  this.tableData=data.datas;
				  console.log(data);
				  this.total=data.totalCount
			  }) 

			
		}
		
	},
		mounted:function(){
			this.$sendTitle(this.navtitle);
			this.getData(1);      
		}

}
</script>

<style scoped>
	
	
	.btnReset{color:#fff;}
	
	
</style>