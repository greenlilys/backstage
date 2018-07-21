
<template>
	<div class="infomation">
		<div class="mainContent">
			
		
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="10">				
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
					
			</el-col>
			<el-col :span="10" :offset="1">
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
	//省市区三级联动插件
	import Distpicker from 'v-distpicker'

	export default {
		data() {
			return {
				//表单值
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
				//预览图片地址
				 dialogImageUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        		//图片预览框开关
        		dialogVisible: false,
        		//上传图片列表
        		fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],        		
        		 //图片上传附加参数   		
        		upLoadData:{
        			
        		},
        		select: {
					province: '河南',
					city: '郑州市',
					area: '管城区'
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
	.infomation .el-table td{padding:4px 0;}
	.infomation .el-table th{padding:0;background:#ADB4B9;color:#252C30;}	
	.infomation .el-table{font-size:14px;}
	.shopPhoto img{display:block;width:58%;margin-top:10px;}
	.infomation input.el-upload__input{display:none;}
	.uploadBox{line-height:0;}
	.infomation .el-upload-list--picture-card .el-upload-list__item{margin-right:10px;margin-bottom:0;}

	.infomation .mainContent{background:#fff;padding:10px 20px 0;}
	.infomation .el-upload--picture-card{height:100px;width:100px;line-height: 100px;}
	.infomation .el-upload-list--picture-card .el-upload-list__item{height:100px;width:100px;}
	
	.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
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