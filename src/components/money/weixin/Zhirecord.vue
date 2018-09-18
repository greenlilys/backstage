<template>
	<div class="flex-wrap flex-vertical">
		<el-row  class="p-10 bw boxborder" type="flex" align="middle">
				<el-col :span="6" :offset="18">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable @keyup.enter.native='search'>
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</el-col>				
		</el-row>
		<div class="flex-con pr paddinglist boxborder bw">
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="scusername" label="用户账户" width="" align="center">
				</el-table-column>
				<el-table-column prop="outtradeno" label="支付订单号" width="" align="center">
				</el-table-column>
				<el-table-column prop="totalfees" label="支付金额" width="" align="center">
				</el-table-column>
				<el-table-column prop="ordertypes" label="订单类型" width="" align="center">
				</el-table-column>
				<el-table-column prop="statuss" label="支付状态" width="" align="center">
				</el-table-column>
				<el-table-column prop="adddate" label="支付时间" width="" align="center">
				</el-table-column>
													
			</el-table>
		
			<div class="block page">							    
				<el-pagination					
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
	    handleCurrentChange(val) {
			this.selectAliPay(val,this.find);
		  },
	  	selectAliPay(pageNo,find){
			var pageNo = pageNo || "";
			this.$get('capital/selectAliPay',{
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
						switch(arr[i].ordertype){
							case 1:
							arr[i].ordertypes = "店铺加盟费"
							break;
							case 2:
							arr[i].ordertypes = "配电费"
							break;
							case 10:
							arr[i].ordertypes = "用户押金"
							break;
							case 11:
							arr[i].ordertypes = "用户续租、滞纳金"
							break;
							case 12:
							arr[i].ordertypes = "用户预约、换电费"
							break;
							case 13:
							arr[i].ordertypes = "订单"
							break;
							case 14:
							arr[i].ordertypes = "充值天牛币"
							break;
							case 15:
							arr[i].ordertypes = "救援交通费"
							break;
							case 16:
							arr[i].ordertypes = "补缴保证金"
							break;
							case 17:
							arr[i].ordertypes = "切换电池型号"
							break;
							default:
							arr[i].ordertypes = "--"
						}
						arr[i].totalfees="￥"+arr[i].totalfee;
					}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
		  },
		  search(v) {
			this.selectAliPay(this.currentPage,this.find)
		  }
		},
		mounted(){
		this.selectAliPay(1,this.find);
	  }
	}
</script>
<style scoped>

</style>