<template>
	<div >
		<div class="hf flex-wrap flex-vertical">
			<div class="bw p-10 boxborder">
				<h1 class="font-20 tc">平台电池配货总量</h1>
				<div class="batterylilt flex-wrap flex-horizontal flex-justify-around">
					<div v-for="item in statis"><p class="font-18 tc">{{item.mode}}</p><p class="fontYellow font-20 tc">{{item.distrinum}}组</p></div>
				</div>			
			</div>
			
			<div class="bw flex-con mt-10 pr paddinglist boxborder">
				
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="no" label="运营商编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="运营商账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="distrinum" label="配货数量" width="400" align="center">
									</el-table-column>
									<el-table-column prop="costdistributes" label="配货成本" width="" align="center">
									</el-table-column>									
									<el-table-column prop="action" label="操作" width="" align="center">						
									    <template slot-scope="scope">										
												<router-link :to="{path:'/Main/Businessdetail',query:{ id:scope.row.id}}">
														<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
													</router-link>									    								         			    								         
									    </template>
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
	export default {
    name: '',
    data(){
      return{
		  navtitle:'产品>运营商配货记录',
          tableData: [],				
					currentPage:1,
					total:0,
					statis:{}
      }
    },
    methods:{
     	 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	       this.serviceStatisList(val);
				},
				serviceStatis(){
					this.$get('operBattery/statis',{
					}).then(data=>{
					this.statis=data;
					});
				},
				serviceStatisList(pageNo){
					var pageNo = pageNo || "";
					this.$get('operBattery/getOperBattery',{
					pageNo: pageNo
					}).then(data=>{
					var arr=data.datas;
					for(var i = 0, len = arr.length; i < len; i++) {
						arr[i].costdistributes="￥"+arr[i].costdistribute
					}
					this.tableData=arr
					this.total = Number(data.totalCount);
					});
		  	}
		},
		mounted(){
		this.serviceStatis();
		this.serviceStatisList(1);
		this.$sendTitle(this.navtitle);
	  },
    components:{
    	
    }
  }

</script>
<style scope>
	.batterylilt{width:30%;margin:10px auto 0;padding-top:10px;}
	
</style>