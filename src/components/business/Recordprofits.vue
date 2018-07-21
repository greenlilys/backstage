
<template>
	<div>
		<el-row class="joinshop" type="flex" align="middle">
			<el-col :span="8">
				  <div>
				  	<span style="padding-left:10px;">服务类型：&nbsp;&nbsp;&nbsp;&nbsp;</span>
				    <el-radio-group v-model="radio4" size="small" @change="changeHandler">
				      <el-radio-button label="换电分润" ></el-radio-button>
				      <el-radio-button label="租金分润"></el-radio-button>
				      <el-radio-button label="救援分润"></el-radio-button>
				    </el-radio-group>
				  </div>
				
			</el-col>

			<el-col :span="8" :offset="8" style="text-align:right;">
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
		<component v-bind:is="current"></component>
		
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
				current:'Changemoney'
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
				this.$router.push('/Shoplist/Addshop');
			},
			navShopdetail() {
				this.$router.push('/Shoplist/Shopdetail');
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
				console.log(value)
			}
		},
		components:{
			Changemoney,
			Rentmoney,
			Helpmoney
		}
	}
</script>
<style scoped>
	.shopList {width: 100%;box-sizing: border-box;}	
	.joinshop {	margin:10px 0;}	
	.joinshop .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>