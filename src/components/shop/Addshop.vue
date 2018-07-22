
<template>
	<div class="bgHui changeInfo">
		<el-row>
			<el-col :span="12">
				<el-form ref="form" :model="form" label-width="120px">
					<el-form-item label="店主姓名：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="店铺名称：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="店铺编号：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="店铺所在地区：">
						<template>
							<v-distpicker :province="select.province.value" :city="select.city.value" :area="select.area.value" @selected="onSelected"></v-distpicker>
						</template>
					</el-form-item>
					<el-form-item label="店铺详细地址：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="店铺位置坐标：">
						<el-row>
							<el-col :span="11">
								<el-form-item label="X：" label-width="20px">
									<el-input v-model="input" placeholder="请输入内容："></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="11" :offset="2">
								<el-form-item label="Y：" label-width="20px">
									<el-input v-model="input" placeholder="请输入内容："></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form-item>
					<el-form-item label="加盟有效期：">
						<template>
							<div class="block">

								<el-date-picker v-model="value7" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</div>
						</template>

					</el-form-item>
					<el-form-item label="手机账号：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="账号状态：">
						
						<template>
						  <el-radio v-model="radio" label="1">启用</el-radio>
						  <el-radio v-model="radio" label="2">禁用</el-radio>
						</template>
					</el-form-item>
				
					<el-form-item label="配货数量：">
						<el-row>
							<el-col :span="11">
								<span class="btnStyle battery">6020锂电池</span>
								<template>
									<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
								</template>
							</el-col>

							<el-col :span="11" :offset="2">
								<span class="btnStyle battery">7020锂电池</span>
								<template>
									<el-input-number v-model="num2" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
								</template>
							</el-col>
							<!--<template>
								<el-table :data="tableData" border style="width: 100%;">
									<el-table-column prop="date" label="电池套餐名称" width="120" align="center">
									</el-table-column>
									<el-table-column prop="name" label="电池型号" width="100" align="center">
									</el-table-column>
									<el-table-column prop="address" label="套餐电池数量" align="center">
									</el-table-column>
									<el-table-column prop="money" label="配货数量" align="center">
									</el-table-column>									
								</el-table>
							</template>-->
						</el-row>
					</el-form-item>

					<el-form-item label="已缴保证金：">
						<el-row>
							<el-col :span="24">
								<el-form-item label="￥" label-width="20px">
									<el-input v-model="money" placeholder="请输入内容"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form-item>

					<el-form-item label="所属运营商：">
						<template>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</template>
					</el-form-item>

					<el-form-item>
							<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">保存</el-button>
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
					name: '88888',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
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
				tableData: [{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '1518 ',
		            money:50.00,
		            action:'查看详情'
		          }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: ' 1517',
		            money:50.00,
		            action:'查看详情'
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
				alert(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
				console.log(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
			}
		},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {

		}

	}
</script>

<style>
	
	.battery {background: #F4F6F9;color: #58595D;border: #D8DBE3 1px solid;	padding: 11px;}
	.el-form-item {	margin-bottom: 10px;}
	.el-select {width: 100%;}
	.el-date-editor--daterange.el-input__inner {width: 100%;}
	.el-input-number {width: 120px;}
	.distpicker-address-wrapper select {width: 32.8%;}	
	.changeInfo .el-table td{padding:4px 0;}
	.changeInfo .el-table th{padding:0;background:#ADB4B9;color:#252C30;}	
	.changeInfo .el-table{font-size:14px;}
	.changeInfo .el-col-offset-2{margin-left:10px;}
</style>