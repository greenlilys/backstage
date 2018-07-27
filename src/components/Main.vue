<template>

	<div class="main">
		<!--<div v-if="isLogin" class="login">
			<Sign v-on:loginSuccess="login"></Sign>
		</div>-->
		<div class="mainContent">
			<Head/>
			<div class="flex-wrap flex-horizontal mainBox">
				<Aside></Aside>
				<div class="flex-con">
					<Navbar></Navbar>
					<router-view class="mainview bgHui"></router-view>
				</div>				
			</div>
		</div>
	</div>
</template>
<script>
	import Sign from '@/components/Sign'
	import Head from '@/components/Head'
	import Aside from '@/components/aside/Aside'
	import Navbar from '@/components/common/Navbar'
	export default {
		data() {
			return {
				isLogin: true
			}
		},
		methods: {
			login() {
				this.isLogin = false;

			}
		},
		components: {
			Head,
			Sign,
			Aside,
			Navbar

		}
	}
</script>
<style>
	.main,.login,.mainContent {	height: 100%;}
	.mainBox{width:100%;}
	.mainview{height:852px;width:100%;box-sizing: border-box;padding-top: 10px;padding-left: 10px;padding-right: 10px;}
</style>