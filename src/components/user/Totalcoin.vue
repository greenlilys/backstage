<template>
	<div>
		<div class="contentBox hf bw pr">
			
		
		<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="username" label="用户账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="margin" label="天牛币余额" width="" align="center">
									</el-table-column>
									<el-table-column prop="integral" label="天牛币充值金额" width="" align="center">
									</el-table-column>
									<el-table-column prop="categorys" label="类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="paymentno" label="支付单号" width="" align="center">
									</el-table-column>
									<el-table-column prop="paymodes" label="支付方式" width="" align="center">
									</el-table-column>
									<el-table-column prop="addTime" label="变动时间" width="" align="center">
									</el-table-column>
									
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage1"
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="totalCount">
							    </el-pagination>
							 	 </div>
							</template>	
			</div>
	</div>
</template>

<script>

	export default{
		data(){
			return {
				navtitle:'用户>天牛币记录',
				tableData: [],
		         currentPage1:1,
		         totalCount:10
			}
		},
		methods:{
			 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	         this.getCustBeetleList(val);
	      },
	      getCustBeetleList(pageNo){
	      	  this.$get('customer/custBeetleList',{
				pageNo:pageNo
			}).then(data=>{
				var tableData = data.datas;				
				this.tableData = tableData;
				this.totalCount = data.totalCount;
				for(var i = 0,len =tableData.length;i<len;i++ ){
					switch (tableData[i].category){
							case 0:
							tableData[i].categorys = "租金退还"
							break;
							case 1:
							tableData[i].categorys = "换电费退还"
							break;
							case 2:
							tableData[i].categorys = "活动赠送"
							break;
							case 3:
							tableData[i].categorys = "推荐会员"
							break;
							case 4:
							tableData[i].categorys = "评价赠送"
							break;
							case 5:
							tableData[i].categorys = "后台充值"
							break;
							case 8:
							tableData[i].categorys = "用户充值"
							break;
							case 7:
							tableData[i].categorys = "续租奖励"
							break;
							case 10:
							tableData[i].categorys = "订单付款"
							break;
							case 11:
							tableData[i].categorys = "租金支付"
							break;
							case 12:
							tableData[i].categorys = "换电费支付"
							break;
							case 13:
							tableData[i].categorys = "充值奖励"
							break;
							case 14:
							tableData[i].categorys = "平台扣款"
							break;
							default:
							tableData[i].categorys = "--"
							
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
				}
			})
	      }
		},
		mounted(){
			this.getCustBeetleList(1);
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style scoped>

</style>