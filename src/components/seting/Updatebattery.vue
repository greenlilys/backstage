
<template>
	<div>
		<div class="hf bw p-10 boxborder">		
		<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			<el-col :span="11">				
				<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">商品标签</div><span class="flex-con"></span></h5>
					<el-form-item label="套餐名称：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="电池型号：">
						<el-input v-model="form.mode"></el-input>
					</el-form-item>
					<el-form-item label="电池数量（组）：">
						<el-row>
							<el-col :span="11">								
								<template>
									<el-input-number v-model="form.groupnum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
								</template>
							</el-col>
					</el-row>
					</el-form-item>
					
					<!-- <el-form-item label="电池说明：">
						<el-input
						  type="textarea"
						  :rows="2"
						  placeholder="请输入内容"
						  v-model="form.brief">
						</el-input>
					</el-form-item>					 -->
					<el-form-item label="产品说明：">
						<el-form-item label='续航能力：' label-width="100px">
							<el-input v-model='form.performance'></el-input>
						</el-form-item>
						<el-form-item label='电池重量：' label-width="100px" v-if='!productType'>
							<el-input v-model="form.weight"></el-input>
						</el-form-item>
						<el-form-item label='整车重量：' label-width="100px"  v-else>
							<el-input v-model="form.weight"></el-input>
						</el-form-item>
						<el-form-item label='电芯类型：' label-width="100px" v-if='!productType'>
							<el-input v-model="form.plain"></el-input>
						</el-form-item>
						<el-form-item label='标配电池：' label-width="100px" v-else>
							<el-input v-model="form.plain"></el-input>
						</el-form-item>
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
                        <template>
						    <el-radio-group v-model="form.putway">	
								<el-radio :label="0">上架</el-radio>
								<el-radio :label="1">下架</el-radio>						
						    </el-radio-group>
                        </template>
					</el-form-item>	
					<el-form-item>
						<el-row>
							<el-button type="success" @click="submitForm()">保存</el-button>
						</el-row>
					</el-form-item>
			</el-col>
			
			</el-form>
		</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				productType:0,
				navtitle:'设置>产品管理>管理',
                form:{},
                id:'',
			}
		},
		methods: {
			handleChange(value) {
				console.log(value);
			},
			getBattery(id){	      	
	        	this.$get('battery/selectInfo',{
					id:this.id					
				}).then(data=>{
                    var arr = data;
                    this.putway=arr.putway;
					this.form = arr;
				})
            },
            submitForm(){
	      	    this.$post('battery/update',{
                    id:this.id,
	      		    name:this.form.name,
					mode:this.form.mode,
					groupnum:this.form.groupnum,
					brief:this.form.brief,
					pickcost:this.form.pickcost,
					deposit:this.form.deposit,
					marketprice:this.form.marketprice,
					powerrate:this.form.powerrate,
					monthrent:this.form.monthrent,
					quarterrent:this.form.quarterrent,
					annualrent:this.form.annualrent,
					putway:this.form.putway,
					performance:this.form.performance,
					weight:this.form.weight,
					plain:this.form.plain
                }).then(data=>{
					this.$ye();
					this.$router.push('/Main/Batterymanage');
                })
            }
        },
        created(){	  	
	  	this.id = this.$route.query.id;
	    },
		components: {
		},
		mounted(){
			this.getBattery(this.id);
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style scoped>	
	
    /*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}
</style>