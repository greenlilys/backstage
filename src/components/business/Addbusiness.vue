
<template>
	<div>
		<div class="addBusiness hf">
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="11">				
					<el-form-item label="运营商名称：">
						<el-input v-model="form.name" clearable></el-input>
					</el-form-item>
					<el-form-item label="联系人：">
						<el-input v-model="form.contactname" clearable></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.contactcellphone" clearable></el-input>
					</el-form-item>
					<el-form-item label="所在地区：">
						<template>
							<v-distpicker @selected="onSelected"></v-distpicker>
						</template>
					</el-form-item>
					<el-form-item label="详细地址：">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
						<el-form-item label="合约运营周期：">
						<template>
							<div class="block">
								<el-date-picker v-model="valueTime" type="daterange" align="right" range-separator="至" 
									value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleTime">
								</el-date-picker>
							</div>
						</template>
					</el-form-item>
					
					<el-form-item label="法人姓名：">
						<el-input v-model="form.legalperson" clearable></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.legalID" clearable></el-input>
					</el-form-item>
					<el-form-item label="身份证正反图片：">
								<el-upload
							 class="uploadBox"
							  :action="actionAddress"
							  :on-preview="handlePicture"
							  list-type="picture-card"							  
							  :limit="2"
							  :file-list="fileList"
							  :beforeUpload="beforeAvatarUpload"							 
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
						  :action="actionAddress"
						   :on-preview="handlePicture"
						  list-type="picture-card"						 
						  :file-list="fileList1"
						  :limit="1"
						  :beforeUpload="beforeAvatarUpload"						 
						  :onError="uploadError"
						  :onSuccess="uploadSuccess1"
						  >
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
					<el-form-item label="运营商账号：">
						<el-input v-model="form.username" clearable></el-input>
					</el-form-item>
					<el-form-item label="密码：">
						<el-input v-model="password1" @change="confirmFirst" clearable></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input v-model="password2" @change="confirmSecond" clearable></el-input>
					</el-form-item>
					
			</el-col>
			<el-col :span="12" :offset="1">				
					<el-form-item label="运营商级别：">						
							<el-radio-group v-model="radio1"  @change = "handleRadio1">
								<template v-for="item in operLevellist">
									<el-radio  :label="item.id" :key="item.id">{{item.name}}</el-radio>
								</template>								
							</el-radio-group>
						<div v-if=" curid != '' ">代理费用：{{curagencyfee}}&nbsp;&nbsp;&nbsp;&nbsp;分润比例：{{curratio}}</div>
					</el-form-item>
						<el-form-item label="收款账户类型：">
						<template>
							<el-radio-group v-model="radio2"  @change = "handleRadio2">
								<el-radio  label="0">银行卡</el-radio>
								<el-radio  label="1">支付宝</el-radio>	
							</el-radio-group>
						</template>
					</el-form-item>
					<el-form-item label="收款人真实姓名：">
						<el-input v-model="form.realname" clearable></el-input>
					</el-form-item>
					<el-form-item label="银行：">
						<el-input v-model="form.bank" clearable></el-input>
					</el-form-item>
					<el-form-item label="银行卡号：">
						<el-input v-model="form.bankcard" clearable></el-input>
					</el-form-item>
					<template v-for="items in battery">
						<el-form-item :label="items.mode +'：' ">					
							<el-row>
								<el-col :span="12">
									<el-form-item label="换电费（元）：" label-width="120px">
										<el-input v-model="items.powerrates" :placeholder=" '平台换电费：' + items.powerrate + '元/次' " clearable></el-input>
									</el-form-item>
								</el-col>
	
								<el-col :span="12">
									<el-form-item label="月租（元）：" label-width="120px">
										<el-input v-model="items.monthrents" :placeholder=" '平台月租：' + items.monthrent + '元' " clearable></el-input>
									</el-form-item>
								</el-col>
								
							</el-row>
							<el-row class="mt-10">
								
								<el-col :span="12">
									<el-form-item label="季租（元）：" label-width="120px">
										<el-input v-model="items.quarterrents" :placeholder=" '平台季租：' + items.quarterrent +'元' " clearable></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="年租（元）：" label-width="120px">
										<el-input v-model="items.annualrents" :placeholder=" '平台年租：' + items.annualrent + '元' " clearable></el-input>
									</el-form-item>
								</el-col>
							</el-row>
	
						</el-form-item>
					</template>
					<p class="font-14 fontYellow tr mb-20">服务费根据运营区域可进行单独设定，不得低于平台基础定价。</p>
					<el-form-item label="运营区域：">						
						<v-distpicker @selected="onSelecteArea"></v-distpicker>						
						<el-tag
						  :key="tag"
						  v-for="tag in dynamicTags"
						  closable
						  :disable-transitions="false"
						  @close="handleClose(tag)">
						  {{tag}}
						</el-tag>
					</el-form-item>
					<el-form-item>
						<el-row class="mt-20">
							<el-button type="warning" class="btnStyle" @click="submitForm">保存</el-button>
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
					region: [], //运营区域
					battery:[]
				},
				password1: '',
				password2: '',
				valueTime: [], //合约周期
				actionAddress: '',
				dialogImageUrl: '',
				dialogVisible: false,
				fileList: [], //身份证照片
				fileList1: [], //营业执照照片      		
				radio1: '1', //运营商级别
				operLevellist:[],//运营商级别列表
				curid:'',//当前运营级别id
				curagencyfee:'',
				curratio:'',
				radio2:'',
				battery:[],	
				dynamicTags: [],
				
				inputVisible: false,
				inputValue: '',

				tableData: [],
				

				value7: '',
				num1: 5,
				num2: 5,
				money: 1000,
				input: '',
				radio: '2'

			}

		},
		methods: {
			
			handlePicture(file){
				this.dialogImageUrl = file.url;
        		this.dialogVisible = true;
			},
			handleTime(v) { //运营周期
				console.log(v);
				this.form.signtimebegin = v[0];
				this.form.signtimeend = v[1];
			},
			handleChange(value) {
				console.log(value);
			},
			onSelected(data) { //地区选择器				
				this.form.provincename = data.province.value;
				this.form.cityname = data.city.value;
				this.form.countyname = data.area.value;
				console.log(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value);
			},
			beforeAvatarUpload(file) { //上传图片之前的回调
				const extension = file.name.split('.')[1] === 'jpg'
				const extension2 = file.name.split('.')[1] === 'png'
				const extension3 = file.name.split('.')[1] === 'jpeg'
				const isLt500kb = file.size / 1024 < 500
				if(!extension && !extension2 && !extension3) {
					this.$fail('上传图片格式只能是 jpg、png、jpeg!');
					return false;

				}
				if(!isLt500kb) {
					this.$fail('图片大小不能超过500kb!');
					return false;
				}
			},
			uploadError(response, file, fileList) { //上传图片失败的回调
				this.$fail('上传失败，请重试！');

			},
			uploadSuccess(response, file, fileList) { // 上传成功后的回调
				console.log('上传文件', response)
				console.log('上传文件', fileList)
				this.form.IDfront = fileList[0].url;
				if(fileList.length == 2) {
					this.form.IDback = fileList[1].url;
				}

			},
			uploadSuccess1(response, file, fileList) {
				this.form.otherimg = fileList[0].url;
			},
			confirmFirst(v) {
				this.password1 = v;
				console.log(v)
			},
			confirmSecond(v) {
				if(this.password1 !== '' && this.password1 === v) {
					this.form.password = v;
				} else {
					this.$fail('密码输入不一致！')
				}

			},
			getOperLevel() { //获取运营商级别
				this.$get('operLevel/getAll', {

				}).then(data => {
					this.operLevellist = data.reverse();
					this.radio1 = this.operLevellist[0].id;
					this.handleRadio1(this.radio1);
				})
			},
			handleRadio1(v) { //选择运营商级别
				this.curid = this.form.levelid = v;
				let operLevellist = this.operLevellist;
				for(let i = 0,len = operLevellist.length;i<len; i++){
					if(operLevellist[i].id == v){
						this.curagencyfee = operLevellist[i].agencyfee;
						this.curratio = operLevellist[i].ratio;
					}
				}				
				
			},
			handleRadio2(v){
				this.form.acctype = v;				
			},
			getBattery(){ 
		      this.$get('shop/skipAddShop',{
						pageSize:100,
						putway:0
					}).then(data=>{
					this.battery= data.datas.reverse();
	    		})
		    },
		    onSelecteArea(data){
		    	let tag = data.province.value + ' 、 ' + data.city.value + ' 、 ' + data.area.value;
		    	let obj = {};
		    	if(tag){
		    		this.dynamicTags.push(tag);
		    	}
		    	obj.provincename = data.province.value;
		    	obj.cityname = data.city.value;
		    	obj.countyname = data.area.value;
		    	this.form.region.push(obj);
		    },

			handleClose(tag) {
				let index = this.dynamicTags.indexOf(tag);
				this.dynamicTags.splice(index, 1);
				this.form.region.splice(index, 1);
				console.log(this.form.region)
			},		
			
			submitForm(){
				let form = this.form;
				let battery = this.battery;
				for(let i = 0,len = battery.length;i<len;i++){
					let obj = {};					
					obj.batteryid = battery[i].id;
					obj.powerrate = battery[i].powerrates || '';
					obj.monthrent = battery[i].monthrents || '';
					obj.quarterrent = battery[i].quarterrents || '';
					obj.annualrent = battery[i].annualrents || '';
					form.battery.push(obj);
				}
				console.log(this.form);
				let arr = JSON.stringify(this.form);
//				this.$post('operAdmin/add',{
//					form:form
//				}).then(data=>{
//					
//				})
				
			}
		},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.actionAddress = this.$GLOBALconfig.agent_api + 'operAdmin/add';
			this.getOperLevel();//获取运营商级别
			this.getBattery();
		
//			console.log(this.actionAddress);
		},
		watch:{
			
		}

	}
</script>

<style>	
	.addBusiness{background:#fff;padding:10px 10px 0 10px;box-sizing: border-box;}
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
	
	.el-tag { margin-right: 10px;}  
	
</style>