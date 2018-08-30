<template>
	<div class="helpset">
			<el-form ref="form" :model="form" label-width="200px">
				<el-row class="contentBox">
					<el-col :span="10">
							<el-form-item label="充值/扣款密码：">												
							</el-form-item>
							<el-form-item label="设定密码：">
								<el-input type="password" v-model="form.platformpass" placeholder=""></el-input>						
							</el-form-item>	
							<el-form-item label="确认密码：">
								<el-input type="password" v-model="form.platformpasss" placeholder=""></el-input>						
							</el-form-item>
							<el-form-item label="输入验证码：">
								<el-input v-model="form.code" placeholder="">
									<el-button slot="append" @click="getCode">
										<span v-if="sendMsgDisabled">{{time+'秒后重新发送'}}</span>
 										<span v-if="!sendMsgDisabled">发送验证码</span>
									</el-button>									
								</el-input>						
							</el-form-item>
							<el-form-item label="">
								<el-button type="success" size="small" @click="submitForm()">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>				
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
			platformpass:'',
			platformpasss:''	
		},
		time: 60, // 发送验证码倒计时
   		sendMsgDisabled: false
	  }
    },
    methods: {
		getCode(){//点击获得验证码
			this.$post('set/sendSms',{
			}).then(data=>{
			let me = this;
			me.sendMsgDisabled = true;
			let interval = window.setInterval(function() {
			if ((me.time--) <= 0) {
			me.time = 60;
			me.sendMsgDisabled = false;
			window.clearInterval(interval);
			}
			}, 1000);
			this.$ye();
			})
		},
		submitForm(){
			this.$post('set/updateSet',{
			dateType:4,
			platformpass:this.form.platformpass,
			platformpasss:this.form.platformpasss,
			smsCode:this.form.code
			}).then(data=>{
			this.$ye();
			})
		}
		}
	}
</script>
<style scoped>

</style>