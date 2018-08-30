
<template>
	<div>
		<el-row class="joinshop" type="flex" align="middle">
			<el-col :span="8">
				  <div>
				  	<span class="ml-10 font-14">服务类型：&nbsp;&nbsp;&nbsp;&nbsp;</span>
				    <el-radio-group v-model="radio4" size="small" @change="changeHandler">
				      <el-radio-button label="换电分润" ></el-radio-button>
				      <el-radio-button label="租金分润"></el-radio-button>
				      <el-radio-button label="救援分润"></el-radio-button>
				    </el-radio-group>
				  </div>				
			</el-col>

			<el-col :span="8" :offset="8" class="tr">
				   <div class="block">    
				    <el-date-picker
				     @change="changeTime"
				      v-model="value6"
				      value-format="timestamp"
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
				    </el-date-picker>
				  </div>
			</el-col>

		</el-row>
		<component v-bind:is="current" :searchTime="searchTime" :id="id"></component>
		
	</div>
</template>

<script>
	import Changemoney from '@/components/business/Changemoney'
	import Rentmoney from '@/components/business/Rentmoney'
	import Helpmoney from '@/components/business/Helpmoney'
	
	export default {
		data() {
			return {
				
				radio4:'换电分润',
				value6:'',
				current:'Changemoney',
				searchTime:[]
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			navAddshop() {
				
			},
			navShopdetail() {
				
			},
			changeHandler(value){
				switch(value)
				{
					case '换电分润':
					this.current = 'Changemoney';
					break;
					case '租金分润':
					this.current = 'Rentmoney';
					break;
					case '救援分润':
					this.current = 'Helpmoney';
					break;
					
				}
				
			},
			changeTime(value){
				this.searchTime = value;
				console.log(value)
			}
		},
		components:{
			Changemoney,
			Rentmoney,
			Helpmoney
		},
		props:['id']
	}
</script>
<style scoped>
	.shopList {width: 100%;box-sizing: border-box;}	
	.joinshop {	margin:10px 0;}	
	.joinshop .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>