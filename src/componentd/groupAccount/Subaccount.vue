<template>
<!-- import func from './vue-temp/vue-editor-bridge'; -->
	<div>					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="username" label="用户账户" width="" align="center">
									</el-table-column>
									<el-table-column prop="username" label="起租时间（添加子帐号）" width="200" align="center">
									</el-table-column>
									<el-table-column prop="mode" label="租用产品" align="center">
									</el-table-column>
									<el-table-column label="车牌号/车架号" width="" align="center" v-if='resData.type'>
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium">{{scope.row.platenum}} {{scope.row.framenum}}</el-tag>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="deposit" label="押金金额" align="center">
									</el-table-column>	
									<el-table-column prop="unpaidlatefee" label="滞纳金" align="center">
									</el-table-column>	
									<el-table-column prop="isoverdue" label="租期状态" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium">{{scope.row.isoverdue?'已逾期':'租期中'}}</el-tag>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="duedate" label="租期" align="center">
									</el-table-column>
									<el-table-column prop="wallet" label="钱包余额" align="center">
									</el-table-column>
									<el-table-column prop="integral" label="天牛币余额" align="center">
									</el-table-column>
									<el-table-column prop="status" label="账户状态" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium" v-if='scope.row.status==0'>已启用</el-tag>
												<el-tag size="medium" v-else-if='scope.row.status==1'>已禁用</el-tag>
												<el-tag size="medium" v-else-if='scope.row.status==2'>已移除</el-tag>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="money" label="操作" width="300" align="center">
										 <template slot-scope="scope">										
											 <el-button type="warning" size="mini" class="btnStyle" @click='showVis(scope.row.id)' v-if='resData.state' disabled>子账号变更记录</el-button>	
											<el-button type="warning" size="mini" class="btnStyle" @click='showVis(scope.row.id)' v-else>子账号变更记录</el-button>	
											<el-button type="warning" size="mini" class="btnStyle" @click="toDetails(scope.row.customerid)" v-if='resData.state' disabled>详情</el-button>	
											<el-button type="warning" size="mini" class="btnStyle" @click="toDetails(scope.row.customerid)" v-else>详情</el-button>							    								         
											<el-button type="warning" size="mini" class="btnStyle" @click='back(scope.row.id)' v-if='resData.state' disabled>退租</el-button>	
											<el-button type="warning" size="mini" class="btnStyle" @click='back(scope.row.id)' v-else>退租</el-button>	
									    </template>
									</el-table-column>
									
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage"
							      :page-size="pagesize"	
										:page-count='pagecount'	    
							      layout="total, prev, pager, next"
							      :total="total">
							    </el-pagination>
							 	 </div>
							</template>					
							<Dialogue textContent="请在电池完成回收后，再设置该用户退租。退租后，当前子账号失效，不能再添加新的用户。" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="dialogVisible=false"></Dialogue>			
							<el-dialog title="子账号变更记录" :visible.sync="dialogFormVisible" width="500px">
								<div v-for='item in idAmendList' class="font-16 tc subTitle">{{item.addTime}} &nbsp;{{item.type?'更换为':'新添加'}} &nbsp; {{item.username}}</div>
							<div slot="footer" class="dialog-footer">
								<el-button type='success'@click="dialogFormVisible=false">确  定</el-button>
							</div>

							</el-dialog>
				</div>
</template>

<script>
import Dialogue from '@/components/common/Dialogue'
	export default {
		props:['resData'],
      data() {
        return {
					dialogFormVisible:false,
					pagesize:10,
					pagecount:0,
					backId:0,
					dialogVisible:false,
					id:'',
					tableData: [],
					idAmendList:[],
					currentPage:1,
					total:0,
					activeName2: 'first',
					searchData:''
        }
			},
			components:{
				Dialogue
			},
      methods:{
				showVis(msg){
					console.log(msg);
					this.dialogFormVisible=true;
					this.$get('/groupCusReplace/getAll',{id:msg}).then(data=>{
						console.log(data);
						this.idAmendList=data
					})
				},
				toDetails(id){
					this.$router.push({
						path:'/Main/Userdetail',
						query:{
							id:id,
							isdeposit:0
						}
					})
				},
				parentMsg(msg) {
					console.log(msg);
					this.getData(1,msg);
					this.searchData=msg
				},
				back(msg){
					this.dialogVisible=true;
					this.backId=msg;
				},
				confirmIsuse(){
					this.$post('/groupCus/retire',{id:this.backId}).then(data=>{
						console.log(data);
						this.$ye('退租成功');
						this.dialogVisible=false;
						this.getData(this.currentPage,this.searchData)
					})
				},
	      	 handleSizeChange(val) {
					console.log(`每页 ${val} 条`);
					this.getData(val)
	      },
	      handleCurrentChange(val) {
					this.currentPage=val;
					this.getData(val)
	        console.log(`当前页: ${val}`);
				},
				getData(pageNo,name){
					this.$get('/groupCus/getAll',{
						id:this.id,
						state:this.resData.state,
						name:name,
						pageNo:pageNo
					}).then(data=>{
						console.log(data);
						this.tableData=data.datas;
						this.total=data.totalCount;
						this.pagesize=data.pageSize;
						this.pagecount=data.totalPage
					})
				}
	     },
			 mounted:function(){
				 console.log(this);
				 this.id=this.resData.id;
				 this.getData(1)
			 }
    }
</script>

<style>
</style>