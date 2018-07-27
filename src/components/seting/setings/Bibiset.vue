<template>
	<div>
		
	
		
			<el-form ref="form" :model="form" label-width="290px">
			<el-row class="contentBox">
				<el-col :span="10">
						<el-form-item label="天牛币价值：">												
						</el-form-item>
						<el-form-item label="1元兑换天牛币数量：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>						
				</el-col>
			</el-row>
			<el-row class="mt-10 contentBox">
				<el-col :span="10">
						<el-form-item label="天牛币发放：">												
						</el-form-item>
						<el-form-item label="用户预约服务评分获取数量/次：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="用户推荐新用户租用获取数量：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="新用户关联推荐人/网点并起租可获取数量：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>		
						
				
				</el-col>
			</el-row>
			<el-row class="mt-10 contentBox">
				<el-col :span="10">
						<el-form-item label="签到设置：">												
						</el-form-item>
						<el-form-item label="签到赠送天牛币数量：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="签到7天赠送天牛币数量：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
				</el-col>
			</el-row>
			<el-row class="mt-10 contentBox">
				<el-col :span="10">
						<el-form-item label="生日活动设置：">												
						</el-form-item>
						<el-form-item label="生日赠送天牛币数量：">
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