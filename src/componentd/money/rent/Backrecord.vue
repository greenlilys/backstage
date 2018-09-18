<template>
	<div>
		
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="retime" label="退租时间" width="" align="left">
									</el-table-column>
									<el-table-column prop="reno" label="退租预约" width="" align="left">
									</el-table-column>
									<el-table-column prop="username" label="退租用户" width="" align="left">
									</el-table-column>
									<el-table-column prop="mode" label="退租产品" width="" align="left">
									</el-table-column>
									<!--<el-table-column prop="" label="产品信息" width="" align="center">
										<template slot-scope="scope">
											<div>{{scope.row.framenum}}&nbsp;&nbsp;{{scope.row.platenum}}</div>
										</template>
									</el-table-column>-->
									<el-table-column prop="endtime" label="租期截止" width="" align="left">
									</el-table-column>
									<el-table-column prop="leaseterms" label="当前租期类型" width="" align="left">
									</el-table-column>
									<el-table-column prop="reamounts" label="退还租金" width="" align="left">
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
</template>

<script>
	export default{
		data(){
			return {
				tableData: [],
				currentPage:1,
				total:0,
				begin:'',
				end:''
			}
		},
		methods:{
			
			 cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 6){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		    },
			handleCurrentChange(val) {
				this.rentList({pageNo:val});
			},
			rentList({pageNo=1,isrent=1,begin=this.begin,end=this.end}={}){			
			this.$get('rent/rentList',{
				pageNo: pageNo,
				isrent:isrent ,
				begin:begin,
				end:end
			}).then(data=>{
				var arr = data.datas;
				for(var i = 0, len = arr.length; i < len; i++) {
					arr[i].names=arr[i].name+"   "+arr[i].groupnum+"组"
					//支付方式
					if(arr[i].paymode == 0) {
						arr[i].paymodes = "支付宝"
					} else if(arr[i].paymode == 1){
						arr[i].paymodes = "微信"
					} else{
						arr[i].paymodes = "钱包支付"
					}
					//租期方式
					if(arr[i].leaseterm == 0) {
						arr[i].leaseterms = "月租"
					} else if(arr[i].leaseterm == 1){
						arr[i].leaseterms = "季租"
					} else{
						arr[i].leaseterms = "年租"
					}
					arr[i].reamounts="￥"+arr[i].reamount
				}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
			}
		},
		props:['valueTime'],
		mounted(){
			this.rentList();
		},
		watch: {
			valueTime(newVal, oldVal) {
				if(newVal) {
					this.rentList({
						begin: newVal[0],
						end: newVal[1]
					});
					this.currentPage = 1;
					this.begin = newVal[0];
					this.end = newVal[1];
				}
			}
		}
	}
</script>

<style scoped>

</style>