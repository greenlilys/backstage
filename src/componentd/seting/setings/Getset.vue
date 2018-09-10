<template>
	<div>
			<el-form ref="form" :model="form" label-width="200px" class="hf flex-wrap flex-vertical">
			<el-row ref='smaDom'>
				<el-col :span="9">					
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">加盟网点钱包提现设定</div><span class="flex-con"></span></h5>
						<el-form-item label="单笔最低提现额度（￥）：">
							<el-input v-model="form.shopminamount" placeholder=""></el-input>						
						</el-form-item>
						<el-form-item label="单笔最高提现额度（￥）：">
							<el-input v-model="form.shopmaxamount" placeholder=""></el-input>						
						</el-form-item>
						<el-form-item label="每日最多提现次数：">
							<el-input v-model="form.shopfrequency" placeholder=""></el-input>						
						</el-form-item>
				</el-col>
			</el-row>
			<el-row class="mt-10 flex-con">
				<el-col :span="9">						
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">普通用户钱包提现设定</div><span class="flex-con"></span></h5>
						<el-form-item label="单笔最低提现额度（￥）：">
							<el-input v-model="form.cusminamount" placeholder=""></el-input>						
						</el-form-item>
						<el-form-item label="单笔最高提现额度（￥）：">
							<el-input v-model="form.cusmaxamount" placeholder=""></el-input>						
						</el-form-item>
						<el-form-item label="每日最多提现次数：">
							<el-input v-model="form.cusfrequency" placeholder=""></el-input>						
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
				this.form = data.business;	
			})
		},
		submitForm(){
			this.$post('set/updateSet',{
				dateType:1,
				shopminamount:this.form.shopminamount,
				shopmaxamount:this.form.shopmaxamount,
				shopfrequency:this.form.shopfrequency,
				cusminamount:this.form.cusminamount,
				cusmaxamount:this.form.cusmaxamount,
				cusfrequency:this.form.cusfrequency
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