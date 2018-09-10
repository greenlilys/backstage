<template>
	<div>
		<div class="hf flex-wrap flex-vertical">
			<el-row class="p-10 boxborder bw" type="flex" align="middle">
				<el-col :span="6" :offset="18" class="tr">	
					<router-link to='/Main/Creataccount'>
						<el-button type="success" size="small">+&nbsp;创建员工账号</el-button>	
					</router-link>
				</el-col>
			</el-row>
		
			<div class="paddinglist boxborder mt-10 flex-con bw pr">	
					<el-table :data="tableData" style="width: 100%;">
						<el-table-column prop="username" label="用户账号" width="120" align="center">
						</el-table-column>
						<el-table-column prop="statuss" label="账号状态" width="100" align="center">
						</el-table-column>
						<el-table-column prop="nickname" label="姓名" width="100" align="center">
						</el-table-column>
						<el-table-column prop="phone" label="手机" width="300" align="center">
						</el-table-column>
						<el-table-column prop="job" label="职务" width="120" align="center">
						</el-table-column>
						<el-table-column prop="name" label="权限" width="" align="center">
						</el-table-column>
						<el-table-column prop="action" label="管理" width="250" align="center">
								<template slot-scope="scope">			
									<router-link :to="{path:'/Main/Updateaccount',query:{id:scope.row.id}}">
										<el-button type="warning" size="mini" class="btnStyle">管理</el-button>
									</router-link>							
								<el-button type="warning" size="mini" class="btnStyle" @click="handleUpdate(scope.$index, scope.row)">{{scope.row.status == 0 ? nouse : canuse}}</el-button>	         
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
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
		data() {
			return {
				navtitle:'设置>员工账号管理',
				tableData: [],
				currentPage:1,
				total:0,
				nouse:'禁用',
				canuse:"启用",
				currentStatus:'',
				currentId:'',
				dialogVisible:false,
				textContent:''
			};
		},
		methods: {
				handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        this.getStaffList(val);
				},
				handleUpdate(index,row){//上下架按钮	      	
	      	this.currentStatus = row.status;
	      	this.currentId = row.id;
	      	this.dialogVisible = true;
	      	this.textContent = row.status == 0? "确认禁用员工账号吗？" :"确认启用员工账号吗？";
	      	this.title = "提示";
				},
	      navCreataccount(){
	      	this.$router.push('/Personaccount/Creataccount');
				},
				getStaffList(pageNo){	      	
	      	this.$get('staffaccount/staffList',{
					pageNo:pageNo					
					}).then(data=>{
					var arr = data.datas;
						for(var i = 0,len=arr.length;i<len;i++){
							if(arr[i].status==0){
								arr[i].statuss="正常"
							}else{
								arr[i].statuss="禁用"
							}
						}
						this.tableData = arr;
						this.total = data.totalCount;
					})
				},
				confirmIsuse(){
	       var status = this.currentStatus == 0 ? 1 : 0;
	       var id = this.currentId;       
	      	this.$post('staffaccount/updateStaffState',{
	      		id:id,
	      		status:status
	      	}).then(data=>{
	      		this.dialogVisible = false;
	      		this.getStaffList(this.currentPage);//刷新当前页
	      		this.$ye();
	      	})   	
				}, 
				canceluse(){//取消或者关闭
	      	this.dialogVisible = false;
	      }
		},
		method(){
				this.getStaffList(1);
		},
		mounted:function(){
			this.$sendTitle(this.navtitle);
		},
		created(){
				this.getStaffList(1);
		}, 
		components:{
			Dialogue
    }
	}
</script>

<style scoped>
	
</style>