
<template>
	<div class="addBusiness">
		<div class="mainContent">
			
		
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="9">				
					<el-form-item label="项目名称：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="所在地区：">
						<template>
							<v-distpicker :province="select.province.value" :city="select.city.value" :area="select.area.value" @selected="onSelected"></v-distpicker>
						</template>
					</el-form-item>
					
					<el-form-item label="租用电池类型：">
						<el-select v-model="value" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						 </el-select>						  
					</el-form-item>					
					<el-form-item label="押金（每组）：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="租金（每组）：">					
						<el-row>
							<el-col :span="12">
								<el-form-item label="月租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="12">
								<el-form-item label="含天牛币：" label-width="120px">
									<el-input v-model="form.monthRentBi" placeholder="21000"></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row class="mt-10">
							
							<el-col :span="12">
								<el-form-item label="季租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="含天牛币：" label-width="120px">
									<el-input v-model="form.seasonRentBi" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="mt-10">
							
							<el-col :span="12">
								<el-form-item label="年租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="含天牛币：" label-width="120px">
									<el-input v-model="form.yearRentBi" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form-item>
					<el-form-item>
								<div class="mt-10">
							    <el-radio-group v-model="radio4" size="medium">
							      <el-radio-button label="新建主账号" ></el-radio-button>
							      <el-radio-button label="已有主账号"></el-radio-button>					     
							    </el-radio-group>
							  </div>
					</el-form-item>
					
					
					<div class="mt-10" v-if="radio4 == '新建主账号' ">
							<el-form-item label="运营商账号：">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item label="密码：">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item label="确认密码：">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item label="联系人：">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item label="联系电话：">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							
					</div>
					<div v-else>
						<el-form-item label="填写主账号：">
								<el-input v-model="form.name"></el-input>
						</el-form-item>
					</div>
					<el-form-item label="安装网点：">
								<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-row class="mt-20">
							<el-button type="success" @click="submitForm('ruleForm2')">创建</el-button>
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
			return {
				navtitle:'团购账号>团购项目>添加团购项目',
				form: {
					name: '88888',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					perimg:'002.png',
					monthRentBi:'21000',
					seasonRentBi:'63000',
					yearRentBi:'252000'
				},
				 
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				
				select: {
					province: '河南',
					city: '郑州市',
					area: '管城区'
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
				alert(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
				console.log(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
			}		
			
			  
		},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.$sendTitle(this.navtitle);
		}

	}
</script>

<style>	
	.addBusiness .mainContent{background:#fff;padding:10px 20px 0;}
/*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}
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