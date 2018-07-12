<template>
	<div class="bgcolor bgZhongHui">
		<el-row class="row joinshop" type="flex" align="middle">
			<el-col :span="6">
				上线状态：
				<template>
					<el-radio v-model="radio" label="1">备选项</el-radio>
					<el-radio v-model="radio" label="2">备选项</el-radio>
					<el-radio v-model="radio" label="3">备选项</el-radio>
				</template>
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">筛选</el-button>
					</el-input>
				</div>
			</el-col>

			<el-col :span="6" :offset="6" style="text-align:right;">
				<button type="button" class="btn btnReset">
				  <span class="glyphicon glyphicon-plus"></span>  &nbsp;添加网点
				</button>
			</el-col>

		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				radio: '1',
				find: ''
			};
		},
		methods: {

		}
	}
</script>

<style scoped>
	.bgcolor {width: 100%;padding-top: 10px;padding-left: 10px;box-sizing: border-box;height: 880px;}	
	.joinshop {	background: #fff;padding: 10px 20px;}	
	.row {margin: 0;}
	.joinshop .btnReset{color:#fff;}
</style>