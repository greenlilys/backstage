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
	import Weirecord from '@/components/money/weixin/Weirecord'
	import Zhirecord from '@/components/money/weixin/Zhirecord'
	
	
	export default {
      data(){
			return {
				navtitle:'资金>微信/支付宝记录',
				tabItem:['微信支付记录','支付宝支付记录'],
	        	tabComponents:['Weirecord','Zhirecord'],
	        	current:'Weirecord',
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
      	Weirecord,
      	Zhirecord
      }
    }
</script>

<style scoped>
	.outsideBox{position:relative;}
</style>