<template>
	<div class="aside flex-wrap flex-horizontal flex-justify-between">
		<div class="box ">
			<ul class="bgZhongHui tncolor ">
				<li class="item font-16 "><router-link to='/Shop/Joinshop'>加盟网点</router-link></li>
				<li class="item font-16"><router-link to='/Joinplase'>加盟申请</router-link></li>
				<li class="item font-16"><router-link to='/Zoneactive'>平台活动</router-link></li>
				<li class="item font-16"><router-link to='/Zonenotice'>平台公告</router-link></li>
			</ul>
		</div>
		<div class="mainContent">
			<router-view></router-view>
		</div>
		
	</div>

</template>
<script>
	export default {
		name: '',
		data() {
			return {

			}
		},
		methods: {

		},
		components: {

		}
	}
</script>
<style scope>
	.aside {width: 100%;}
	
	.box {width: 8%;}
	
	.aside ul {	height: 880px;}
	
	.aside li {text-align: center;height: 50px;line-height: 50px;}
	.box li{border-bottom:1px solid #40A74D;color:#fff;	cursor: pointer;}
	
	.box li:nth-child(1){border-top:1px solid #40A74D;}
	.mainContent{flex:1;}
</style>