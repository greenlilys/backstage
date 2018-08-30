<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
		<el-row class="contentBox" type="flex" align="middle">
					<div class="block mr-20">
						<span class="font-14">选择时段：&nbsp;</span>
						<el-date-picker v-model="valueTime" type="daterange"  range-separator="至" start-placeholder="开始日期" 
							end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleTime">
						</el-date-picker>
					</div>
				<el-button type="success" size="medium" @click="search">查询</el-button>	
		</el-row>
		
		<div class="flex-wrap flex-horizontal mt-10">
			<div class="contentItem flex-con bw">
				<p class="font-20 tc mt-20">押金池余额</p>
				<p class="font-18 fontYellow tc mt-20 mb-20">￥{{deposit.deposit}}</p>
			</div>
			<div class="contentItem flex-con bw">
				<p class="font-20 tc mt-20">待缴滞纳金</p>
				<p class="font-18 fontYellow tc mt-20">￥{{deposit.unpaidlatefee}}</p>
			</div>
			<div class="contentItem flex-con bw">
				<p class="font-20 tc mt-20">已缴滞纳金</p>
				<p class="font-18 fontYellow tc mt-20">￥{{deposit.paidlatefee}}</p>
			</div>
			<div class="lastItem flex-con bw">
				<p class="font-20 tc mt-20">违约押金总额</p>
				<p class="font-18 fontYellow tc mt-20">￥{{deposit.defaultdeposit}}</p>
			</div>
		</div>
		
		<div class="conBottom mt-10 flex-con">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>				
				<component v-bind:is="current" :valueTime="valueTime"></component>
		</div>	
		</div>
	</div>
</template>

<script>
	import Deposit from '@/components/money/deposit/Deposit'
	import Breach from '@/components/money/deposit/Breach'
	import Getback from '@/components/money/deposit/Getback'
	import Late from '@/components/money/deposit/Late'
	import Paylate from '@/components/money/deposit/Paylate'
	
	export default {
      data() {
        return {
        	tabItem:['押金缴纳记录','滞纳金记录','已缴纳滞纳金记录','押金赎回记录','违约记录'],
        	tabComponents:['Deposit','Late','Paylate','Getback','Breach'],
        	current:'Deposit',
        	currentI:'0',
        	valueTime:[],
			deposit:{}			
        }
      },
      methods:{   	
	      changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
		  },
		  handleTime(v){//日期
		  	
		  },
		  depositStatist(){
			this.$get('capital/depositStatistics',{
				begin:this.begin,
				end:this.end
			}).then(data=>{
				this.deposit = data;	
			})
		  },
		  
		search(v) {
			
		},	  
	  },
	  mounted(){
		this.depositStatist(this.begin,this.end);
	  },
	  created(){
		  this.begin = this.$route.query.begin;
		this.end = this.$route.query.end;
	  },
      components:{
      	Deposit,
      	Breach,
      	Getback,
      	Late,
      	Paylate
      }
    }
</script>

<style scoped>
	.contentBox{margin:0;}
	.contentItem{margin-right:10px;}
	.contentItem,.lastItem{background:}
</style>