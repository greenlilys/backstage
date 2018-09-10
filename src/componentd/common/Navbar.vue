<template>
	<div class="nav font-14">{{navtitle}}</div>
</template>

<script>
	export default{
		data(){
			return{
				navtitle:''
			}
		},
		methods:{
			
		},
		mounted(){
			let self = this;
			this.$bus.$on('getTitle',function(str){
				self.navtitle = str;
			})
		}
	}
</script>

<style>
	.nav{background:#fff;border-radius:0;height:38px;line-height: 38px;padding-left:10px;color:#909399}
</style>