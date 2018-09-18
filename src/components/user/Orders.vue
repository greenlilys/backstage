<template>
	<div>
		<template>
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="no" label="预约编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="types" label="预约类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="addtime" label="预约时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="cost" label="支付金额（积分）" width="230" align="center">
									</el-table-column>
									<el-table-column prop="paymodes" label="支付方式" width="" align="center">
									</el-table-column>
									<el-table-column prop="paymentnos" label="支付订单号" width="" align="center">
									</el-table-column>
									<el-table-column prop="finishtime" label="完成时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="shopNo" label="网点编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="网点名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="" label="操作" align="center">										
										    <template slot-scope="scope">
										    	<router-link :to="{path:'/Main/Meetdetail',query:{id:scope.row.id}}">
													<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
												</router-link>
										    </template>										
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
		        totalCount:100,//总条目
		        
			}
		},
		methods:{
			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
			},
			cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 3){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
			},
		    handleCurrentChange(val) {
		    	var id = this.id;
		      	this.getServiceList(id,val);
		    },
	        getServiceList(id,pageNo){	      	
	      	this.$get('customerLog/serviceList',{
					id:id,
					pageNo:pageNo					
				}).then(data=>{
					var tableData = data.datas;
					this.tableData = tableData;
					this.totalCount = data.totalCount;
					for(var i = 0,len=tableData.length;i<len;i++){
						switch(tableData[i].type){
							case 0:
							tableData[i].types = "安装"
							break;
							case 1:
							tableData[i].types = "更换"
							break;
							case 2:
							tableData[i].types = "退租"
							break;
							case 3:
							tableData[i].types = "提车"
							break;
							case 4:
							tableData[i].types = "退车"
							break;
							default:
							tableData[i].types = "--"
							
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
						if(tableData[i].paymode==3){
							tableData[i].cost=tableData[i].cost
						}else{
							tableData[i].cost="￥"+tableData[i].cost
						}
						if(!tableData[i].paymentno){
							tableData[i].paymentnos = "--"
						}else{
							tableData[i].paymentnos = tableData[i].paymentno;
						}
					}
				})
	      }
		},
		props:['id'],
		created(){
			
		},
		beforeMount(){
			
		},
		watch:{
			id:function(newVal,oldVal){			
				if(newVal){this.getServiceList(newVal,1);}else{
					this.$message({
						type:'error',
						message:'id没有获取'
					})
				}
			}
		},
		mounted(){			
			if(this.id){
				this.getServiceList(this.id,1);
			}
		},
		beforeUpdate(){
			
		}
	}
</script>

<style>

</style>