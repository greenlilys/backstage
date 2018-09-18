<template>
	<div>
		<div class="hf flex-wrap flex-vertical">
			<el-row class="p-10 boxborder bw" type="flex" align="middle">
				<el-col :span="6" :offset="18" class="tr">
					<router-link to='/Main/Addbattery'>
						<el-button type="success" size="small">+&nbsp;添加新电池</el-button>	
					</router-link>	
				</el-col>
			</el-row>
		
			<div class="paddinglist boxborder pr mt-10 flex-con bw">	
								<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
									<el-table-column prop="name" label="套餐名称" width="180" align="center">
									</el-table-column>
									<el-table-column prop="mode" label="电池型号" width="" align="center">
									</el-table-column>
									<el-table-column prop="groupnums" label="电池数量" width="" align="center">
									</el-table-column>
									<el-table-column prop="brief" label="电池说明" width="300" align="center">
									</el-table-column>
									<el-table-column prop="pickcosts" label="配货成本" width="" align="center">
									</el-table-column>
									<el-table-column prop="deposit" label="押金金额" width="" align="center">
									</el-table-column>
									<el-table-column prop="powerrates" label="换电费" width="" align="center">
									</el-table-column>
									<el-table-column prop="monthrents" label="月租" width="" align="center">
									</el-table-column>
									<el-table-column prop="quarterrents" label="季租" width="" align="center">
									</el-table-column>
									<el-table-column prop="annualrents" label="年租" width="" align="center">
									</el-table-column>
									<el-table-column prop="putways" label="状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="action" label="管理" width="250" align="center">
									    <template slot-scope="scope">						
												<router-link :to="{path:'/Main/Updatebattery',query:{id:scope.row.id}}">
														<el-button type="warning" size="mini" class="btnStyle">管理</el-button>
												</router-link>
												<el-button type="warning" size="mini" class="btnStyle" @click="handleDelete(scope.$index, scope.row)" >{{scope.row.putway == 0 ? nouse : canuse}}</el-button>
												<!-- <el-button type="warning" size="mini" class="btnStyle" @click="handleDeletes(scope.$index, scope.row)">删除</el-button>			         				          -->
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
				<Dialogue :textContent="textContent" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
				<!-- <Dialogue :textContent="textContent" :dialogVisible="dialogVisibles"  v-on:confirm="confirmIsuses" v-on:cancel="canceluse"></Dialogue> -->
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
		data() {
			return {
				navtitle:'设置>产品管理',
				tableData: [],
				currentPage:1,
				total:0,
				nouse:'下架',
				canuse:"上架",
				currentPutway:'',
				currentId:'',
				dialogVisible:false,
				textContent:'',//提示框文本
	      dialogVisibles:false
			};
		},
		methods: {
			 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
		  },
		  cellStyle({row, column, rowIndex, columnIndex}){
			if(columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8){ //指定坐标
				return 'color:#FF6600'
			}else{
				return ''
			}
		  },
	      handleCurrentChange(val) {
	        this.getBatteryList(val);
				},
				handleDelete(index,row){//上下架按钮	      	
	      	this.currentPutway = row.putway;
	      	this.currentId = row.id;
	      	this.dialogVisible = true;
	      	this.textContent = row.putway == 0? "确认下架电池吗？" :"确认上架电池吗？";
	      	this.title = "提示";
				},
				// handleDeletes(index,row){
				// 	this.currentId = row.id;
				// 	this.dialogVisibles = true;
				// 	this.textContent = "确认删除电池吗？";
				// 	this.title = "提示";
				// },
				getBatteryList(pageNo){	      	
	      	this.$get('battery/selectList',{
					pageNo:pageNo					
				}).then(data=>{
					var arr = data.datas;
						for(var i = 0,len=arr.length;i<len;i++){
							arr[i].groupnums=arr[i].groupnum+"组"
							if(arr[i].putway==0){
								arr[i].putways="上架"
							}else{
								arr[i].putways="下架"
							}
							arr[i].powerrates=arr[i].powerrate+"/次"
							arr[i].pickcosts="￥"+arr[i].pickcost
							arr[i].monthrents="￥"+arr[i].monthrent
							arr[i].quarterrents="￥"+arr[i].quarterrent
							arr[i].annualrents="￥"+arr[i].annualrent
						}
						this.tableData = arr;
						this.total = data.totalCount;
					})
				},
				confirmIsuse(){//确认禁用或者启用
	       var putway = this.currentPutway == 0 ? 1 : 0;
	       var id = this.currentId;       
	      	this.$post('battery/updatePutway',{
	      		id:id,
	      		putway:putway
	      	}).then(data=>{
	      		this.dialogVisible = false;
	      		this.getBatteryList(this.currentPage);//刷新当前页
	      		this.$ye();
	      	})   	
				},
				// confirmIsuses(){
				// 	var id = this.currentId;       
	      // 	this.$post('battery/deleteBattery',{
	      // 		id:id
	      // 	}).then(data=>{
	      // 		this.dialogVisibles = false;
	      // 		this.getBatteryList(this.currentPage);//刷新当前页
	      // 		this.$ye();
				// 	})
				// },
	      canceluse(){//取消或者关闭
	      	this.dialogVisible = false;
	      }
		},
	  method(){
				this.getBatteryList(1);
		},
		mounted:function(){
			this.$sendTitle(this.navtitle);
		},
		created(){
				this.getBatteryList(1);
		}, 
		components:{
    	Dialogue
    }
	}

</script>

<style scoped>

</style>