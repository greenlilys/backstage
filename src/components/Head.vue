<template>
	<el-row class="head font-18">
		<el-col :span="24">

			<ul class="clear head tncolor">
				<li class="fl logoBox"><img src="../assets/logo.png" class="logo"></li>
				<li class="fl tab"><router-link to='/Worktable'>工作台</router-link></li>
				<li class="fl tab"><router-link to='/Shop'>网点</router-link></li>
				<li class="fl tab"><router-link to='/User'>用户</router-link></li>
				<li class="fl tab"><router-link to='/Active'>活动</router-link></li>
				<li class="fl tab"><router-link to='/Meet'>预约</router-link></li>
				<li class="fl tab"><router-link to='/Battery'>电池</router-link></li>
				<li class="fl tab"><router-link to='/Amount'>统计</router-link></li>
				<li class="fl tab"><router-link to='/Seting'>设置</router-link></li>			

				<li class="fr tab">退出</li>
				<li class="fr tablast">欢迎使用</li>
			</ul>

		</el-col>
	</el-row>

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
.head{  
  width:100%;

}
.head li{
	height:70px;
	text-align: center;
	line-height: 70px;
	color:#fff;
}
.head .tab{
	width:5%;
}
.tablast{
	width:10%;
}
.logoBox{
	width:8%;
	height:70px;	
}

.logo{
	width:80%;	
	height:auto;

}




</style>