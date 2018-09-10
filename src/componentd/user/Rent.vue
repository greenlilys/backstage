<template>
	<div>
		<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="addTime" label="起租/续租时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="leaseterms" label="租期类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="amounts" label="租金" width="" align="center">
									</el-table-column>
									<el-table-column prop="paymodes" label="支付方式" width="" align="center">
									</el-table-column>
									<el-table-column prop="paymentno" label="支付订单号" width="" align="center">
									</el-table-column>
									<el-table-column prop="rentDay" label="租期" width="" align="center">
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
</template>

<script>
	export default{
		data(){
			return {
				tableData: [],
		        currentPage1:1,
		        totalCount:1
		        
			}
		},
		methods:{
			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
			},
			cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 2){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
			},
		    handleCurrentChange(val) {
		    	var id = this.id;
		      	this.getRenewList(id,val);
		        console.log(`当前页: ${val}`);
		    },
	        getRenewList(id,pageNo){
	            this.$get('customerLog/renewList',{
					id:id,
					pageNo:pageNo					
			}).then(data=>{					
					var tableData = data.datas;					
					this.totalCount = data.totalCount;
					for(var i = 0,len=tableData.length;i<len;i++){
						tableData[i].rentDay = tableData[i].begintime + " 至  " +tableData[i].endtime;
						switch (tableData[i].leaseterm){
							case 0:
							tableData[i].leaseterms = "月租"
							break;
							case 1:
							tableData[i].leaseterms = "季租"
							break;
							case 2:
							tableData[i].leaseterms = "年租"
							break;
							default:
							tableData[i].leaseterms = "--";
						}
						
						switch (tableData[i].paymode){
							case 0:
							tableData[i].paymodes = "支付宝"
							break;
							case 1:
							tableData[i].paymodes = "微信"
							break;
							case 2:
							tableData[i].paymodes = "钱包支付"
							break;
							default:
							tableData[i].paymodes = "--";
						}
						tableData[i].amounts="￥"+tableData[i].amount;
					}
					this.tableData = tableData;
			})
	      }
		},
		props:['id'],
		mounted(){					
			this.getRenewList(this.id,1);
		},
		watch:{

		}
	}
</script>

<style>

</style>