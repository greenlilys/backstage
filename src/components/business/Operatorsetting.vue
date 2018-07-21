
<template>
	<div class="operatorSetting">
		<div class="mainContent">
		
		<el-row>
			<el-form ref="form" :model="form" label-width="100px">
		
			<el-col :span="12">
				
					<el-form-item label="运营商级别：">
						<template>
							<el-radio v-model="radio" label="1">平台自营</el-radio>
							<el-radio v-model="radio" label="2">一级运营商</el-radio>
							<el-radio v-model="radio" label="3">二级运营商</el-radio>
							<el-radio v-model="radio" label="4">三级运营商</el-radio>
							<el-radio v-model="radio" label="5">四级运营商</el-radio>
						</template>
						<div>代理费用：400000.00&nbsp;&nbsp;&nbsp;&nbsp;分润比例：45%经营收益</div>
					</el-form-item>
					
					<el-form-item label="运营区域：">					
						<el-tag
						  :key="tag"
						  v-for="tag in dynamicTags"
						  closable
						  :disable-transitions="false"
						  @close="handleClose(tag)">
						  {{tag}}
						</el-tag>
						<el-input
						  class="input-new-tag"
						  v-if="inputVisible"
						  v-model="inputValue"
						  ref="saveTagInput"
						  size="small"
						  @keyup.enter.native="handleInputConfirm"
						  @blur="handleInputConfirm"
						>
						</el-input>
						<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加运营区域</el-button>
					</el-form-item>
					<el-form-item label="运营商账号：">
						<span>548966</span>
					</el-form-item>
					<el-form-item label="重置密码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-row class="mt-20">
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
				dynamicTags: ['河南省、郑州市、二七区', '河南省、开封、主城区', '河南省、洛阳、宜阳县'],
				inputVisible: false,
        		inputValue: '',
				radio: '1',
				value: '',
				value7: '',
				num1: 5,
				num2: 5,				
				money:1000,
				input:'',
				radio:'2'

			}

		},
		methods: {
				handleClose(tag) {
			        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			      },
			
			      showInput() {
			        this.inputVisible = true;
			        this.$nextTick(_ => {
			          this.$refs.saveTagInput.$refs.input.focus();
			        });
			      },
			       handleInputConfirm() {
			        let inputValue = this.inputValue;
			        if (inputValue) {
			          this.dynamicTags.push(inputValue);
			        }
			        this.inputVisible = false;
			        this.inputValue = '';
			      }
		},
		components: {
			
		},
		mounted: function() {

		}

	}
</script>

<style>
	.el-form-item {	margin-bottom: 10px;}
	.operatorSetting .mainContent{background:#fff;padding:10px 20px 0;}
	.el-tag + .el-tag { margin-left: 10px; }
  .button-new-tag { margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>