
<template>
	<div class="addBusiness">
		<div class="mainContent">
			
		
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="11">	
				<h2 class="fontYellow font-18 subTitle">商品标签</h2>
					<el-form-item label="套餐名称：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="电池型号：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="电池数量（组）：">
						<el-row>
							<el-col :span="11">								
								<template>
									<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
								</template>
							</el-col>
					</el-row>
					</el-form-item>
					
					<el-form-item label="电池说明：">
						<el-input
						  type="textarea"
						  :rows="2"
						  placeholder="请输入内容"
						  v-model="textarea">
						</el-input>
					</el-form-item>
					<h2 class="fontYellow font-18 subTitle">电池价格</h2>
					<el-form-item label="配货成本（￥）：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
						
					<el-form-item label="押金金额（￥）：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="市场售价（￥）：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<h2 class="fontYellow font-18 subTitle">换电费</h2>
					<el-form-item label="换电费（￥）/次：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<h2 class="fontYellow font-18 subTitle">租金价格</h2>
					<el-form-item label="月租（￥）：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="季租（￥）：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>	
					<el-form-item label="年租（￥）：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>	
					<h2 class="fontYellow font-18 subTitle">上架状态</h2>
					<el-form-item label="上架状态：">
						<template>
							<el-radio v-model="radio" label="1">上架</el-radio>
							<el-radio v-model="radio" label="2">下架</el-radio>					
						</template>
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
				num1: 5,
				textarea:'',
				radio: '1'
				

			}

		},
		methods: {
		
			handleChange(value) {
				console.log(value);
			},
			
			   
		},
		components: {
			
		},
		mounted: function() {

		}

	}
</script>

<style scoped>	
	.itemTitle{font-size:18px;line-height: 26px;background:}
	.addBusiness .mainContent{background:#fff;padding:10px 20px 0;}
/*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}
	
</style>