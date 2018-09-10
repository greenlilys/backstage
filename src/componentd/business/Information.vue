
<template>
	<div class="infomation">
		<div class="mainContent">	
		<el-row>			
			<el-col :span="9">
				<el-form ref="form" :model="form" label-width="140px">
				<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">基本信息</div><span class="flex-con"></span></h5>
					<el-form-item label="运营商名称：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="联系人：">
						<el-input v-model="form.contactname"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.contactcellphone"></el-input>
					</el-form-item>
					<el-form-item label="所在地区：">
						<template>
							<v-distpicker 
								:province="selects.province" 
								:city="selects.city" 
								:area="selects.areas" 
								@selected="onSelected">
							</v-distpicker>
						</template>
					</el-form-item>
					<el-form-item label="详细地址：">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
						<el-form-item label="合约运营周期：">
						<template>
							<div class="block">
								<el-date-picker 
									v-model="dataTime" 
									type="daterange" 
									align="right" 
									range-separator="至" 
									start-placeholder="开始日期" 
									end-placeholder="结束日期"
									value-format="yyyy-MM-dd"
									@change="handleTime"
									>
								</el-date-picker>
							</div>
						</template>
					</el-form-item>	
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">经营资质</div><span class="flex-con"></span></h5>
					<el-form-item label="法人姓名：">
						<el-input v-model="form.legalperson"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.legalID"></el-input>
					</el-form-item>
					<el-form-item label="身份证正反面图片（最多两张）：">
							<el-upload
						  class="uploadBox"
						  :action="actionAddress"
						  list-type="picture-card"						 
						  :file-list="fileList"
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
				<el-form-item label="营业执照照片（最多一张）：">
							<el-upload
						 class="uploadBox"
						  :action="actionAddress"
						  list-type="picture-card"						  
						  :file-list="fileList1"
						  :beforeUpload="beforeAvatarUpload"
						  :on-preview="handlePictureCardPreview"					  
						  :on-remove="handleRemove1"
						  :onError="uploadError"
						  :onSuccess="uploadSuccess1"
						  >
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>	
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">运营商结算账户</div><span class="flex-con"></span></h5>
						<el-form-item label="收款账户类型：">
							<el-radio-group v-model="form.acctype">
								<el-radio  :label="0">银行卡</el-radio>
								<el-radio  :label="1">支付宝</el-radio>	
							</el-radio-group>
					</el-form-item>
					<el-form-item label="收款人真实姓名：">
						<el-input v-model="form.realname"></el-input>
					</el-form-item>
					<template v-if="form.acctype==0">
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
					
					<el-form-item>
						<el-row class="mt-20">
							<el-button type="success" @click="onSubmit">保存</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</el-col>
			
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
				form: {},	
				provincename:'',
				cityname:'',
				countyname:'',
				dataTime:[],//运营周期
				actionAddress:'',
				dialogImageUrl: '',				
				dialogVisible: false,				
				fileList: [],
				fileList1:[],
				upLoadData: {

				},				
				putAddress:'',
				selects: {province: '', city: '', areas: '' },				
				options: []				

			}

		},
		methods: {
			onSubmit() {//保存
				var form = this.form;					
				if(this.fileList.length < 2 || this.fileList1.length == 0){
					console.log(55)
					this.$fail('请上传身份证图片！');
					return;
				}							
				this.$post('operAdmin/update',{
					id:this.id,
					name:form.name,
					contactname:form.contactname,
					contactcellphone:form.contactcellphone,
					provincename:this.provincename,
					address:form.address,
					signtimebegin:this.dataTime[0],
					signtimeend:this.dataTime[1],
					legalperson:form.legalperson,
					legalID:form.legalID,
					IDfront:this.fileList[0].url,
					IDback:this.fileList[1].url,
					otherimg:this.fileList1[0].url,
					realname:form.realname,
					acctype:form.acctype,
					bank:form.bank,
					bankcard:form.bankcard,
					Zfbacc:form.Zfbacc
				}).then(data=>{
					this.$ye('修改成功');
				})
			},			
			onSelected(data) {//所在地区				
//				console.log(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
				this.provincename = data.province.value;
				this.cityname = data.city.value;
				this.countyname = data.area.value;
			},	
			handleTime(v) {//合约周期				
				this.$set(this.dataTime,0,v[0]);
				this.$set(this.dataTime,1,v[1]);				
			},
			// 上传成功后的回调
			uploadSuccess(response, file, fileList) { //身份证上传成功
				console.log(response,file,fileList)
				var obj = {url:response.data};
				var num = this.fileList.length;			
				this.$set(this.fileList,num,obj);
				
			},
			uploadSuccess1(response, file, fileList1) {//营业执照上传成功
				var obj = {url:response.data};
				var num = this.fileList1.length;			
				this.$set(this.fileList1,num,obj);
			},
			handleRemove(file, fileList) {//身份证删除			
				var str = file.url;				
				var fileLists = this.fileList;			
				for(var i = 0,len=fileLists.length;i<len;i++){				
					if(fileLists[i].url == str){						
						fileLists.splice(i,1);
						this.fileList = fileLists;
						return;
					}
				}
			},	
			handleRemove1(file, fileList1) {//营业执照删除			
				var str = file.url;				
				var fileLists = this.fileList1;				
				for(var i = 0,len=fileLists.length;i<len;i++){				
					if(fileLists[i].url == str){						
						fileLists.splice(i,1);
						this.fileList1 = fileLists;
						return;
					}
				}
			},
			handlePictureCardPreview(file) {//预览图片
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},			
			//上传图片之前的回调
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
			//上传图片失败的回调
			uploadError(response, file, fileList) {
				console.log('上传失败，请重试！')
			},
			getOperdetail({
				id = this.id
			} = {}) { //获取运营商详情	    	
				this.$get('operAdmin/getOper', {
					id: id
				}).then(data => {
					this.form = data;
					//绑定运营周期
					this.$set(this.dataTime,0,data.signtimebegin);
					this.$set(this.dataTime,1,data.signtimeend);
					//绑定图片
					var obj1 = {url:data.IDfront};
					var obj2 = {url:data.IDback};
					var obj3 = {url:data.otherimg};					
					this.$set(this.fileList,0,obj1);
					this.$set(this.fileList,1,obj2);
					this.$set(this.fileList1,0,obj3);
					//绑定省市县
					this.selects.province = data.provincename;
					this.selects.city = data.cityname;
					this.selects.areas = data.countyname;
					
				})
			}

		},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.actionAddress = this.$GLOBALconfig.agent_api + 'n/attach/uploadFile;';
			this.getOperdetail();
		},
		props:['id']

	}
</script>

<style>
	.el-form-item {	margin-bottom: 10px;}
	.distpicker-address-wrapper select {width: 32.8%;}	
	.infomation .el-table td{padding:4px 0;}
	.infomation .el-table th{padding:0;background:#ADB4B9;color:#252C30;}	
	.infomation .el-table{font-size:14px;}
	.shopPhoto img{display:block;width:58%;margin-top:10px;}
	.infomation input.el-upload__input{display:none;}	
	.infomation .el-upload-list--picture-card .el-upload-list__item{margin-right:10px;margin-bottom:0;}
	.infomation .mainContent{background:#fff;padding:10px 20px 0;}
	.infomation .el-upload--picture-card{height:100px;width:100px;line-height: 100px;}
	.infomation .el-upload-list--picture-card .el-upload-list__item{height:100px;width:100px;}
	.distpicker-address-wrapper select{width:28%;}
	
</style>