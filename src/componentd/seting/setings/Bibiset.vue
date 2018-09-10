<template>
	<div>
			<el-form ref="form" :model="form" label-width="290px"  class="hf flex-wrap flex-vertical">
			<el-row>
				<el-col :span="10">						
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">天牛币价值</div><span class="flex-con"></span></h5>
						<el-form-item label="1元兑换天牛币数量：">
							<el-input v-model="form.integralunit" placeholder=""></el-input>						
						</el-form-item>						
				</el-col>
			</el-row>
			<el-row class="mt-10">
				<el-col :span="10">						
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">天牛币发放</div><span class="flex-con"></span></h5>
						<el-form-item label="用户预约服务评分获取数量/次：">
							<el-input v-model="form.evaluate" placeholder=""></el-input>						
						</el-form-item>
						<el-form-item label="用户推荐新用户租用获取数量：">
							<el-input v-model="form.cusreferee" placeholder=""></el-input>						
						</el-form-item>
						<el-form-item label="新用户关联推荐人/网点并起租可获取数量：">
							<el-input v-model="form.recommended" placeholder=""></el-input>						
						</el-form-item>		
						
				
				</el-col>
			</el-row>
			<el-row class="mt-10">
				<el-col :span="10">						
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">签到设置</div><span class="flex-con"></span></h5>
						<el-form-item label="签到赠送天牛币数量：">
							<el-input v-model="form.signgive" placeholder=""></el-input>						
						</el-form-item>
						<el-form-item label="签到7天赠送天牛币数量：">
							<el-input v-model="form.sevengive" placeholder=""></el-input>						
						</el-form-item>
				</el-col>
			</el-row>
			<el-row class="mt-10 flex-con">
				<el-col :span="10">
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">生日活动设置</div><span class="flex-con"></span></h5>
						<el-form-item label="">
							<template>
								<el-radio-group v-model="form.isbirthdayopen">
									<el-radio :label="0">未开启</el-radio>
									<el-radio :label="1">已开启</el-radio>
								</el-radio-group>
							</template>							
						</el-form-item>
						<el-form-item label="生日赠送天牛币数量：">
							<el-input v-model="form.birthdaygift" placeholder=""></el-input>						
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
		}
      }
    },
    methods: {
		SettingMap(){
			this.$get('set/selectSet',{
			}).then(data=>{
				var arr = data.business;
				if(arr.isbirthdayopen==0){
					this.radio=arr.isbirthdayopen;
				}else{
					this.radio=arr.isbirthdayopen;
				}
				console.log(this.radio);
				this.form = arr;
			})
		},
		submitForm(){
			this.$post('set/updateSet',{
				dateType:2,
				integralunit:this.form.integralunit,
				evaluate:this.form.evaluate,
				cusreferee:this.form.cusreferee,
				recommended:this.form.recommended,
				signgive:this.form.signgive,
				sevengive:this.form.sevengive,
				isbirthdayopen:this.form.isbirthdayopen,
				birthdaygift:this.form.birthdaygift			
			}).then(data=>{
				this.SettingMap();
				this.$ye();
			})
		}
	},
	method(){
		this.SettingMap();
		},
	created(){	  	
		this.SettingMap();
	}
  }
</script>

<style scoped>
	.el-form-item {	margin-bottom: 10px;}
</style>