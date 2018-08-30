<template>
	<div>
		<div class="outsideBox1 bw contentBox">
			<el-row class="">
				<el-col :span="10">
					<el-form ref="form" :model="form" label-width="100px">
						<el-form-item label="公告标题：">
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.title">
							</el-input>
						</el-form-item>
						<el-form-item label="公告内容：">
							<el-input
							  type="textarea"
							  :rows="5"
							  placeholder="请输入内容"
							  v-model="form.content">
							</el-input>
						</el-form-item>
                        <el-form-item label="活动主图：(最多一张)">
							<el-upload							 
							  class="uploadBox"
							  :action="actionAddress"							  
							  :on-preview="handlePicture"
							  list-type="picture-card"							  
							  :limit="1"							  
							  :file-list="fileList"
							  :beforeUpload="beforeAvatarUpload"
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
                        <el-form-item label="活动小图：(最多一张)">
								<el-upload							  
							  class="uploadBox"
							  :action="actionAddress"							  
							  :on-preview="handlePicture"							  
							  list-type="picture-card"							  
							  :limit="1"							  
							  :file-list="fileList1"
							  :beforeUpload="beforeAvatarUpload"
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
						<el-form-item>
						<el-row>
							<el-button type="warning" class="btnStyle" @click="updproblem()">保存</el-button>
						</el-row>
					</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>

	export default{
		data(){
			return{
                dialogVisible: false,
                dialogImageUrl: '',
                fileList:[],
                fileList1:[],
                actionAddress:'',
                masmap:'',
                url:'',
				form:{
                },
                id:''
			}
		},
		methods: {
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
			uploadSuccess(response, file, fileList){//活动图片上传成功			
				var obj = {url:response.data};
				var num = this.fileList.length;			
				this.$set(this.fileList,num,obj);
            },
            uploadSuccess1(response, file, fileList1){//活动小图上传成功			
				var obj = {url:response.data};
				var num = this.fileList1.length;			
				this.$set(this.fileList1,num,obj);
			},
            handlePicture(file){//预览图片
				this.dialogImageUrl = file.url;
        		this.dialogVisible = true;        		
            },
            handleRemove(file, fileList) {//活动主图删除			
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
			handleRemove1(file, fileList1) {//活动小图删除			
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
			updproblem(){ 
				this.$post('platformActivity/updateUserNotice',{
                    id:this.id,
					title:this.form.title,
                    content:this.form.content,
                    masmap:this.fileList[0].url,
                    url:this.fileList1[0].url
				}).then(data=>{
                    this.$ye();
                    this.$router.push('/Main/PlatformNoticeList');
				})
            },
            problemDetails(){ 
				this.$get('/platformActivity/usernoticeDetail',{
                    id:this.id
				}).then(data=>{
                    this.form = data; 
                    //绑定图片
                    var obj1 = {url:data.imgUrl[1].url};
					var obj2 = {url:data.masmap};	
					this.$set(this.fileList1,0,obj1);
					this.$set(this.fileList,0,obj2);   
				})
			}
        },
        mounted() {
            this.actionAddress = this.$GLOBALconfig.agent_api + 'n/attach/uploadFile;';
        },
        created(){	  	
          this.id = this.$route.query.id;
          this.problemDetails(this.id);
	    },
	}
</script>

<style>
/*图片上床选择组件样式重置*/
	.addBusiness input.el-upload__input{display:none;}
	.uploadBox{line-height:0;}
	.addBusiness .el-upload-list--picture-card .el-upload-list__item{margin-right:10px;margin-bottom:0;height:100px;width:100px;}
	.addBusiness .el-upload--picture-card{height:100px;width:100px;line-height: 100px;}
</style>