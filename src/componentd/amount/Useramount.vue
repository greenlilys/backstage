<template>
	<div class="flex-wrap flex-vertical">
		<el-row class="p-10 boxborder bw" type="flex" align="middle">
			
				<el-col :span='1.5'>
					<span class="font-14">选择时段：&nbsp;</span>
				</el-col>
				<el-col :span='8'>
					<div class="block">
						<el-date-picker 						
							v-model="valueTime" 
							type="daterange" 
							range-separator="至" start-placeholder="开始日期" 
							end-placeholder="结束日期" 
							value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				</el-col>
			
		</el-row>
		
		<div class="flex-wrap flex-vertical v-cloak mt-10">
			<div class="flex-wrap flex-horizontal topBox">
				<div class="p-10 bw">
					<p class="tc font-16">注册用户 </p>
					<p class="mt-20 fontYellow font-20 tc">{{registernum.register}}</p>				
				</div>
				
				<div class="p-10 bw flex-con" v-for="item in stocknum">					
					<p class="tc font-16"> {{item.mode}}安装用户</p>
					<p class="mt-20 fontYellow font-20 tc">{{item.num}}</p>
				</div>
			</div>
		</div>
		
		<div class="flex-wrap flex-vertical  v-cloak mt-10">
			<div class="flex-wrap flex-horizontal bottomBox">
				<div class="p-10 bw flex-con">
					<p class="tc font-16">续租-月租 </p>
					<p class="mt-20 fontYellow font-20 tc">{{setMealsnum.monthlyrent}}</p>				
				</div>
				<div class="p-10 bw flex-con">
					<p class="tc font-16">续租-季租 </p>
					<p class="mt-20 fontYellow font-20 tc">{{setMealsnum.seasonrent}}</p>				
				</div>
				<div class="p-10 bw flex-con mr-10">
					<p class="tc font-16">续租-年租 </p>
					<p class="mt-20 fontYellow font-20 tc">{{setMealsnum.annualrent}}</p>				
				</div>	
				<div class="p-10 bw flex-con">
					<p class="tc font-16">安装预约</p>
					<p class="mt-20 fontYellow font-20 tc">{{serviceCount.installCount}}</p>				
				</div>	
				<div class="p-10 bw flex-con">
					<p class="tc font-16">换电预约 </p>
					<p class="mt-20 fontYellow font-20 tc">{{serviceCount.replaceCount}}</p>				
				</div>	
				<div class="p-10 bw flex-con">
					<p class="tc font-16">退电预约 </p>
					<p class="mt-20 fontYellow font-20 tc">{{serviceCount.installTramCount}}</p>				
				</div>				
			</div>
		</div>
		
		<div class="flex-con bw mt-10 flex-wrap flex-vertical">
			<div class="flex-wrap flex-horizontal flex-justify-between p-10 pb-0">
				<div class="font-14">数据明细：（<span v-if="valueTime">{{valueTime[0]}}</span>至<span v-if="valueTime">{{valueTime[1]}}</span>）</div>
				<div><el-button type="primary" size="small" @click="downExcle">导出数据</el-button>	</div>
			</div>
			
			<div class="paddinglist boxborder flex-con pr">	
					<el-table :data="tableData" style="width: 100%;">
						<el-table-column prop="username" label="用户账号" width="" align="left">
						</el-table-column>
						<el-table-column prop="" label="所在区域" width="" align="left">
							<template slot-scope="scope">
								<div>{{scope.row.provincename}}{{scope.row.cityname}}{{scope.row.countyname}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="mode" label="电池型号" width="" align="left">							
						</el-table-column>
						<el-table-column label="租期类型" width="300" align="left">
							<template slot-scope="scope">
								<div v-if="scope.row.leaseterm ==0">月租</div>
								<div v-if="scope.row.leaseterm ==1">季租</div>
								<div v-if="scope.row.leaseterm ==2">年租</div>
								<div v-if="scope.row.leaseterm ==3">日租</div>
							</template>
						</el-table-column>
						<el-table-column prop="installCount" label="安装预约" width="" align="left">
						</el-table-column>
						<el-table-column prop="replaceCount" label="换电预约" width="" align="left">
						</el-table-column>
						<el-table-column prop="returnCount" label="退电预约" width="" align="left">
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
	export default {
    name: '',
    data(){
      return{
		  	navtitle:'统计>用户统计',
				serviceCount:{},
				registernum:{},
				stocknum:{},
				setMealsnum:{},
				usernum:{},				
				valueTime:[],
				tableData:[],
				currentPage:1,
				total:10
      }
    },
    methods:{
    	downExcle(){		  		
		  		var begin = this.valueTime[0] || '';
		  		var end = this.valueTime[1] || '';
		  		let url = this.$GLOBALconfig.agent_api + 'reportform/userServiceCountExcel?begin=' +begin + '&end=' + end;	
		  		console.log(url);
				let iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = url;				 
				document.body.appendChild(iframe);			 
		  },
	      stockStatist({pageNo=1,begin=this.valueTime[0] || '',end=this.valueTime[1] || ''}={}){
				this.$get('reportform/selectCustomerstocknum',{
					pageNo:pageNo,
					begin:begin,
					end:end
				}).then(data=>{					
					this.registernum =	data.registernum;
					this.stocknum = data.stocknum;
					this.setMealsnum = data.setMealsnum;
					this.serviceCount = data.serviceCount;
					this.tableData = data.page.datas;
					this.total = data.page.totalCount;
				})
			},
			handleCurrentChange(v){
				this.stockStatist({pageNo:v});
			}
		},
		watch:{
			valueTime:function(newVal,oldval){			
				if(newVal){
					this.stockStatist();
				}
			}
		},
		mounted(){
		this.stockStatist();
		this.$sendTitle(this.navtitle);
		},
    components:{
    	
    }
  }

</script>
<style scope>

.topBox div:nth-child(1){margin-right:10px;width:200px;}
</style>