
<template>
	<div class="addBusiness">
		<div class="mainContent">
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="11">	
				<h2 class="fontYellow font-18 subTitle">基本信息</h2>
					<el-form-item label="员工姓名：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="手机：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="职务：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="QQ：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="微信：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
				<h2 class="fontYellow font-18 subTitle">员工账号</h2>
					<el-form-item label="员工账号：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
						
					<el-form-item label="密码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					
					<el-form-item label="员工账号：">
						<el-input v-model="form.name">
							<el-button slot="append" @click="setCode">重设密码</el-button>	
						</el-input>
					</el-form-item>	
					<el-form-item label="账号状态：">
						<template>
							<el-radio v-model="radio1" label="1">上架</el-radio>
							<el-radio v-model="radio1" label="2">下架</el-radio>					
						</template>
					</el-form-item>	
					<h2 class="fontYellow font-18 subTitle">员工权限</h2>
					<el-form-item label="">
						<el-checkbox-group v-model="checkList">
						    <el-checkbox label="网点管理"></el-checkbox>
						    <el-checkbox label="用户管理"></el-checkbox>
						    <el-checkbox label="商城"></el-checkbox>	
						    <el-checkbox label="电池管理"></el-checkbox>	
						    <el-checkbox label="预约管理"></el-checkbox>	
						    <el-checkbox label="资金管理"></el-checkbox>	
						    <el-checkbox label="统计"></el-checkbox>	
						    <el-checkbox label="设置"></el-checkbox>	
						  </el-checkbox-group>
					</el-form-item>
					
					
						
					<el-form-item>
						<el-row>
							<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">保存</el-button>
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
					name: '88888',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					perimg:'002.png'
				},
				
				checkList:['网点管理'],
				radio1:'2'
				

			}

		},
		methods: {
		
			handleChange(value) {
				console.log(value);
			},
			setCode(){
				console.log("555");
			}
			   
		},
		components: {
			
		},
		mounted: function() {

		}

	}
</script>

<style>	
	.itemTitle{font-size:18px;line-height: 26px;background:}
	.addBusiness .mainContent{background:#fff;padding:10px 20px 0;}
/*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}

</style>