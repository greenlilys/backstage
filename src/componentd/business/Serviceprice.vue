<template>
	<div class="servicePrice">
		<el-row class="mt-10">
			<el-col :span="9">
				<el-form ref="form" :model="form" label-width="140px">
					<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">服务费用</div><span class="flex-con"></span></h5>
					<p class="font-14 fontYellow mb-10">服务费根据运营区域可进行单独设定，不得低于平台基础定价。</p>
					<template v-for="items in battery">											
								<div class="modebox tc font-16">{{items.mode}}</div>
								<div class="inputboxs flex-wrap flex-vertical flex-align-center">
									<el-form-item label="换电费（元）：" label-width="120px">
										<div>
											<input class="oinput" v-model="items.powerrate" placeholder="请输入内容" type="text" />											
											<span class="ospan">平台换电费：{{items.platPowereRate}}</span>
										</div>
									</el-form-item>								
									<el-form-item label="月租（元）：" label-width="120px">
										<div>
										<input class="oinput" v-model="items.monthrent" placeholder="请输入内容" type="text" />											
											<span class="ospan">平台月租：{{items.platMonthRent}}</span>	
										</div>
									</el-form-item>								
									<el-form-item label="季租（元）：" label-width="120px">
										<div>
										<input class="oinput" v-model="items.quarterrent" placeholder="请输入内容" type="text" />											
											<span class="ospan">平台季租：{{items.platQuarterRent}}</span>	
										</div>
									</el-form-item>								
									<el-form-item label="年租（元）：" label-width="120px">
										<div>
										<input class="oinput" v-model="items.annualrent" placeholder="请输入内容" type="text" />											
											<span class="ospan">平台年租：{{items.platAnnualRent}}</span>	
										</div>
									</el-form-item>							
								</div>						
					</template>
						
					<el-form-item>
						<el-row class="mt-20">
							<el-button type="success" @click="submitForm">保存</el-button>
						</el-row>
					</el-form-item>		
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		data(){
			return {		
				form:{},
				battery:[]
			}
		},
		methods:{
			setoperBattery({id=this.id,battery= JSON.stringify(this.battery)}={}){
				this.$post('operBattery/update',{
					id:id,
					battery:battery
				}).then(data=>{
					this.$ye('修成成功');
					
				})
			},
			getoperBattery({id=this.id}={}){				
				this.$get('operBattery/getAll',{
					id:id
				}).then(data=>{
					this.battery = data;
				})
			},
			submitForm(){
				this.setoperBattery();
			}
		},
		mounted(){		
			this.getoperBattery();	
		},		
		props:['id']
	}
</script>

<style scoped>
.servicePrice .batteryType{line-height:30px;margin:10px;}
.servicePrice .el-form-item{margin-bottom:10px;}
.el-input__inner{width:70%;}
.oinput{color:#606266;font-size:inherit;height:40px;line-height:40px;outline:none;padding:0 15px;
border:1px solid #dcdfe6;background-image:none;background-color:#fff;border-radius:4px;box-sizing:border-box;width:160px;}
.ospan{color:#606266;font-size:inherit;height:40px;line-height:40px;padding:0 15px;}
.inputboxs{padding:20px 0;}
	.modebox{height:30px;line-height: 30px;background:#E9EEF3;}
</style>