<template>
	
<div class="main">
	<div v-if="isLogin" class="login">
		<Sign v-on:loginSuccess="login"></Sign>
	</div>
	<div v-else>
		<Head></Head>		
	</div>	
	<router-view></router-view>
</div>
</template>
<script>
	
import Sign from '@/components/Sign'	
import Head from '@/components/Head'
	
	export default {
		data(){
			return{
				isLogin:true
			}
		},
		methods:{
			login(){
				this.isLogin = false;
				
			}
		},
		components:{
			Head,			
			Sign
		
			
		}
	}

</script>
<style>
.main,.login{
	height:100%;
	
}
</style>