<template>
	<div>
			<div class="contentBox flex-wrap flex-vertical hf">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>				
				
				<component v-bind:is="current" class="flex-con"></component>
				
				
			</div>
	</div>
</template>

<script>
	import Businessrebate from '@/components/money/rebate/Businessrebate'
	import Rebaterecord from '@/components/money/rebate/Rebaterecord'
	
	export default {
      data(){
			return {
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
      components:{
      	Businessrebate,
      	Rebaterecord
      }
    }
</script>

<style scoped>
	.outsideBox{position:relative;}
</style>