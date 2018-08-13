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
	import Walletrecord from '@/components/money/platform/Walletrecord'
	import Beetlerecord from '@/components/money/platform/Beetlerecord'
	
	
	export default {
      data(){
			return {
				tabItem:['平台钱包操作记录','平台天牛币记录'],
	        	tabComponents:['Walletrecord','Beetlerecord'],
	        	current:'Walletrecord',
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
      	Walletrecord,
      	Beetlerecord
      }
    }
</script>

<style scoped>
	.outsideBox{position:relative;}
</style>