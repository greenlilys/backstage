
<template>
	<div>
		<el-row class="changeInfo bw contentBox hf">
			<el-col :span="12">
				<el-form ref="form" :model="form" label-width="120px">
					<el-form-item label="店主姓名：">
						<el-input v-model="form.contactname" clearable></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.contactcellphone" clearable></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.contactno" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺名称：">
						<el-input v-model="form.shopName" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺编号：">
						<el-input v-model="form.no" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺所在地区：">
						<template>
							<v-distpicker :province="select.province.value" :city="select.city.value" :area="select.area.value" @selected="onSelected"></v-distpicker>
						</template>
					</el-form-item>
					<el-form-item label="店铺详细地址：">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
					<el-form-item label="店铺位置坐标：">
						<el-row>
							<el-col :span="11">
								<el-form-item label="X：" label-width="20px">
									<el-input v-model="form.x" placeholder="请输入横坐标：" clearable></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="11" :offset="2">
								<el-form-item label="Y：" label-width="20px">
									<el-input v-model="form.y" placeholder="请输入纵坐标：" clearable></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form-item>
					<el-form-item label="加盟有效期：">
						<template>
							<div class="block">

								<el-date-picker v-model="form.signtimebegin" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</div>
						</template>

					</el-form-item>
					<el-form-item label="APP网点账号：">
						<el-input v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="APP帐号密码：">
						<el-input v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="账号状态：">
						<template>
						  <el-radio v-model="form.status" label="0">启用</el-radio>
						  <el-radio v-model="form.status" label="1">禁用</el-radio>
						</template>
					</el-form-item>
				
					<el-form-item label="配货数量：">
						<el-row>
							<el-col :span="11" v-for="item in battery" :key="item.value">
								<span class="btnStyle battery" label="item.mode" :value="item.id"></span>
								<template>
									<el-input-number v-model="form.num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
								</template>
							</el-col>
						</el-row>
					</el-form-item>

					<el-form-item label="已缴保证金：">
						<el-row>
							<el-col :span="24">
								<el-form-item label="￥" label-width="20px">
									<el-input v-model="form.platbond" placeholder="请输入保证金" clearable></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form-item>

					<el-form-item label="所属运营商：">
						<template>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</template>
					</el-form-item>

					<el-form-item>
							<el-button type="warning" class="btnStyle" @click="submitForm('ruleForm2')">保存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import Vue from 'vue'
	import Distpicker from 'v-distpicker'

	export default {
		data() {
			return {
				form: {
					name: '0',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				battery: [],
				options: [],
				tableData: [],
				select: {
					province: '河南',
					city: '郑州市',
					area: '管城区'
				},
				radio: '1',
				value: '',
				value7: '',
				num1: 0,
				num2: 0,				
				money:1000,
				input:''

			}

		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleChange(value) {
				console.log(value);
			},
			onSelected(data) {
				console.log(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
			}
		},
		methods:{
	      getOperator(){
		      this.$get('operAdmin/getAll',{
						pageSize:100	
					}).then(data=>{
					this.options = data.datas;
	    		})
		  },
		   getBattery(){ 
		      this.$get('shop/skipAddShop',{
						pageSize:100	
					}).then(data=>{
					this.battery= data.datas;
	    		})
		  }
		  
    	},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.getOperator()
			this.getBattery()
		}

	}
</script>

<style>
	.battery {background: #F4F6F9;color: #58595D;border: #D8DBE3 1px solid;	padding: 11px;}	
	.el-select {width: 100%;}
	.el-date-editor--daterange.el-input__inner {width: 100%;}
	.el-input-number {width: 120px;}
	.distpicker-address-wrapper select {width: 32.8%;}	
	.changeInfo .el-table td{padding:4px 0;}
	.changeInfo .el-table th{padding:0;background:#ADB4B9;color:#252C30;}	
	.changeInfo .el-table{font-size:14px;}
	.changeInfo .el-col-offset-2{margin-left:10px;}
</style>