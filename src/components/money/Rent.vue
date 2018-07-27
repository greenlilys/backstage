<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<el-row class="contentBox" type="flex" align="middle">
				<el-col :span="8">
					 <div class="block">
					    <span class="demonstration">选择时段：&nbsp;</span>
					    {{value6}}
					    <el-date-picker
					      v-model="value6"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					  </div>
				</el-col>
				<el-col :span="1">
					<el-button type="primary" size="medium" class="btnStyle">查询</el-button>		
				</el-col>
			</el-row>
			
			<div class="contentBox mt-10">
				<p class="tc font-18">租金收入总额</p>
				<p class="tc font-20 fontYellow mt-10">￥<span>18000.00</span></p>
			</div>
			
			<div class="conBottom mt-10 flex-con">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>				
				
				<component v-bind:is="current"></component>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Rentrecord from '@/components/money/rent/Rentrecord'
	import Backrecord from '@/components/money/rent/Backrecord'
	
	export default{
		data(){
			return{
				tabItem:['租金记录','退租记录'],
	        	tabComponents:['Rentrecord','Backrecord'],
	        	current:'Rentrecord',
	        	currentI:'0',
	        	value6:''
			}
		},
		methods:{
			 changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
	      }
		},
		components:{
			Rentrecord,
			Backrecord
		}
	}
</script>

<style>
</style>