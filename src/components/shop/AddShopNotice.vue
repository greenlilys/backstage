<template>
	<div>
		<div class="outsideBox1 bw contentBox">
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
							<router-link to='/Main/Shopnoticelist'>
								<el-button type="success" @click="addproblem()">保存</el-button>
							</router-link>
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
				form:{
					title:'',
					content:''
				}
			}
		},
		methods: {
			addproblem(){    
				this.$post('platformNotice/addNotice',{
					title:this.form.title,
					content:this.form.content
				}).then(data=>{
					this.$ye();
					this.$router.push('/Main/Shopnoticelist');
				})
			}   
		}
	}
</script>

<style>
</style>