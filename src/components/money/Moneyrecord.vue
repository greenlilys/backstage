<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<div class="flex-wrap flex-horizontal headBox">
				<div class="contentBox flex-con">
					<h1 class="font-18 tc mt-10">网点钱包余额总计</h1>
					<p class="font-20 fontYellow tc mt-10">￥<span>{{money.shopwallet}}</span></p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-18 tc mt-10">用户钱包余额总计</h1>
					<p class="font-20 fontYellow tc mt-10">￥<span>{{money.cuswallet}}</span></p>
				</div>
				<div class="contentBox flex-con">
					<h1 class="font-18 tc mt-10">用户天牛币总计</h1>
					<p class="font-20 fontYellow tc mt-10">￥<span>{{money.integral}}</span></p>
				</div>
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
	import Shopmoney from '@/components/money/moneys/Shopmoney'
	import Usermoney from '@/components/money/moneys/Usermoney'
	
	export default {
      data() {
        return {
			navtitle:'资金>钱包/天牛币记录-网点钱包',
        	tabItem:['网点钱包','用户钱包'],
        	tabComponents:['Shopmoney','Usermoney'],
        	current:'Shopmoney',
        	currentI:'0',
        	money:{}
        }
      },
      methods:{	    	 
	      changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
		  },
		  renewStatist(){
				this.$get('capital/walletStatistics',{
				}).then(data=>{
					this.money = data;
				})
		  }	  
		},
	  mounted(){
			this.renewStatist(this.begin,this.end);
			this.$sendTitle(this.navtitle);
	  },
	  created(){	  	
			this.begin = this.$route.query.begin;
			this.end = this.$route.query.end;
      },
      components:{
      	Shopmoney,
      	Usermoney
      }
    }
</script>

<style scoped>
	.headBox>div:nth-child(1){margin-right:10px;}
	.headBox>div:nth-child(2){border-right:#EBF0F4 1px solid;}
</style>