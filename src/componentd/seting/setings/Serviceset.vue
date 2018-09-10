<template>
	<div class="flex-wrap flex-vertical">
		<div>
			<div class="mb-10">
				<span class="font-14">预约可选周期：</span>
				<el-tag v-for="(tag,index) in dynamicTags" :key="tag.value" :disable-transitions="false" @close="handleClose(tag,index)" closable>{{tag.time>=10?tag.time+'分钟':tag.time+'小时'}}</el-tag>
				<el-input v-if="inputVisible" class="input-new-tag" v-model="time" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"></el-input>
				<el-button v-else type="success" size="small" class="button-new-tag" @click="showInput">添加可选周期项</el-button>
			</div>
		</div>

		<div class="flex-con">
			<el-form ref="form" :model="form" label-width="270px" class="hf flex-wrap flex-vertical">
				<el-row class="mt-10">
					<el-col :span="9">
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">安装预约服务完成后返利</div><span class="flex-con"></span></h5>
						
						<el-form-item label="月租返利（元）：">
							<el-input v-model="form.installmonth" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="季租返利（元）：">
							<el-input v-model="form.installquarter" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="年租返利（元）：">
							<el-input v-model="form.installyear" placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row class="mt-10">
					<el-col :span="9">										
							<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">网点服务返利</div><span class="flex-con"></span></h5>
						
						<el-form-item label="用户续租后网点返利（元）：">
							<el-input v-model="form.shoprenew" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="换电预约服务完成后返利（元）：">
							<el-input v-model="form.replacerebate" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="退电预约服务完成后返利（元）：">
							<el-input v-model="form.returnrebate" placeholder=""></el-input>
						</el-form-item>
						<el-form-item label="网点推荐新用户租用返利（元/人次）：">
							<el-input v-model="form.shopreferee" placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row class="mt-10 flex-con">
					<el-col :span="9">
							<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">网点加盟保证金设置</div><span class="flex-con"></span></h5>
						
						<el-form-item label="加盟保证金（元/网点）：">
							<el-input v-model="form.platbond" placeholder=""></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="success" size="small" @click="submitForm()">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dynamicTags: [],
				inputVisible: false,
				time: '',
				form: {}
			};
		},
		methods: {
			handleClose(tag, index) {
				console.log(tag, index)
				this.dynamicTags.splice(index, 1);
				this.$post('set/deleteAppointTime', {
					id: tag.id
				}).then(data => {
					this.SettingMap();
					this.$ye();
				})
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
					let time = Number(this.time);
					if(time && typeof time === 'number') {
						this.$post('set/addAppointTime', {
							time: time
						}).then(data => {
							this.inputVisible = false;
							this.time = '';
							this.SettingMaps();
							this.$ye();
						})
					} else {
						this.$fail('请输入有效数字！');
						this.inputVisible = false;
						this.time = '';
					}
			},
			SettingMap() {
				this.$get('set/selectSet', {}).then(data => {
					this.form = data.business;	
				})
			},
			SettingMaps(){//预约可选周期数据
				this.$get('set/selectSetAppointTime',{
				}).then(data=>{
					this.dynamicTags = data.appointment;
				})
			},
			submitForm() {
				this.$post('set/updateSet', {
					dateType: 0,
					installmonth: this.form.installmonth,
					installquarter: this.form.installquarter,
					installyear: this.form.installyear,
					replacerebate: this.form.replacerebate,
					returnrebate: this.form.returnrebate,
					shopreferee: this.form.shopreferee,
					shoprenew: this.form.shoprenew,
					platbond: this.form.platbond
				}).then(data => {
					this.SettingMap();
					this.$ye();
				})
			}
		},
		mounted() {
			this.SettingMap();
			this.SettingMaps();
		}
	}
</script>
<style scoped>
	.el-tag+.el-tag {
		margin-left: 10px;
	}
	
	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>