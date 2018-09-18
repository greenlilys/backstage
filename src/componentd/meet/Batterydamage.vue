<template>
	<div >
		<div class="hf flex-wrap flex-vertical">	
		
		<el-row class="headBoxself bw" type="flex" align="middle">
			<el-col :span="9">
					<span class="font-14">处理结果：</span>				
						 <el-radio-group v-model="radio1" @change="handleChange">
						 	<el-radio  label="">全部</el-radio>
						 	<el-radio  label="0">默认状态</el-radio>
							<el-radio  label="1">待审查</el-radio>
							<el-radio  label="2">确认损坏</el-radio>
							<el-radio  label="3">未损坏</el-radio>
						</el-radio-group>				
			</el-col>
			
		</el-row>
		<div class="paddinglist bw pr mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="no" label="预约编号" width="" align="left">
									</el-table-column>									
									<el-table-column prop="type" label="预约类型" width="" align="left">
									</el-table-column>
									<el-table-column prop="username" label="预约用户" width="" align="left">
									</el-table-column>
									<el-table-column prop="name" label="报损网点" width="" align="left">
									</el-table-column>
									<el-table-column prop="name" label="报损时间" width="" align="left">
									</el-table-column>
									<el-table-column prop="name" label="报损照片" width="" align="left">
									</el-table-column>
									<el-table-column prop="name" label="审查结果" width="" align="left">
									</el-table-column>
									<el-table-column prop="reviewtime" label="审查时间" width="" align="left">
									</el-table-column>
									<el-table-column prop="name" label="审查人" width="" align="left">
									</el-table-column>
									<el-table-column prop="" label="操作" align="left">
									    <template slot-scope="scope">										
											<el-button type="warning" size="mini" class="btnStyle" @click="openConfirm">提交审查结果</el-button>
									    </template>
									</el-table-column>
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination							     
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage1"
							      :page-size="8"							    
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
				navtitle:'预约>电池报损',
				radio1:'',
				tableData: [],	
				totalCount:10,
				currentPage1:1
				 
			
			};
		},
		methods: {
		  
	      handleCurrentChange(val) {
	       this.getDamageList({pageNo:val});
	      },
	   
	      handleChange(){
	      	this.getDamageList();
	      	this.currentPage1 = 1;
	      },
	      getDamageList({pageNo=1,reviewstate=this.radio1}={},){	      	  
	      	  this.$get('appointOrder/selectDamageList',{
	      	  	pageNo:pageNo,
	      	  	reviewstate:reviewstate	      	  
	      	  }).then(data=>{
	      	  	this.tableData = data.datas;
	      	  	this.totalCount = data.totalCount;
	      	  })
	      },
	      openConfirm(){
		      this.$confirm('请根据报损照片确定电池是否损坏！', '提示', {
	          confirmButtonText: '确定损坏',
	          cancelButtonText: '未损坏',
	          type: 'warning'
	        }).then(() => {
	          this.$message({
	            type: 'success',
	            message: '当前用户电池押金将被扣除，电池按售卖给该用户处理，该用户所有平台服务终止。'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '该用户可继续租用当前电池，各网点可接受进行换电、退租等服务。'
	          });          
	        });
	      }	
		},
		mounted(){
			this.getDamageList();
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style scoped>	
	.headBoxself {padding:20px 10px;}		
</style>