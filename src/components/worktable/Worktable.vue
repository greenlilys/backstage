<template>
	<div class="bg bgHui">		
		
			  	<ul class="tabItem flex-wrap flex-horizontal flex-justify-between">
						<li class="flex-wrap flex-vertical  flex-align-center"><span>今日注册</span><span>64</span></li>
						<li class="flex-wrap flex-vertical  flex-align-center"><span>今日安装</span><span>96</span></li>
						<li class="flex-wrap flex-vertical  flex-align-center"><span>今日换电</span><span>55</span></li>
						<li class="flex-wrap flex-vertical  flex-align-center"><span>今日退租</span><span>52</span></li>					
				</ul>	
			
			<div class="tabCard clear mt-10">					
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>					
					<el-button type="primary" size="small" class="btnStyle mt-10">本周</el-button>		
					<el-button type="primary" size="small" class="btnStyle mt-10">本月</el-button>		
			</div>
			
			<component v-bind:is="current"></component>		
		

	</div>
</template>
<script>
	import Register from '@/components/workTable/Register'
	import Install from '@/components/workTable/Install'
	import Change from '@/components/workTable/Change'
	import Cancel from '@/components/workTable/Cancel'
	
	export default {
		data() {
			return {
				tabItem:['注册','安装','换电','退租'],
				tabComponents:['Register','Install','Change','Cancel'],
				current:'Register',
				currentI:'0'
			}
		},

		methods: {
			changeItem(v,i){
				this.currentI = i;
	      		this.current = this.tabComponents[i];
			}

		},
		components: {
			Register,
			Install,
			Change,
			Cancel
		},
		mounted() {
			
		}
	}
</script>
<style scoped>
.bg{width:100%;padding-top:10px;padding-left:10px;padding-right:10px;box-sizing: border-box;}
.tabItem{width:90%;margin:0 auto;}
.tabItem li{width:23%;height:140px;background:#fff;}
.tabItem li span:nth-child(2){font-size:38px;color:#FF6600;margin-top:20px;}
.tabItem li span:nth-child(1){	font-size:16px;	font-weight:bold;margin-top:10px;}
.tabItem span{	display:block;}

.tabCard{background:#fff;border-top:2px solid #FF9900;width:90%;line-height: 26px;margin:10px auto 0;}
.tabCard div{float:left;font-size:16px;padding:10px 20px;background:#fff;cursor: pointer;}
.tabCard .actived{background:#FF9900;color:#fff;}
.tabCard .btnStyle{float:right;margin-right:10px;}

#main{width:90%;margin:10px auto 0;height:600px;}
</style>