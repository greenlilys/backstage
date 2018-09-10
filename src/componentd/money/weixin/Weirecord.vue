<template>
	<div class="flex-wrap flex-vertical">
		<el-row  class="p-10 pb-0 bw" type="flex" align="middle">
				<el-col :span="6" :offset="18">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable>
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</el-col>				
		</el-row>
		<div class="flex-con bw pr paddinglist boxborder">
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="scusername" label="用户账户" width="" align="center">
				</el-table-column>
				<el-table-column prop="outtradeno" label="支付订单号" width="" align="center">
				</el-table-column>
				<el-table-column prop="total_fees" label="支付金额" width="" align="center">
				</el-table-column>
				<el-table-column prop="body" label="订单类型" width="" align="center">
				</el-table-column>
				<el-table-column prop="statuss" label="支付状态" width="" align="center">
				</el-table-column>
				<el-table-column prop="adddate" label="支付时间" width="" align="center">
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
				total:0,
				find:''
			}
		},
		methods:{
		  handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	    handleCurrentChange(val) {
			this.selectWxPay(val,this.find);
		  },
	  	selectWxPay(pageNo,find){
			var pageNo = pageNo || "";
			this.$get('capital/selectWxPay',{
				pageNo: pageNo,
				no:this.find
			}).then(data=>{
				var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						if(arr[i].status==0){
							arr[i].statuss="生成订单"
						}else if(arr[i].status==1){
							arr[i].statuss="支付成功"
						}else if(arr[i].status==1){
							arr[i].statuss="支付失败"
						}else{
							arr[i].statuss="支付中"
						}
						if(arr[i].susername!=""){
							arr[i].scusername= arr[i].susername
						}else if(arr[i].cusername!=""){
							arr[i].scusername= arr[i].cusername
						}
						arr[i].total_fees="￥"+arr[i].total_fee;
					}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
		  },
		  search(v) {
			this.selectWxPay(this.currentPage,this.find)
		  }
		},
		mounted(){
		this.selectWxPay(1,this.find);
	  }
	}
</script>
<style scoped>

</style>