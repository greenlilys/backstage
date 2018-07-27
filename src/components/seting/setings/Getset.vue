<template>
	<div>
		
	
		
			<el-form ref="form" :model="form" label-width="270px">
			<el-row class="contentBox">
				<el-col :span="10">
						<el-form-item label="加盟网点钱包提现设定：">												
						</el-form-item>
						<el-form-item label="单笔最低提现额度（￥）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="单笔最高提现额度（￥）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="每日最多提现次数：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
				</el-col>
			</el-row>
			<el-row class="mt-10 contentBox">
				<el-col :span="10">
						<el-form-item label="普通用户钱包提现设定：">												
						</el-form-item>
						<el-form-item label="单笔最低提现额度（￥）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="单笔最高提现额度（￥）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="每日最多提现次数：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>		
						<el-form-item label="">
							<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">保存</el-button>				
						</el-form-item>	
				
				</el-col>
			</el-row>
			</el-form>
		
		
		
	</div>
</template>

<script>
	export default {
    data() {
      return {
       
        form: {
					name: '88888',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
      }
    },
    methods: {
     
    }
  }
</script>

<style scoped>
	.el-form-item {	margin-bottom: 10px;}
</style>