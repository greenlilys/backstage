<template>
	<div>
		<div class="hf p-10 boxborder bw contentBox">
			<el-row class="">
				<el-col :span="12">
					<el-form ref="form" :model="form" label-width="90px">
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
						<el-form-item>
						<el-row>
								<el-button type="success" @click="updateProblem()">保存</el-button>
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
				navtitle:'网点公告>修改网点公告',
                id:'',
                form:{}
			}
		},
		methods: {
			updateProblem(){    
				this.$post('platformNotice/updateNotice',{
					id:this.id,
					title:this.form.title,
					content:this.form.content
				}).then(data=>{
					this.$ye();
					this.$router.push('/Main/Shopnoticelist');
				})
            },
            getProblorm({id=this.id}={}){	      	
	      	    this.$get('platformNotice/noticeDetail',{
					id:this.id					
				}).then(data=>{
					this.form = data;
			})
			}
             
        },
         created(){	  	
          this.id = this.$route.query.id;          
	    },
        mounted(){
			this.getProblorm();
			this.$sendTitle(this.navtitle);
        },
       
	}
</script>

<style>
</style>