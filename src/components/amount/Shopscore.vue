<template>
	<div>
		<div class="flex-wrap flex-vertical hf">
			<el-row class="headBox" type="flex" align="middle">				
					 <div class="block">
						 <span class="font-14">选择时段：&nbsp;</span>
						<el-date-picker v-model="valueTime" type="daterange"  range-separator="至" start-placeholder="开始日期" 
							end-placeholder="结束日期" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>			
			</el-row>
			
			<div class="flex-wrap flex-horizontal mt-10 numBox">
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">{{tableDatas.installCount}}</h1>
					<p class="font-16 tc mt-10">安装预约合计</p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">{{tableDatas.replaceCount}}</h1>
					<p class="font-16 tc mt-10">换电预约合计</p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-20 tc fontYellow">{{tableDatas.returnCount}}</h1>
					<p class="font-16 tc mt-10">退电预约合计</p>
				</div>
			</div>
			
			<el-row type="flex" align="middle" class="headBox mt-10"> 
				<el-col :span="6">
					<div class="font-14">数据明细：<span v-if="valueTime!=null">（{{valueTime[0]}}至{{valueTime[1]}}）</span></div>
				</el-col>
				<el-col :span="6" :offset="12" class="tr">
					<el-button type="success" size="small">导出当前数据</el-button>
				</el-col>
			</el-row>
			
			<div class="pr flex-con contentBox">
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column prop="no" label="网点编号" width="" align="center">
					</el-table-column>
					<el-table-column prop="name" label="网点名称" width="" align="center">
					</el-table-column>
					<el-table-column prop="installCount" label="安装预约" width="" align="center">
					</el-table-column>
					<el-table-column prop="replaceCount" label="换电预约" width="" align="center">
					</el-table-column>
					<el-table-column prop="returnCount" label="退电预约" width="" align="center">
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
				navtitle:'统计>网点业绩',
				tableData: [],
				tableDatas: {},
				tablebegin:{},
				tableend:{},
		        currentPage:1,
				valueTime:[],
				total:10
				
			}
		},
		methods:{		
	      handleCurrentChange(val) {
	      	this.serviceInfo({pageNo:val,begin:this.valueTime[0],end:this.valueTime[1]});
		  },		 
		  serviceInfo({pageNo=1,begin='',end=''}={}){			
			this.$get('reportform/serviceInfo',{
				pageNo: pageNo,
				begin:begin,
				end:end
			}).then(data=>{
				this.tableData=data.page.datas;
				this.tableDatas=data.serviceCount;
				this.total = Number(data.page.totalCount);
			});
		  }

		},
		mounted(){
			this.serviceInfo();
			this.$sendTitle(this.navtitle);
	  },
	  watch:{
	  	valueTime(newVal,oldVal){
	  		if(newVal){
	  			this.serviceInfo({begin:newVal[0],end:newVal[1]});
	  			this.currentPage=1;
	  		}
	  	}
	  }
	}
</script>

<style scoped>	
	.numBox>div:nth-child(1),.numBox>div:nth-child(2){margin-right:10px;}
</style>