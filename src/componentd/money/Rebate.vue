<template>
	<div class="flex-wrap flex-vertical">
			<div class="p-10 pb-0 boxborder bw">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>					
			</div>
			<component v-bind:is="current" class="flex-con"></component>
	</div>
</template>

<script>
	import Businessrebate from '@/components/money/rebate/Businessrebate'
	import Rebaterecord from '@/components/money/rebate/Rebaterecord'
	
	export default {
      data(){
			return {
				navtitle:'资金>运营商返利结算',
				tabItem:['运营商返利结算','结算记录'],
	        	tabComponents:['Businessrebate','Rebaterecord'],
	        	current:'Businessrebate',
	        	currentI:'0'
		        }
			},
      methods:{	    	
	    changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
	      }
	     
	  },
	  mounted:function(){
		  this.$sendTitle(this.navtitle);
	  },
      components:{
      	Businessrebate,
      	Rebaterecord
      }
    }
</script>

<style scoped>
	.outsideBox{position:relative;}
</style>