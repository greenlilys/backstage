<template>
	<div>
		<div class="flex-wrap flex-vertical hf">	
			<div class="flex-wrap flex-horizontal mt-10 numBox">
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">{{tableDatas.oper}}</h1>
					<p class="font-16 tc mt-10">运营商</p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">{{this.shopnum}}</h1>
					<p class="font-16 tc mt-10">运营网点</p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">{{tableDatas.totals}}</h1>
					<p class="font-16 tc mt-10">分润合计</p>
				</div>
			</div>
			<el-row type="flex" align="middle" class="headBox mt-10"> 
				<el-col :span="6" :offset="12" class="tr">
					<el-button type="warning" size="small" class="btnStyle">导出当前数据</el-button>
				</el-col>
			</el-row>
			
			<div class="pr flex-con contentBox">
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column prop="no" label="运营商编号" width="" align="center">
					</el-table-column>
					<el-table-column prop="name" label="运营商名称" width="" align="center">
					</el-table-column>
					<el-table-column prop="shops" label="所属网点" width="" align="center">
					</el-table-column>
					<el-table-column prop="customers" label="用户" width="" align="center">
					</el-table-column>
					<el-table-column prop="totals" label="分润合计" width="" align="center">
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
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tableData: [],
				tableDatas: {},
				tablebegin:{},
				tableend:{},
		        currentPage:1,
				valueTime:'',
				total:0,
				shopnum:0
			}
		},
		methods:{
			handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	      	this.serviceInfo(this.currentPage);
		  },
		  serviceInfo(pageNo){
			var pageNo = pageNo || "";
			this.$get('operStatistics/serviceInfo',{
				pageNo: pageNo
			}).then(data=>{
				this.tableData=data.page.datas;
				this.tableDatas=data.serviceCount;
				var arr=data.page.datas;
				for(var i = 0, len = arr.length; i < len; i++) {
					this.shopnum+=arr[i].shops
				}
				this.total = Number(data.page.totalCount);
			});
		  },

		},
		mounted(){
		this.serviceInfo(1);
	  	}
	}
</script>

<style scoped>	
	.numBox>div:nth-child(1),.numBox>div:nth-child(2){margin-right:10px;}
</style>