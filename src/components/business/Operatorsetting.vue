<template>
	<div class="operatorSetting">
		<div class="mainContent">
			<el-row>
				<el-col :span="9">
					<el-form ref="form" :model="form" label-width="110px">
						<h5 class="fonttitle mb-10 flex-wrap flex-horizontal flex-align-center"><div class="pr-10">运营商级别</div><span class="flex-con"></span></h5>
						<el-form-item label="运营商级别：">
							<el-radio-group v-model="setLevelid" @change="handleRadio1">
								<template v-for="item in operLevellist">
									<el-radio :label="item.id" :key="item.id">{{item.name}}</el-radio>
								</template>
							</el-radio-group>
							<div v-if=" setLevelid != '' ">代理费用（￥）：{{agencyfee}}&nbsp;&nbsp;&nbsp;&nbsp;分润比例（%）：{{ratio}}</div>
						</el-form-item>
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">运营区域</div><span class="flex-con"></span></h5>
						<el-form-item label="运营区域：">
							<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
								{{tag}}
							</el-tag>
						</el-form-item>
						<el-form-item label="添加运营区域：">
							<v-distpicker @selected="onSelecteArea"></v-distpicker>
						</el-form-item>
						<h5 class="fonttitle mb-10 flex-wrap flex-horizontal flex-align-center"><div class="pr-10">运营商账号</div><span class="flex-con"></span></h5>
						<el-form-item label="运营商账号：">
							<el-row>
								<el-col :span="12">
									<el-input v-model="username" class="input-with-select" disabled>
										<el-button slot="append" @click="setpassword">重置密码</el-button>
									</el-input>
								</el-col>
							</el-row>
						</el-form-item>

						<el-form-item>
							<el-row class="mt-20">
								<el-button type="success" @click="submitForm">保存</el-button>
							</el-row>
						</el-form-item>
					</el-form>
				</el-col>

			</el-row>
		</div>
		<el-dialog title="重置密码" :visible.sync="dialogFormVisible" width="30%">
			<el-form :model="formword">
				<el-form-item label="密码：" :label-width="formLabelWidth">
					<el-input v-model="formword.oneword" placeholder="请输入内容" clearable></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" :label-width="formLabelWidth">
					<el-input v-model="formword.twoword" placeholder="请输入内容" clearable></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="success" @click="confirmd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Distpicker from 'v-distpicker'

	export default {
		data() {
			return {
				form: {					
				},
				agencyfee:'',
				ratio:"",
				formword: {					
					oneword:'',
					twoword:''					
				},
				dynamicTags: [],
				operLevellist: [],
				dialogFormVisible: false,
				formLabelWidth: '120px',
				setLevelid:''
			}

		},
		methods: {
			handleClose(tag) { //删除运营区域标签
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},

			submitForm({
				id = this.id,
				levelid = this.setLevelid,
				agencyfee = this.agencyfee
			} = {}) { //保存
				let dynamicTags = this.dynamicTags;
				let region = [];
				for(let i = 0, len = dynamicTags.length; i < len; i++) {
					let obj = {};
					let arr = dynamicTags[i].split('、');
					obj.provincename = arr[0];
					obj.cityname = arr[1];
					obj.countyname = arr[2];
					region.push(obj);
				}
				let regions = JSON.stringify(region);
				console.log(regions)
				this.$post('operRegion/update', {
					id: id,
					levelid: levelid,
					agencyfee: agencyfee,
					region: regions
				}).then(data => {
					this.$ye();
				})
			},
			onSelecteArea(data) {
				if(data.province.value != '省' && data.city.value != '市' && data.area.value != '区') {
					let tag = data.province.value + ' 、 ' + data.city.value + ' 、 ' + data.area.value;
					this.dynamicTags.push(tag);
				}
				console.log(data.province.value + ' 、 ' + data.city.value + ' 、 ' + data.area.value)

			},
			getOperRegion({
				id = this.id
			} = {}) { //获取运营区域
				this.$get('operRegion/getAll', {
					id: id
				}).then(data => {
					var arr = [];
					var list = data;
					for(var i = 0, len = list.length; i < len; i++) {
						let str = '';
						str += list[i].provincename + '、' + list[i].cityname + '、' + list[i].countyname;
						arr.push(str);
					}
					this.dynamicTags = arr;
				})
			},
			getOperLevel() { //获取运营商级别
				this.$get('operLevel/getAll', {}).then(data => {
					this.operLevellist = data;
					if(data.length > 0) { //列表有数据						
						this.handleRadio1(this.setLevelid);//选中默认级别
					} else {
						this.setLevelid = '';
					}
				})
			},
			handleRadio1(v) { //选择运营商级别	根据当前id判断当前代理费用和分润							
				var operLevellist = this.operLevellist;
				for(var i = 0, len = operLevellist.length; i < len; i++) {
					if(operLevellist[i].id == v) {
						this.agencyfee = operLevellist[i].agencyfee;
						this.ratio = operLevellist[i].ratio;
						console.log(this.setLevelid, this.agencyfee,this.ratio)
					}
				}
			},
			setpassword() { //重置密码
				this.dialogFormVisible = true;
			},
			confirmd() { //确认重置密码
				if(this.formword.oneword !== '' && this.formword.twoword === this.formword.oneword) {
					this.sendpassword();
				} else {
					this.$fail('密码输入不一致！请重新输入')
				}
			},
			sendpassword({
				id = this.id
			} = {}) {
				this.$post('operUser/upsetPass', {
					id: id,
					password: this.formword.twoword
				}).then(data => {
					this.dialogFormVisible = false;
					this.$ye('重置成功');
				})
			}
		},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.setLevelid = this.levelid;
			console.log(this.levelid)
			this.getOperLevel();
			this.getOperRegion();
		},
		props: ['id', 'username','levelid']

	}
</script>

<style scoped>
	.el-form-item {
		margin-bottom: 10px;
	}
	
	.operatorSetting .mainContent {
		background: #fff;
		padding: 10px 20px 0;
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
	
	.el-tag {
		margin-right: 4px;
	}
	
	.el-radio,
	.el-radio+.el-radio {
		margin-left: 0;
		padding: 10px 0;
	}
</style>