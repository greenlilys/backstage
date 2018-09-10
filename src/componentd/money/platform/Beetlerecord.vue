<template>
	<div class="flex-wrap flex-vertical">
		<el-row  class="p-10 pb-0 boxborder bw" type="flex" align="middle">
				<el-col :span="6" :offset="18">
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable>
						<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
					</el-input>
				</el-col>				
		</el-row>
		<div class="flex-con pr paddinglist bw">
			<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
					<el-table-column prop="username" label="用户账户" width="" align="center">
					</el-table-column>
					<el-table-column prop="types" label="操作类型" width="" align="center">
					</el-table-column>
					<el-table-column prop="integral" label="支付金额" width="" align="center">
					</el-table-column>
					<el-table-column prop="remark" label="操作备注" width="" align="center">
					</el-table-column>
					<el-table-column prop="addTime" label="操作时间" width="" align="center">
					</el-table-column>
					<el-table-column prop="nickname" label="操作人" width="" align="center">
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
			cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 2){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		  },
	    handleCurrentChange(val) {
			this.selectCustBeetleList(val,this.find);
		  },
	  	selectCustBeetleList(pageNo,find){
			var pageNo = pageNo || "";
			this.$get('capital/platformCustBeetleList',{
				pageNo: pageNo,
				name:this.find
			}).then(data=>{
				var arr = data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						if(arr[i].type==0){
							arr[i].types= "充值"
						}else if(arr[i].type==1){
							arr[i].types= "扣款"
						}
					}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
		  },
		  search(v) {
			this.selectCustBeetleList(this.currentPage,this.find)
		  }
		},
		mounted(){
		this.selectCustBeetleList(1,this.find);
	  }
	}
</script>
<style scoped>

</style>