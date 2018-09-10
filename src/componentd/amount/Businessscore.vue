<template>
	<div>
		<div class="flex-wrap flex-vertical hf">			
			<div class="flex-wrap flex-horizontal numBox mt-10">
				<div class="p-10 bw flex-con">
					<h1 class="font-20 tc fontYellow">{{tableDatas.oper}}</h1>
					<p class="font-16 tc mt-10">运营商</p>
				</div>
				<div class="p-10 bw flex-con">
					<h1 class="font-20 tc fontYellow">{{this.shopnum}}</h1>
					<p class="font-16 tc mt-10">运营网点</p>
				</div>
				<div class="p-10 bw flex-con">
					<h1 class="font-20 tc fontYellow">{{tableDatas.totals}}</h1>
					<p class="font-16 tc mt-10">分润合计</p>
				</div>
			</div>
			<el-row type="flex" align="middle" class="p-10 pb-0 boxborder bw mt-10"> 
				<el-col :span="12" :offset="12" class="tr">
					<el-button type="success" size="small" @click="downExcle">导出当前数据</el-button>
				</el-col>
			</el-row>
			
			<div class="pr flex-con paddinglist boxborder bw">
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
				navtitle:'统计>运营商业绩',
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
			downExcle(){		  		
		  		let url = this.$GLOBALconfig.agent_api + 'operStatistics/serviceCountExcel';				 
				let iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = url;				 
				document.body.appendChild(iframe);				 
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
		this.$sendTitle(this.navtitle);
	  	}
	}
</script>

<style scoped>	
	.numBox>div:nth-child(1),.numBox>div:nth-child(2){margin-right:10px;}
</style>