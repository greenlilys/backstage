<template>
	<div>
		<div class="hf bw p-10 boxborder">
			<el-row class="">
				<el-col :span="9">
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
							<el-button type="success" @click="addproblem()">保存</el-button>
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
				navtitle:'设置>常见问题>添加问题',
				form:{
					title:'',
					content:''
				}
			}
		},
		methods: {
			addproblem(){    
				this.$post('problem/addCommonProblem',{
					title:this.form.title,
					content:this.form.content
				}).then(data=>{
					this.$ye();
					this.$router.push('/Main/Problormlist');
				})
			}   
		},
		mounted:function(){
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style>
</style>