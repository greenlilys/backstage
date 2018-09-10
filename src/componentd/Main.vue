<template>
	<div class="main">		
		<div class="mainContent flex-wrap flex-vertical">
		<keep-alive>
			<Head class="headHeight"></Head>
		</keep-alive>			
			<div class="flex-wrap flex-horizontal mainBox flex-con">
				<Aside></Aside>
				<div class="flex-con flex-wrap flex-vertical">
					<Navbar></Navbar>
					<router-view class="mainview bgHui flex-con"></router-view>
				</div>				
			</div>
		</div>
	</div>
</template>
<script>
	
	import Head from '@/components/Head'
	import Aside from '@/components/aside/Aside'
	import Navbar from '@/components/common/Navbar'
	
	export default {
		data() {
			return {
				isLogin:true
			}
		},
		methods: {
			
		},
		components: {
			Head,			
			Aside,
			Navbar
		}
	}
</script>
<style>
	.main,.mainContent {
		height: 100%;
		
		}	
	.mainBox{width:100%;}	
	.headHeight{height:50px}
	.mainview{
	width:100%;box-sizing: border-box;padding: 10px 10px 0;}

</style>