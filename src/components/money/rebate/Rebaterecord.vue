<template>
	<div class="flex-wrap flex-vertical">
		<el-row  class="contentBox" type="flex" align="middle">
				<el-col :span="6" :offset="18">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable>
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</el-col>				
		</el-row>
		<div class="pr flex-con">
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addtime" label="结算时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="remark" label="结算项" width="" align="center">
									</el-table-column>
									<el-table-column prop="no" label="运营商编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="rebate" label="结算金额" width="" align="center">
									</el-table-column>
									<el-table-column prop="acctypes" label="结算方式" width="" align="center">
									</el-table-column>
									<el-table-column prop="account" label="结算账户" width="" align="center">
									</el-table-column>
									<el-table-column prop="orderno" label="订单号" width="" align="center">
									</el-table-column>
									<el-table-column prop="hander" label="经办人" width="" align="center">
									</el-table-column>	
								</el-table>
							
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage"
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="total">
							    </el-pagination>
							 	 </div>
		</div>
								
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData: [],
		        currentPage:1,
				find:'',
				total:0
			}
		},
		methods:{
			handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
			this.Ooperlist(this.currentPage,this.find);
			},
			handleTime(v){//日期
			console.log(v);
			this.begin = v[0];
			this.end = v[1];
			},
			search(v) {
				this.Ooperlist(this.currentPage,this.find)
			},	
			Ooperlist(pageNo){
			var pageNo = pageNo || "";
			this.$get('operExtract/getAll',{
				pageNo: pageNo,
				name:this.find
			}).then(data=>{
				var arr=data.datas;
				for(var i = 0, len = arr.length; i < len; i++) {
					arr[i].contactcellphonename=arr[i].contactname+"/"+arr[i].contactcellphone
					if(arr[i].acctype==0){
						arr[i].acctypes="银行卡"
					}else if(arr[i].acctype==1){
						arr[i].acctypes="支付宝"
					}
					arr[i].acctypeZfbacc=arr[i].acctypes+arr[i].Zfbacc;
				}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
			}
		},
		mounted(){
		this.Ooperlist(1,this.find);
	  	}
	}
</script>

<style scoped>

</style>