<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<el-row  class="contentBox" type="flex" align="middle">
				<el-col :span="7">
				<span class="font-14">提现状态：</span>
				<template>
					<el-radio-group v-model="radios" @change="handleRedio">
					<el-radio  label="">全部</el-radio>
					<el-radio  label="1">提现成功</el-radio>
					<el-radio  label="2">提现失败</el-radio>		
					</el-radio-group>			
				</template>
			</el-col>
				<el-col :span="6">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable>
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</el-col>				
			</el-row>
			<div class="mainlist flex-con mt-10 bw contentBox">
				<template>
					<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
						<el-table-column prop="no" label="申请编号" width="" align="center">
						</el-table-column>
						<el-table-column prop="onames" label="提现代理商" width="" align="center">
						</el-table-column>
						<el-table-column prop="balances" label="钱包余额" width="" align="center">
						</el-table-column>
						<el-table-column prop="addtime" label="申请提现时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="amounts" label="申请提现金额" width="" align="center">
						</el-table-column>
						<el-table-column prop="types" label="提现方式" width="" align="center">
						</el-table-column>
						<el-table-column prop="realname" label="用户姓名" width="" align="center">
						</el-table-column>		
						<el-table-column prop="handletime" label="处理时间" width="" align="center">
						</el-table-column>
						<el-table-column prop="nickname" label="处理人" width="" align="center">
						</el-table-column>	
						<el-table-column prop="results" label="提现状态" width="" align="center">
						</el-table-column>	
						<el-table-column prop="remark" label="备注" width="" align="center">
						</el-table-column>									
					</el-table>
				</template>
				<template>
					<div class="block page">							    
					<el-pagination						
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-size="10"							    
						layout="total, prev, pager, next"
						:total="total">
					</el-pagination>
						</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	
	
	export default {
      data(){
			return {
				navtitle:'资金>提现记录',
				tableData: [],
		        currentPage:1,
				radios:'',
				total:10,
				find:''
		        }
			},
      	methods:{
			handleRedio(v) {//筛选上线状态
				this.cashList({no:this.find,result:this.radios});
				this.currentPage = 1;
			},
			
			cellStyle({row, column, rowIndex, columnIndex}){
			    if(columnIndex === 2){ //指定坐标
			        return 'color:#FF6600'
			    }else if(columnIndex === 4){
			        return 'color:#FF6600'
			    }else{
			    	return ''
			    }
			},
			handleCurrentChange(v) {
				this.cashList({pageNo:v,no:this.find,result:this.radios});				
			},	 
			search(v) {
				this.cashList({no:this.find,result:this.radios});
				this.currentPage = 1;
			},
	    	cashList({pageNo=1,no='',result=''}={}){
				this.$get('capital/cashList',{
					pageNo: pageNo,
					no: no,
					result:result
				}).then(data=>{
					var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						if(arr[i].type==0){
							arr[i].types="支付宝"
						}else{
							arr[i].types="微信"
						}
						arr[i].typea=arr[i].types+":"+arr[i].accounts

						if(arr[i].result==0){
							arr[i].results="处理中"
						}else if(arr[i].result==1) {
							arr[i].results="提现成功"
						}else{
							arr[i].results="提现失败"
						}
						if(arr[i].customerid!=null){
							arr[i].usertype="用户"
						}else if(arr[i].shopid!=null){
							arr[i].usertype="加盟网点"
						}
						if(arr[i].customerid!=null){
							arr[i].onames=	arr[i].ooname
						}else if(arr[i].shopid!=null){
							arr[i].onames=	arr[i].oname
						}
						arr[i].amounts="￥"+arr[i].amount
						arr[i].balances="￥"+arr[i].balance
						
					}
					this.tableData=arr;
					this.total = Number(data.totalCount);
				});
			}
				
	  },
	  mounted(){
		this.cashList();
		this.$sendTitle(this.navtitle);
	  },
      components:{
      
      }
    }
</script>

<style scoped>
	.mainlist{position:relative;}
</style>