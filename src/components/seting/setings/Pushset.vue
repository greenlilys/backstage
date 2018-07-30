<template>
	<div class="helpset">
			<el-form ref="form" :model="form" label-width="200px">
				<el-row class="contentBox">
					<el-col :span="10">
							<el-form-item label="充值/扣款密码：">												
							</el-form-item>
							<el-form-item label="设定密码：">
								<el-input v-model="form.name" placeholder="555"></el-input>						
							</el-form-item>	
							<el-form-item label="确认密码：">
								<el-input v-model="form.name" placeholder="555"></el-input>						
							</el-form-item>
							<el-form-item label="输入验证码：">
								<el-input v-model="form.name" placeholder="555">
									<el-button slot="append" @click="getCode">获取验证码</el-button>									
								</el-input>						
							</el-form-item>
							<el-form-item label="">
								<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">确定</el-button>				
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
				},
				tableData: [{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '1518 ',
		            money:50.00,
		            action:'查看详情'
		          }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: ' 1517',
		            money:50.00,
		            action:'查看详情'
		          }]
      }
    },
    methods: {
     getCode(){//点击获得验证码
     	console.log("获得验证码")
     }
    }
  }
</script>

<style scoped>

</style>