<template>
	<div>
		<div class="outsideBox1 bw contentBox">
			<el-row class="">
				<el-col :span="10">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="问题：">
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.title">
							</el-input>
						</el-form-item>
						<el-form-item label="回答：">
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="form.content">
							</el-input>
						</el-form-item>
						<el-form-item>
						<el-row>
							<el-button type="warning" class="btnStyle" @click="updateProblem()">保存</el-button>
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
                id:'',
                form:{}
			}
		},
		methods: {
			updateProblem(){    
				this.$post('problem/updateCommonProblem',{
					id:this.id,
					title:this.form.title,
					content:this.form.content
				}).then(data=>{
					this.$ye();
					this.$router.push('/Main/Problormlist');
				})
            },
            getProblorm(){	      	
	      	    this.$get('problem/commonProblemDetail',{
					id:this.id					
				}).then(data=>{
					this.form = data;
			})
			},
             
        },
        method(){
			this.getProblorm(this.id);
        },
        created(){	  	
          this.id = this.$route.query.id;
          this.getProblorm(this.id);
	    },
	}
</script>

<style>
</style>