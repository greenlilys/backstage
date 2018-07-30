
<template>
	<div class="addBusiness">
		<div class="mainContent">
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="11">				
					<el-form-item label="运营商名称：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="联系人：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="所在地区：">
						<template>
							<v-distpicker :province="select.province.value" :city="select.city.value" :area="select.area.value" @selected="onSelected"></v-distpicker>
						</template>
					</el-form-item>
					<el-form-item label="详细地址：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
						<el-form-item label="合约运营周期：">
						<template>
							<div class="block">
								<el-date-picker v-model="value7" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</div>
						</template>
					</el-form-item>
					
					<el-form-item label="法人姓名：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="身份证正反面图片：">
							<el-upload
						 class="uploadBox"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  list-type="picture-card"
						  :data="upLoadData"
						  :file-list="fileList2"
						  :beforeUpload="beforeAvatarUpload"
						  :on-preview="handlePictureCardPreview"					  
						  :on-remove="handleRemove"
						  :onError="uploadError"
						  :onSuccess="uploadSuccess"
						  >
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					
					<el-form-item label="营业执照照片：">
							<el-upload
						 class="uploadBox"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  list-type="picture-card"
						  :data="upLoadData"
						  :file-list="fileList2"
						  :beforeUpload="beforeAvatarUpload"
						  :on-preview="handlePictureCardPreview"					  
						  :on-remove="handleRemove"
						  :onError="uploadError"
						  :onSuccess="uploadSuccess"
						  >
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="运营商账号：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="密码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					
			</el-col>
			<el-col :span="12" :offset="1">
				
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
						<el-form-item label="收款账户类型：">
						<template>
							<el-radio v-model="radio" label="1">银行卡</el-radio>
							<el-radio v-model="radio" label="2">支付宝</el-radio>							
						</template>
					</el-form-item>
					<el-form-item label="收款人真实姓名：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="银行：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="银行卡号：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="60V20A：">					
						<el-row>
							<el-col :span="12">
								<el-form-item label="换电费（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台换电费：3.5元/次："></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="12">
								<el-form-item label="月租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台月租：111元"></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row class="mt-10">
							
							<el-col :span="12">
								<el-form-item label="季租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台月租：288元"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="年租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台月租：1080元"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form-item>
					<el-form-item label="72V20A：">					
						<el-row>
							<el-col :span="12">
								<el-form-item label="换电费（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台换电费：3.5元/次："></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="12">
								<el-form-item label="月租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台月租：117元"></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row class="mt-10">
							
							<el-col :span="12">
								<el-form-item label="季租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台月租：306元"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="年租（￥）：" label-width="120px">
									<el-input v-model="input" placeholder="平台月租：1152元"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

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
					desc: '',
					perimg:'002.png'
				},
				 dialogImageUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        		dialogVisible: false,
        		fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        		dynamicTags: ['河南省、郑州市、二七区', '河南省、开封、主城区', '河南省、洛阳、宜阳县'],
        		 inputVisible: false,
        		inputValue: '',
        		upLoadData:{
        			//图片上传的参数
        		},
				
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
				value7: '',
				num1: 5,
				num2: 5,				
				money:1000,
				input:'',
				radio:'2'

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
			},
			//文件列表移除文件时的钩子
			 handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      //点击文件列表中已上传的文件时的钩子
		      handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		      },
		      //上传图片之前的回调
		      beforeAvatarUpload(file){
		      	const extension = file.name.split('.')[1] === 'jpg'
      			const extension2 = file.name.split('.')[1] === 'png'
      			const extension3 = file.name.split('.')[1] === 'jpeg'
      			const isLt500kb = file.size / 1024  < 500
      			 if (!extension && !extension2 && !extension3) {
			        console.log('上传模板只能是 jpg、png、jpeg格式!')
			      }
			      if (!isLt500kb) {
			        console.log('文件大小不能超过500kb!')
			      }
		      },
		      //上传图片失败的回调
		      uploadError(response, file, fileList){
		      	console.log('上传失败，请重试！')
		      },
		      // 上传成功后的回调
			    uploadSuccess (response, file, fileList) {
			      console.log('上传文件', response)
			    },
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
			'v-distpicker': Distpicker
		},
		mounted: function() {

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
	
	.el-tag + .el-tag { margin-left: 10px;}  
	.button-new-tag { margin-left: 10px; height: 32px;line-height: 30px;padding-top: 0;padding-bottom: 0;}
  	.input-new-tag {width: 90px; margin-left: 10px;vertical-align: bottom;}
</style>