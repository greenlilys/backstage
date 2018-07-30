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
							  v-model="textarea1">
							</el-input>
						</el-form-item>
						<el-form-item label="回答：">
							<el-input
							  type="textarea"
							  :rows="2"
							  placeholder="请输入内容"
							  v-model="textarea2">
							</el-input>
						</el-form-item>
						<el-form-item>
						<el-row>
							<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">保存</el-button>
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
				textarea1:'',
				textarea2:''
			}
		}
	}
</script>

<style>
</style>