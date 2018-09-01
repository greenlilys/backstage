<template>
	<div>
		<div class="mainContent bw hf">
			<el-row>
				<el-col :span="9">
					<el-form ref="form" :model="form" label-width="140px">
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">商品标签</div><span class="flex-con"></span></h5>
						<el-form-item label="套餐名称：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item label="电池型号：">
							<el-input v-model="form.mode"></el-input>
						</el-form-item>
						<el-form-item label="电池数量（组）：">							
							<el-input-number v-model="form.groupnum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>									
						</el-form-item>
						<el-form-item label="产品类型：">
							<el-radio-group v-model="form.type">								
									<el-radio label="0">电池</el-radio>
									<el-radio label="1">电车(含电池)</el-radio>							
							</el-radio-group>
						</el-form-item>
						<el-form-item label="电池说明：">
							<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.brief">
							</el-input>
						</el-form-item>
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">电池价格</div><span class="flex-con"></span></h5>
						<el-form-item label="配货成本（￥）：">
							<el-input v-model="form.pickcost"></el-input>
						</el-form-item>

						<el-form-item label="押金金额（￥）：">
							<el-input v-model="form.deposit"></el-input>
						</el-form-item>
						<el-form-item label="市场售价（￥）：">
							<el-input v-model="form.marketprice"></el-input>
						</el-form-item>
						
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">换电费</div><span class="flex-con"></span></h5>
						<el-form-item label="换电费（￥）/次：">
							<el-input v-model="form.powerrate"></el-input>
						</el-form-item>
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">租金价格</div><span class="flex-con"></span></h5>
						<el-form-item label="月租（￥）：">
							<el-input v-model="form.monthrent"></el-input>
						</el-form-item>
						<el-form-item label="季租（￥）：">
							<el-input v-model="form.quarterrent"></el-input>
						</el-form-item>
						<el-form-item label="年租（￥）：">
							<el-input v-model="form.annualrent"></el-input>
						</el-form-item>
						<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">上架状态</div><span class="flex-con"></span></h5>
						<el-form-item label="上架状态：">
							<el-radio-group v-model="form.putway">								
								<el-radio label="0">上架</el-radio>
								<el-radio label="1">下架</el-radio>								
							</el-radio-group>
						</el-form-item>
						<el-form-item>							
							<el-button type="success" @click="addBattery()">保存</el-button>						
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navtitle:'设置>产品管理>添加新电池',
				form: {
					name: '',
					mode: '',
					groupnum: '',
					brief: '',
					pickcost: '',
					deposit: '',
					marketprice: '',
					powerrate: '',
					monthrent: '',
					quarterrent: '',
					annualrent: '',
					putway: '',
					type: ''
				}
			}

		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			addBattery() {
				var putway = this.currentPutway == 0 ? 1 : 0;
				var id = this.currentId;
				this.$post('battery/add', {
					name: this.form.name,
					mode: this.form.mode,
					groupnum: this.form.groupnum,
					brief: this.form.brief,
					pickcost: this.form.pickcost,
					deposit: this.form.deposit,
					marketprice: this.form.marketprice,
					powerrate: this.form.powerrate,
					monthrent: this.form.monthrent,
					quarterrent: this.form.quarterrent,
					annualrent: this.form.annualrent,
					putway: this.form.putway,
					type: this.form.type
				}).then(data => {
					this.$ye();
					this.$router.push('/Main/Batterymanage');
				})
			}
		},
		mounted:function(){
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style scoped>
	.mainContent {padding: 10px 20px 0;box-sizing: border-box;}
	/*输入框下间距样式重置*/
	
	.el-form-item {
		margin-bottom: 10px;
	}
</style>