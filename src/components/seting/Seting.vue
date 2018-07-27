<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<div class="conBottom">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>					
			</div>
			<component v-bind:is="current"></component>
		</div>
	</div>
</template>
<script>
	import Serviceset from '@/components/seting/setings/Serviceset'
	import Helpset from '@/components/seting/setings/Helpset'
	import Pushset from '@/components/seting/setings/Pushset'
	import Getset from '@/components/seting/setings/Getset'
	import Bibiset from '@/components/seting/setings/Bibiset'
	
	export default {
    name: '',
    data(){
      return{
          tabItem:['服务设置','提现设置','天牛币设置','救援设置','充值/扣款密码设置'],
        	tabComponents:['Serviceset','Getset','Bibiset','Helpset','Pushset'],
        	current:'Serviceset',
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
    	Serviceset,
    	Getset,
    	Bibiset,
    	Helpset,
    	Pushset
    	
    }
  }

</script>
<style scope>

</style>