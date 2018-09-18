
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
				      v-model="searchTime"				    
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      value-format="yyyy-MM-dd">
				    </el-date-picker>
				  </div>
			</el-col>

		</el-row>
		<component v-bind:is="current" :searchTime="searchTime"></component>
		
	</div>
</template>

<script>
	import Changemoney from '@/componentd/money/Fanli/Changemoney'
	import Rentmoney from '@/componentd/money/Fanli/Rentmoney'
	import Helpmoney from '@/componentd/money/Fanli/Helpmoney'
	
	export default {
		data() {
			return {				
				radio4:'换电分润',				
				current:'Changemoney',
				searchTime:[]//搜索时间
			};
		},
		methods: {
			
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
				console.log(this.searchTime)
			}
		},
		components:{
			Changemoney,
			Rentmoney,
			Helpmoney
		},
		watch:{
			searchTime:function(newVal,oldVal){
				if(newVal){
					this.$emit('sendTime',this.searchTime);
				}
			}
		}
		
	}
</script>
<style scoped>
	.shopList {width: 100%;box-sizing: border-box;}	
	.joinshop {	margin:10px 0;}	
	.joinshop .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>