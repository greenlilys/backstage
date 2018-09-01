
<template>
	<div class="addBusiness">
		<div class="mainContent">
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="9">				
				<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">基本信息</div><span class="flex-con"></span></h5>
					<el-form-item label="员工姓名：">
						<el-input v-model="form.nickname"></el-input>
					</el-form-item>
					<el-form-item label="手机：">
						<el-input v-model="form.phone"></el-input>
					</el-form-item>
					<el-form-item label="职务：">
						<el-input v-model="form.job"></el-input>
					</el-form-item>
					<el-form-item label="QQ：">
						<el-input v-model="form.qq"></el-input>
					</el-form-item>
					<el-form-item label="微信：">
						<el-input v-model="form.wechat"></el-input>
					</el-form-item>
				    
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">员工账号</div><span class="flex-con"></span></h5>
					<el-form-item label="员工账号：">
						<el-input v-model="form.username" :disabled="true">
							<el-button slot="append" @click="setCode">重设密码</el-button>	
						</el-input>
					</el-form-item>	
					<el-form-item label="账号状态：">
						<el-radio-group v-model="form.status">
							<template>
								<el-radio :label="0">启用</el-radio>
								<el-radio :label="1">禁用</el-radio>
							</template>
						</el-radio-group>
					</el-form-item>	
					
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">员工权限</div><span class="flex-con"></span></h5>
					<el-form-item>
						<el-checkbox-group v-model="checkbox">
						    <!-- <el-checkbox v-for="item in form.resourceList" :checked="item.isChecks" :key="item.id" class="check-lef">{{item.name}}</el-checkbox> -->
							<el-checkbox :label="item.id" v-for="item in form.resourceList" :key="item.value" class="check-lef">{{item.name}}</el-checkbox>
							<!-- <el-checkbox :label="item.id"  v-for="item in checkList" :key="item.value" class="check-lef">{{item.name}}</el-checkbox> -->
						  </el-checkbox-group>
					</el-form-item>		
					<el-form-item>
						<el-row>
							<el-button type="success" @click="submitForm()">保存</el-button>
						</el-row>
					</el-form-item>
			</el-col>
			</el-form>
		</el-row>
		</div>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
				<el-form :model="form1">
					<el-form-item label="账号密码：" :label-width="formLabelWidth">
						 <el-input type="password" v-model="form1.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：" :label-width="formLabelWidth">
						 <el-input type="password" v-model="form1.passwords"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="success" @click="updataPass">确 定</el-button>
				</div>
			</el-dialog>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				checkbox:[],
				navtitle:'设置>员工账号管理>管理',
				formLabelWidth: '120px',
				form: {
				},
				form1:{
					password:'',
					passwords:''
				},
				checkList:[],
				dialogFormVisible:false,
			}
		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			getStaff(id){	  
				var that=this;    	
	        	this.$get('staffaccount/staffInfo',{
					id:this.id					
				}).then(data=>{
				
					var check= data;	
					for(var i = 0,len=check.length;i<len;i++){
						if(check[i].isCheck==0){
							check[i].isChecks=true;
						}else{
							check[i].isChecks=false;
						}
						
					}
					console.log(check);
					this.form =check
					console.log("---------"+check)
					//
					var list=[];
					for(var i=0;i<data.resourceList.length;i++){
						if(!data.resourceList[i].isCheck){
							list.push(data.resourceList[i].id)
						}
					}
					that.checkbox=list;
					this.form =check;							

				})
            },
            StaffList(){    
				this.$get('staffaccount/skipAdd',{
				}).then(data=>{
					console.log(data);
					this.checkList=data;
				})
			},
            submitForm(){
	      	    this.$post('staffaccount/updateStaff',{
                    id:this.id,
	      		    nickname:this.form.nickname,
					phone:this.form.phone,
					job:this.form.job,
					qq:this.form.qq,
					wechat:this.form.wechat,
					username:this.form.username,
					status:this.form.status,
					resourcesid:this.checkbox
                }).then(data=>{
					this.$ye();
                })
			},
            setCode(){
				this.dialogFormVisible = true;
			},
			updataPass(){
				this.$post('staffaccount/updateStaffPass',{
				id:this.id,
				password:this.form1.password,
				passwords:this.form1.passwords
				}).then(data=>{
					this.dialogFormVisible = false;			     				     		
					this.$ye();	
				})
			}
        },
        created(){	  	
	  	this.id = this.$route.query.id;
	    },
		components: {
		},
		mounted(){
			this.StaffList();
			this.getStaff(this.id);     
			this.$sendTitle(this.navtitle);       
		}

	}
</script>

<style>	
	.itemTitle{font-size:18px;line-height: 26px;background:}
	.addBusiness .mainContent{background:#fff;padding:10px 20px 0;}
    /*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}
	.check-lef{
		margin-left: 0 !important;
		margin-right: 30px !important
		}
</style>