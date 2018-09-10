<template>
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="addtime" label="支付时间" width="" align="center">
									</el-table-column>
									<el-table-column label="支付类型" width="200" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium" v-if='scope.row.category==0'>开通子账户</el-tag>
												<el-tag size="medium" v-else-if='scope.row.category==1'>续租</el-tag>
												<el-tag size="medium" v-else-if='scope.row.category==2'>增加子账户</el-tag>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="remark" label="支付内容" align="center">
									</el-table-column>
									<el-table-column prop="total" label="支付金额" align="center">
									</el-table-column>	
									<el-table-column label="支付方式" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium" v-if='scope.row.paymode==0'>支付宝</el-tag>
												<el-tag size="medium" v-else-if='scope.row.paymode==1'>微信</el-tag>
												<el-tag size="medium" v-else-if='scope.row.paymode==2'>钱包支付</el-tag>
												<el-tag size="medium" v-else-if='scope.row.paymode==3'>天牛币</el-tag>
												<el-tag size="medium" v-else-if='scope.row.paymode==4'>银行卡</el-tag>
											</div>
										</template>
									</el-table-column>	
									<el-table-column prop="paymentno" label="支付订单号" align="center">
									</el-table-column>
									<el-table-column prop="paystate" label="支付状态" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium">{{scope.row.paystate?'已支付':'未支付'}}</el-tag>
											</div>
										</template>
									</el-table-column>
									<el-table-column label="发票" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium" v-if='resData.state'>— —</el-tag>
												<el-tag size="medium" v-else>{{scope.row.invoiceid?'未开':'发票已开'}}</el-tag>
											</div>
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
										:page-size="pagesize"	
										:page-count='pagecount'	  							    
							      layout="total, prev, pager, next"
							      :total="total">
							    </el-pagination>
							 	 </div>
							</template>								
				</div>
</template>

<script>
	export default {
		props:['resData'],
      data() {
        return {
					pagesize:10,
					pagecount:0,
					total:0,
          tableData: [],
          currentPage1:1,
          activeName2: 'first'
        }
      },
      methods:{
				parentMsg(msg) {
					console.log(msg);
					this.getData(1,msg);
					this.searchData=msg
				},
				getId(val){
					console.log(val);
				},
	      handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
					this.currentPage=val;
					this.getData(val)
	        console.log(`当前页: ${val}`);
				},
				getData(pageNo,name){
					this.$get('/groupPay/getAll',{
						id:this.resData.id,
						pageNo:pageNo,
						name:name
					}).then(data=>{
						console.log(data);
						this.tableData=data.datas
						this.total=data.totalCount;
						this.pagesize=data.pageSize;
						this.pagecount=data.totalPage
					})
				}
			 },
			 mounted(){
				this.getData(1);
			 }
    }
</script>

<style>
</style>