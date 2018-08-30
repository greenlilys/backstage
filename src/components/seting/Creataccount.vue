
<template>
	<div class="addBusiness">
		<div class="mainContent">
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="11">	
				<h2 class="fontYellow font-18 subTitle">基本信息</h2>
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
				<h2 class="fontYellow font-18 subTitle">员工账号</h2>
					<el-form-item label="员工账号：">
						<el-input v-model="form.username"></el-input>
					</el-form-item>
						
					<el-form-item label="密码：">
						<el-input type="password" v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input type="password" v-model="form.passwords"></el-input>
					</el-form-item>
					
					<h2 class="fontYellow font-18 subTitle">员工权限</h2>
					<el-form-item label="">
						<el-checkbox-group v-model="checkLists">
						    <el-checkbox :label="item.id"  v-for="item in checkList" :key="item.value">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>	
					<el-form-item>
						<el-row>
							<el-button type="warning" class="btnStyle" @click="addStaff()">保存</el-button>
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
					this.checkList=data;
				})
			},

		},
		components: {
		},
		mounted(){
			this.StaffList();
		}

	}
</script>

<style>	
	.itemTitle{font-size:18px;line-height: 26px;background:}
	.addBusiness .mainContent{background:#fff;padding:10px 20px 0;}
/*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}

</style>