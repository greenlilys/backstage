<template>
	<div>
		<el-row class="head font-14">
			<el-col :span="24">
				<ul class="clear head headbg">
					<li class="fl logoBox"><img src="../assets/images/logo.png" class="logo"><span>天牛网平台管理</span></li>
					<!--<li class="fl"><span class="glyphicon glyphicon-menu-hamburger iconbar font-20"></span></li>-->
					<li class="fr tab" @click="outlogin">退出</li>
					<li class="fr tablast">欢迎使用&nbsp;&nbsp;<span>{{nickname}}</span></li>
				</ul>
			</el-col>
		</el-row>
		<Dialogue :textContent="textContent" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
	</div>
</template>
<script>
	import Dialogue from '@/components/common/Dialogue'
	 export default {
    data() {
      return {        
        nickname:'',
        textContent:'您确认退出该平台吗？',
        dialogVisible:false
      };
    },
    methods: {     
      outlogin(){
      	this.dialogVisible = true;
      },
      confirmIsuse(){
	      	this.$get('n/login/logout',{      		
	      	}).then(data=>{
	      		this.dialogVisible = false;
	      		this.$router.replace('/Sign');
	      	})
      },
      canceluse(){
      	this.dialogVisible = false;
      }
    },
    mounted(){
    	var self = this;
    	this.$bus.$on('getname',function(str){//首次进入页面执行此回调  		
    		window.localStorage.setItem('nickname',str);
    		self.nickname = window.localStorage.getItem('nickname');    		
    	})
    	//之后页面刷新执行这一行
    	self.nickname = window.localStorage.getItem('nickname');    	
    },   
    components:{
    	Dialogue
    }
  };

</script>
<style>
.head{   width:100%;}
.head li{height:50px;text-align:center;line-height: 50px;color:#fff;}
.head .tab{	width:5%;cursor:pointer;}
.tablast{width:10%;}
.logoBox{	width:13%;height:50px;}
.logo{width:30%;height:auto;}
.iconbar{font-size:18px;line-height: 47px;padding-left:10px;}




</style>