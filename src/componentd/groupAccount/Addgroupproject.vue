
<template>
	<div>
		<div class="hf bw p-10 boxborder">
		<el-row>
			<el-form ref="form" :model="form" :rules="rules" label-width="140px" class="addfrouppro">
			<el-col :span="10" class="main-all">
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">基本信息</div><span class="flex-con"></span></h5>				
					<el-form-item label="项目名称：" prop='name'>
						<el-input v-model="form.name" placeholder='请输入项目名称'></el-input>
					</el-form-item>
					<el-form-item label="所在地区：">
						<template>
							<v-distpicker :province="select.province.value" :city="select.city.value" :area="select.area.value" @selected="onSelected"></v-distpicker>
						</template>
					</el-form-item>
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">套餐设置</div><span class="flex-con"></span></h5>
					<h5 class="fonttitle">以下内容是添加每个子账户对应的相关信息设置，请根据合约及到账情况谨慎填写。</h5>
					<el-row>
						<el-col :span='12'>
							<el-form-item label="租用电池类型：">
								<el-select v-model="form.batteryid" placeholder="请选择" @change='sleectType'>
									<el-option
									v-for="item in options"
									:key="item.id"
									:label="item.name"
									:value="item.id">
									</el-option>
								</el-select>						  
							</el-form-item>	
						</el-col>
						<el-col :span='12'>
							<el-form-item label="押金（每组）：" prop='deposit'>
								<el-input v-model="form.deposit"  placeholder="请输入押金金额"></el-input>
							</el-form-item>
						</el-col>
					</el-row>				
					<el-form-item label="租金（每组）：">					
						<el-row>
							<el-col :span="12">
								<el-form-item label="月租（￥）：" label-width="120px" prop='monthrent'>
									<el-input v-model="form.monthrent" placeholder="请输入月租"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="12">
								<el-form-item label="含天牛币：" label-width="120px" prop='monthinte'>
									<el-input v-model="form.monthinte" placeholder="请输入月租天牛币"></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row class="">
							
							<el-col :span="12">
								<el-form-item label="季租（￥）：" label-width="120px" prop='quarterrent'>
									<el-input v-model="form.quarterrent" placeholder="请输入季租"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="含天牛币：" label-width="120px" prop='quarterinte'>
									<el-input v-model="form.quarterinte" placeholder="请输入季租天牛币"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="">
							
							<el-col :span="12">
								<el-form-item label="年租（￥）：" label-width="120px" prop='annualrent'>
									<el-input v-model="form.annualrent" placeholder="请输入年租"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="含天牛币：" label-width="120px" prop='annualinte'>
									<el-input v-model="form.annualinte" placeholder="请输入年租天牛币"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form-item>
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">主账号设置</div><span class="flex-con"></span></h5>
					<h5 class="fonttitle">主账号拥有添加、续租、天牛币充值等操作权限，可新建或使用已有账号</h5>
					<el-form-item>
								<div class="">
							    <el-radio-group v-model="radio4" size="medium" @change='radioChange'>
							      <el-radio-button label="新建主账号" ></el-radio-button>
							      <el-radio-button label="已有主账号"></el-radio-button>					     
							    </el-radio-group>
							  </div>
					</el-form-item>
					
					
					<div class="" v-if="radio4 == '新建主账号' ">
							<el-form-item label="运营商账号：" prop='username'>
								<el-input v-model="form.username" placeholder="请输入运营商账号"></el-input>
							</el-form-item>
							<el-row>
								<el-col :span='12'>
									<el-form-item label="密码：" prop='password' :show-message='showMessage'>
										<el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='12'>
									<el-form-item label="确认密码：" prop='conpassword' :show-message='showMessage'>
										<el-input v-model="form.conpassword" placeholder="请确认密码" type="password"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='12'>
									<el-form-item label="联系人：" prop='contactname' :show-message='showMessage'>
									<el-input v-model="form.contactname" placeholder="请输入联系人"></el-input>
								</el-form-item>
								</el-col>
								<el-col :span='12'>
									<el-form-item label="联系电话：" prop='contactcellphone' :show-message='showMessage'>
									<el-input v-model="form.contactcellphone"  placeholder="请输入联系电话"></el-input>
								</el-form-item>
								</el-col>
							</el-row>

					</div>
					<div v-else>
						<el-form-item label="填写主账号：" prop='username'>
								<el-input v-model="form.username" placeholder="请输入主账号"></el-input>
						</el-form-item>
					</div>
					<!-- <h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">安装网点</div><span class="flex-con"></span></h5>
					<h5 class="fonttitle">指定负责安装的网点信息，完成安装并添加子账号将为该网点创建一条安装预约记录</h5>
					<el-form-item label="安装网点：">
						<el-input v-model="form.name"></el-input>
					</el-form-item> -->
					<el-form-item class="flex-wrap flex-justify-end">
						<el-row class="mt-20">
							<el-button type="primary" @click="submitForm('form')">创建</el-button>
						</el-row>
					</el-form-item>
			
			</el-col>
			</el-form>
		</el-row>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Distpicker from 'v-distpicker'

	export default {
		data() {
			 var validatePass2 = (rule, value, callback) => {
				if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				navtitle:'团购账号>团购项目>添加团购项目',
				form: {
					name: '',//名称
					deposit:'',//押金
					monthrent:'',//月租
					monthinte:'',//月租天牛币
					quarterrent:'',//季租
					quarterinte:'',//季租天牛币
					annualrent:'',//年租
					annualinte:'',//年租天牛币
					username:'',//运营商账号
					password:'',//密码
					conpassword:'',//确认密码
					contactname:'',//联系人
					contactcellphone:'',//联系电话
					batteryid:"",//租用电池类型
					provincename: '',//省
					cityname: '',//市
					countyname: '',//区
					type:0//类型
				},
				showMessage:true,//是否校验验证信息
				rules:{
					name: [
						{ required: true, message: '请输入项目名称', trigger: 'blur' },
						{ min: 3, max: 20, message: '长度在 3 到 20 位', trigger: 'blur' }
					],
					deposit:[
						{ required: true, message: '请输入押金金额', trigger: 'blur' },
						{ min: 1, max: 5, message: '长度在 1 到 5 位', trigger: 'blur' }
					],
					monthrent:[
						{ required: true, message: '请输入月租金额', trigger: 'blur' },
						{ min: 1, max: 5, message: '长度在 1 到 5 位', trigger: 'blur' }
					],
					monthinte:[
						{ required: true, message: '请输入月租天牛币', trigger: 'blur' },
						{ min: 1, max: 10, message: '长度在 1 到 10 位', trigger: 'blur' }
					],
					quarterrent:[
						{ required: true, message: '请输入季租金额', trigger: 'blur' },
						{ min: 1, max: 5, message: '长度在 1 到 5 位', trigger: 'blur' }
					],
					quarterinte:[
						{ required: true, message: '请输入季租天牛币', trigger: 'blur' },
						{ min: 1, max: 10, message: '长度在 1 到 10 位', trigger: 'blur' }
					],
					annualrent:[
						{ required: true, message: '请输入年租金额', trigger: 'blur' },
						{ min: 1, max: 5, message: '长度在 1 到 5 位', trigger: 'blur' }
					],
					annualinte:[
						{ required: true, message: '请输入年租天牛币', trigger: 'blur' },
						{ min: 1, max: 10, message: '长度在 1 到 10 位', trigger: 'blur' }
					],
					username:[
						{ required: true, message: '请输入运营商账号', trigger: 'blur' },
						{ min: 6, max: 16, message: '长度在 6 到 16 位', trigger: 'blur' }
					],
					contactname:[
						{ required: true, message: '请输入联系人', trigger: 'blur' },
						{ min: 2, max: 20, message: '长度在 2 到 20 位', trigger: 'blur' }
					],
					contactcellphone:[
						{ required: true, message: '请输入联系电话', trigger: 'blur' },
						{ min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 16, message: '密码格式不正确，必须为6-16位', trigger: 'blur' }
					],
					conpassword:[
						{ required: true, message: '请再次输入密码', trigger: 'blur' },
						{ min: 6, max: 16, message: '确认密码格式不正确，必须为6-16位', trigger: 'blur' },
						{ validator: validatePass2, trigger: 'blur'}
					]
				},
				options: [],//租用电池类型
				select: {
					province: '',
					city: '',
					area: ''
				},
				radio: '1',
				value: '',
				value7: '',
				num1: 5,
				num2: 5,				
				money:1000,
				input:'',
				radio:'2',
				radio4: '新建主账号',

			}

		},
		methods: {
			onSelected(data) {
				this.form.provincename=data.province.value;
				this.form.cityname=data.city.value;
				this.form.countyname=data.area.value;
			},
			// 表单验证事件
			submitForm(formName) {
				var that=this;
				console.log(this.form)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(that.form.provincename==''||that.form.cityname==''||that.form.countyname==''){
							that.$message.error('请选择地区信息');
						}else{
							that.$post('/groupPro/add',that.form).then(data=>{
								this.$ye('创建成功');
								this.$router.push('/Main/Groupproject');
							})
						}
					} else {
						return false;
					}
				});
			},
			getCell(){
				var that=this;
				this.$get('/battery/selectList',{putway:0}).then(data=>{
					console.log(data)
					that.options=data.datas;
					that.form.batteryid=data.datas[0].id
				})
			},
			sleectType(data){
				this.form.batteryid=data
			},
			radioChange(data){
				console.log(data);
				this.form.username='';
				this.form.password='';
				this.form.conpassword='';
				this.form.contactname='';
				this.form.contactcellphone='';
				if(data=='已有主账号'){
					this.showMessage=false;
					this.form.type=1
				}else{
					this.form.type=0
				}
			}
			  
		},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.$sendTitle(this.navtitle);
			this.getCell();
		}

	}
</script>
.
<style>	
	.main-all{
		max-width: 800px
	}
	.main-all .fonttitle{line-height: 30px}	

/*输入框下间距样式重置*/
	.addfrouppro .el-form-item {	margin-bottom: 22px;}
/*日期选择组件宽度*/
	.el-date-editor--daterange.el-input__inner {width: 100%;}
/*图片上床选择组件样式重置*/
	.addBusiness input.el-upload__input{display:none;}
	.uploadBox{line-height:0;}
	.addBusiness .el-upload-list--picture-card .el-upload-list__item{margin-right:10px;margin-bottom:0;height:100px;width:100px;}
	.addBusiness .el-upload--picture-card{height:100px;width:100px;line-height: 100px;}
/*省市县组件样式重置*/	
	.distpicker-address-wrapper select{width:28%;}
	
	
</style>