
<template>
	<div>
		<div class="mainContent bw">
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
						<el-input v-model="form.username"></el-input>
					</el-form-item>
						
					<el-form-item label="密码：">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input type="password" v-model="form.passwords"></el-input>
					</el-form-item>				
					
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">员工权限</div><span class="flex-con"></span></h5>
					<el-form-item label="">
						<el-checkbox-group v-model="checkLists">
						    <el-checkbox :label="item.id"  v-for="item in checkList" :key="item.value" class="check-lef">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>	
					<el-form-item>
						<el-row>
							<el-button type="success"  @click="addStaff()">保存</el-button>
						</el-row>
					</el-form-item>
			</el-col>
			
			</el-form>
		</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navtitle:'设置>员工账号管理>创建员工账号',
				form: {
					nickname: '',
					phone: '',
					job: '',
					qq: '',
					wechat: '',
					username: '',
					password: '',
					passwords: ''
				},
				checkList:[],
				checkLists:[]
			}
		},
		methods: {		
			handleChange(value) {
				console.log(value);
			},
			setCode(){
				console.log("555");
			},
			addStaff(){ 
				var list = this.checkLists;
				console.log(list) ;
				this.$post('staffaccount/addStaff',{
					nickname:this.form.nickname,
					phone:this.form.phone,
					job:this.form.job,
					qq:this.form.qq,
					wechat:this.form.wechat,
					username:this.form.username,
					password:this.form.password,
					passwords:this.form.passwords,
					resourcesid:this.checkLists
				}).then(data=>{
					this.$ye();
					this.$router.push('/Main/Personaccount');
				})
			},
			StaffList(){    
				this.$get('staffaccount/skipAdd',{
				}).then(data=>{
					console.log(data)
					this.checkList=data;
				})
			},

		},
		components: {
		},
		mounted(){
			this.StaffList();
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style scoped>	
	.itemTitle{font-size:18px;line-height: 26px;background:}
	.mainContent{padding:10px;box-sizing: border-box;}
/*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}
	.check-lef{margin-left: 0;margin-right: 30px}
</style>