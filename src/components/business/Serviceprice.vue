<template>
	<div class="servicePrice">
		<el-row>
			<el-col :span="8">
			<el-form ref="form" :model="form" label-width="150px">
							<div class="font-16 batteryType fontYellow">60V20A</div>					
							<el-form-item label="换电费（￥）：" >
								<el-input v-model="input" placeholder="平台换电费：3.5元/次："></el-input>
							</el-form-item>
					
							<el-form-item label="月租（￥）：" >
								<el-input v-model="input" placeholder="平台月租：111元"></el-input>
							</el-form-item>
					
							<el-form-item label="季租（￥）：" >
								<el-input v-model="input" placeholder="平台月租：288元"></el-input>
							</el-form-item>
					
							<el-form-item label="年租（￥）：" >
								<el-input v-model="input" placeholder="平台月租：1080元"></el-input>
							</el-form-item>
							<div class="font-16 batteryType mt-20 fontYellow">72V20A</div>	
							<el-form-item label="换电费（￥）：">
								<el-input v-model="input" placeholder="平台换电费：3.5元/次："></el-input>
							</el-form-item>
						
							<el-form-item label="月租（￥）：">
								<el-input v-model="input" placeholder="平台月租：117元"></el-input>
							</el-form-item>
						
							<el-form-item label="季租（￥）：">
								<el-input v-model="input" placeholder="平台月租：306元"></el-input>
							</el-form-item>
						
							<el-form-item label="年租（￥）：">
								<el-input v-model="input" placeholder="平台月租：1152元"></el-input>
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
	export default{
		data(){
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
				input:''
			}
		}
	}
</script>

<style>
.servicePrice .batteryType{line-height:30px;margin:10px;}
.servicePrice .el-form-item{margin-bottom:10px;}
</style>