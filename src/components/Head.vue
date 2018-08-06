<template>
	<div>
		<el-row class="head font-14">
			<el-col :span="24">
				<ul class="clear head headbg">
					<li class="fl logoBox"><img src="../assets/images/logo.png" class="logo"><span>天牛网平台管理</span></li>
					<li class="fl"><span class="glyphicon glyphicon-menu-hamburger iconbar font-20"></span></li>
					<li class="fr tab">退出</li>
					<li class="fr tablast">欢迎使用</li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	 export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };

</script>
<style>
.head{   width:100%;}
.head li{height:50px;text-align:center;line-height: 50px;color:#fff;}
.head .tab{	width:5%;}
.tablast{width:10%;}
.logoBox{	width:13%;height:50px;}
.logo{width:30%;height:auto;}
.iconbar{font-size:18px;line-height: 47px;padding-left:10px;}




</style>