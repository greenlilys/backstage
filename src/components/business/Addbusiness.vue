
<template>
	<div>
		<div class="addBusiness hf">
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="9">				
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
								<el-date-picker v-model="valueTime" type="daterange" align="right" range-separator="到" 
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
					<el-form-item label="身份证正反图片（最多两张）：">
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
					
					<el-form-item label="营业执照照片（最多一张）：">
							<el-upload							 
							  class="uploadBox"
							  :action="actionAddress"							  
							  :on-preview="handlePicture"
							  list-type="picture-card"							  
							  :limit="1"							  
							  :file-list="fileList1"
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
			<el-col :span="14" :offset="1">				
					<el-form-item label="运营商级别：">						
							<el-radio-group v-model="form.radio1"  @change = "handleRadio1">
								<template v-for="item in operLevellist">
									<el-radio  :label="item.id" :key="item.id">{{item.name}}</el-radio>
								</template>								
							</el-radio-group>
						<div v-if=" curid != '' ">代理费用：{{form.agencyfee}}&nbsp;&nbsp;&nbsp;&nbsp;分润比例：{{form.ratio}}</div>
					</el-form-item>
						<el-form-item label="收款账户类型：">
						<template>
							<el-radio-group v-model="form.radio2"  @change = "handleRadio2">
								<el-radio  label="0">银行卡</el-radio>
								<el-radio  label="1">支付宝</el-radio>	
							</el-radio-group>
						</template>
					</el-form-item>
					<el-form-item label="收款人真实姓名：">
						<el-input v-model="form.realname" clearable></el-input>
					</el-form-item>
					<template v-if="form.radio2==0">
						<el-form-item label="银行：">
						<el-input v-model="form.bank" clearable></el-input>
						</el-form-item>
						<el-form-item label="银行卡号：">
							<el-input v-model="form.bankcard" clearable></el-input>
						</el-form-item>
					</template>
					<template v-else>
						<el-form-item label="支付宝账号：">
							<el-input v-model="form.Zfbacc" clearable></el-input>
						</el-form-item>
					</template>
					
					<template v-for="items in battery">
						<el-form-item :label="items.mode +'：' ">					
							<el-row>
								<el-col :span="12">
									<el-form-item label="换电费（元）：" label-width="120px">
										<div>
											<input class="oinput" v-model="items.powerrates" placeholder="" type="text" />											
											<span class="ospan">平台换电费：{{items.powerrate}}</span>
										</div>										
									</el-form-item>
								</el-col>
	
								<el-col :span="12">
									<el-form-item label="月租（元）：" label-width="120px">
										<div>
											<input class="oinput" v-model="items.monthrents" placeholder="" type="text" />											
											<span class="ospan">平台月租：{{items.monthrent}}</span>
										</div>	
									</el-form-item>
								</el-col>
								
							</el-row>
							<el-row class="mt-10">
								
								<el-col :span="12">
									<el-form-item label="季租（元）：" label-width="120px">
										<div>
											<input class="oinput" v-model="items.quarterrents" placeholder="" type="text" />											
											<span class="ospan">平台季租：{{items.quarterrent}}</span>
										</div>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="年租（元）：" label-width="120px">
										<div>
											<input class="oinput" v-model="items.annualrents" placeholder="" type="text" />											
											<span class="ospan">平台年租：{{items.annualrent}}</span>
										</div>
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
							<el-button type="success" @click="submitForm">保存</el-button>
						</el-row>
					</el-form-item>		
					<el-form-item>
						
					
						
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
					battery:[],
					radio1: '', //运营商级别
					radio2:'0',//收款账户类型
					bankcard:'',
					bank:'',
					Zfbacc:''
				},
				password1: '',
				password2: '',
				valueTime: [], //合约周期
				actionAddress: '',
				dialogImageUrl: '',
				dialogVisible: false,
				fileList:[], 
				fileList1:[],	
				operLevellist:[],//运营商级别列表
				curid:'',//当前运营级别id				
				battery:[],	
				dynamicTags:[]
				
				
			}

		},
		methods: {
		     handleRemove(file, fileList) {//删除图片
		        console.log(file, fileList);		        
		      },		     
		      
			handlePicture(file){//预览图片
				this.dialogImageUrl = file.url;
        		this.dialogVisible = true;        		
			},
			handleTime(v) {//合约周期
				this.form.signtimebegin = v[0];
				this.form.signtimeend = v[1];
			},

			onSelected(data) { 	//所在地区	
				if(data.province.value != '省' && data.city.value != '市' && data.area.value != '区') {
					this.form.provincename = data.province.value;					
					this.form.cityname = data.city.value;
					this.form.countyname = data.area.value;
				}				
			},
			beforeAvatarUpload(file) { //图片上传之前
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
			uploadError(response, file, fileList) { //上传失败				
				this.$fail('上传失败，请重试！');

			},
			uploadSuccess(response, file, fileList) { //身份证上传成功				
				this.form.IDfront = fileList[0].response.data;
				if(fileList[1]){
					this.form.IDback = fileList[1].response.data;					
				}
			},
			uploadSuccess1(response, file, fileList1){//营业执照上传成功			
				this.form.otherimg = response.data;
			},
			confirmFirst(v) {
				this.password1 = v;
			},
			
			confirmSecond(v) {//密码一致性检测
				if(this.password1 !== '' && this.password1 === v) {
					this.form.password = v;
				} else {
					this.$fail('密码输入不一致！')
				}
			},
			getOperLevel() { //获取运营商级别
				this.$get('operLevel/getAll', {
				}).then(data => {
					this.operLevellist = data;					 
					if(data.length > 0){//列表有数据
						this.form.radio1 = data[0].id;
						this.handleRadio1(data[0].id);
					}else{
						this.form.radio1 = '';
						this.curid = '';
					}					
				})
			},
			handleRadio1(v) { //选择运营商级别	根据当前id判断当前代理费用和分润			
				this.curid = v;
				let operLevellist = this.operLevellist;
				for(let i = 0,len = operLevellist.length;i<len; i++){
					if(operLevellist[i].id == v){
						this.form.agencyfee = operLevellist[i].agencyfee;
						this.form.ratio = operLevellist[i].ratio;
					}
				}
			},
			handleRadio2(v){//账户类型
				this.form.radio2 = v;
			},
			getBattery(){ //电池列表
		      this.$get('battery/selectList',{
						pageSize:100					
					}).then(data=>{
					this.battery= data.datas.reverse();
	    		})
		    },
		    onSelecteArea(data){//运营区域选择
		    	
		    	if(data.province.value != '省' && data.city.value != '市' && data.area.value != '区') {
					let tag = data.province.value + ' 、 ' + data.city.value + ' 、 ' + data.area.value;
					this.dynamicTags.push(tag);
					let obj = {};
					obj.provincename = data.province.value;
			    	obj.cityname = data.city.value;
			    	obj.countyname = data.area.value;
			    	this.form.region.push(obj);
				}	
		    },

			handleClose(tag) {//删除运营区域
				let index = this.dynamicTags.indexOf(tag);
				this.dynamicTags.splice(index, 1);
				this.form.region.splice(index, 1);
			},		
			
			submitForm(){//保存
				let form = this.form;				
				let battery = this.battery;
				for(let i = 0,len = battery.length;i<len;i++){//获得电池列表表格数据
					let obj = {};					
					obj.batteryid = battery[i].id;
					obj.powerrate = battery[i].powerrates || '';
					obj.monthrent = battery[i].monthrents || '';
					obj.quarterrent = battery[i].quarterrents || '';
					obj.annualrent = battery[i].annualrents || '';
					form.battery.push(obj);
				}
				//字符串电池和运营区域数据
				let batterys = JSON.stringify(form.battery);
				let regions = JSON.stringify(form.region);
//				console.log(form);
				
				this.$post('operAdmin/add',{
					battery:batterys,
					region:regions,
					levelid:form.radio1,
					agencyfee:form.agencyfee,
					username:form.username,
					password:form.password,
					name:form.name,
					contactname:form.contactname,
					contactcellphone:form.contactcellphone,
					provincename:form.provincename,
					cityname:form.cityname,
					countyname:form.countyname,
					address:form.address,
					signtimebegin:form.signtimebegin,
					signtimeend:form.signtimeend,
					legalperson:form.legalperson,
					legalID:form.legalID,
					IDfront:form.IDfront,
					IDback:form.IDback,
					otherimg:form.otherimg,
					realname:form.realname,
					acctype:form.radio2,
					bank:form.bank,
					bankcard:form.bankcard,
					Zfbacc:form.Zfbacc
					
				}).then(data=>{
					this.$ye('添加成功');
				})
				
			}
		},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.actionAddress = this.$GLOBALconfig.agent_api + 'n/attach/uploadFile;';
			this.getOperLevel();
			this.getBattery();	
			
			
		},
		watch:{
			
		}

	}
</script>

<style scoped>	
	.addBusiness{background:#fff;padding:10px 10px 30px;box-sizing: border-box;}
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
	
	.el-tag { margin-right: 4px;} 
	
	.oinput{color:#606266;font-size:inherit;height:40px;line-height:40px;outline:none;padding:0 15px;
	border:1px solid #dcdfe6;background-image:none;background-color:#fff;border-radius:4px;box-sizing:border-box;width:120px;}
	.ospan{color:#606266;font-size:inherit;height:40px;line-height:40px;padding:0 15px;} 
	
</style>