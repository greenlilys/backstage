<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="addtime" label="钱包变动时间" width="" align="left">
									</el-table-column>
									<el-table-column prop="categorys" label="变动类型" width="" align="left">
									</el-table-column>
									<el-table-column prop="amounts" label="金额" align="left">
									</el-table-column>
									<el-table-column prop="balances" label="钱包余额" align="left">
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
							      :total="total">
							    </el-pagination>
							 	 </div>
							</template>								
				</div>
</template>

<script>
	export default {
      data() {
        return {
          tableData: [],
					currentPage:1,
					total:0,
      }
      },
      methods:{
	      handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
		  },
		  cellStyle({row, column, rowIndex, columnIndex}){
				if(columnIndex === 2){ //指定坐标
					return 'color:#FF6600'
				}else if(columnIndex === 3){
					return 'color:#FF6600'
				}else{
					return ''
				}
			},
	      handleCurrentChange(val) {
					this.getShopwalletList(val,this.id)
	        //console.log(`当前页: ${val}`);
				},
				getShopwalletList(pageNo,id){
					var id=this.id;
		      this.$get('shopLog/walletList',{
						pageNo:pageNo,
						id:id
					}).then(data=>{
					var tableData = data.datas;
	    		for(var i = 0,len=tableData.length;i<len;i++){
						switch(tableData[i].category){
							case 0:
							tableData[i].categorys = "租金退款"
							break;
							case 1:
							tableData[i].categorys = "换电预约取消"
							break;
							case 2:
							tableData[i].categorys = "押金赎回"
							break;
							case 3:
							tableData[i].categorys = "店铺推荐好友"
							break;
							case 4:
							tableData[i].categorys = "安装预约返利"
							break;
							case 5:
							tableData[i].categorys = "换电预约返利"
							break;
							case 6:
							tableData[i].categorys = "退电预约返利"
							break;
							case 7:
							tableData[i].categorys = "店铺排名奖励"
							break;
							case 8:
							tableData[i].categorys = "充值"
							break;
							case 9:
							tableData[i].categorys = "店铺减配电池"
							break;
							case 10:
							tableData[i].categorys = "预约过期"
							break;
							case 11:
							tableData[i].categorys = "增配订单取消"
							break;
							case 12:
							tableData[i].categorys = "救援交通费分润"
							break;
							case 13:
							tableData[i].categorys = "切换电池型号退还租金"
							break;
							case 14:
							tableData[i].categorys = "切换电池分润"
							break;
							case 15:
							tableData[i].categorys = "平台保证金退款"
							break;
							case 16:
							tableData[i].categorys = "用户续租分润"
							break;
							case 17:
							tableData[i].categorys = "用户安装分润"
							break;
							case 50:
							tableData[i].categorys = "订单付款"
							break;
							case 51:
							tableData[i].categorys = "租金支付"
							break;
							case 52:
							tableData[i].categorys = "换电费支付"
							break;
							case 53:
							tableData[i].categorys = "押金支付"
							break;
							case 54:
							tableData[i].categorys = "配货订单支付"
							break;
							case 55:
							tableData[i].categorys = "提现"
							break;
							case 56:
							tableData[i].categorys = "退租违约金支付"
							break;
							case 57:
							tableData[i].categorys = "平台扣款"
							break;
							case 58:
							tableData[i].categorys = "救援交通费支付"
							break;
							case 59:
							tableData[i].categorys = "充值天牛币支付"
							break;
							case 60:
							tableData[i].categorys = "补缴保证金"
							break;
							case 61:
							tableData[i].categorys = "支付切换电池型号"
							break;
							case 62:
							tableData[i].categorys = "缴纳滞纳金"
							break;
							default:
							tableData[i].categorys = "--"
						}
						tableData[i].amounts="￥"+tableData[i].amount;
						tableData[i].balances="￥"+tableData[i].balance;
				}
	    		this.tableData = tableData;
	    		this.total= Number(data.totalCount);
	    	})
	      },
			},
			props:['id'],
			ceeated(){
    	},
    	mounted(){
    	this.getShopwalletList(1,this.id)
   	 },
  }
</script>

<style>
</style>