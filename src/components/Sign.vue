<template>
  	<el-row class="outsideBox1">
  		<el-col :span="24" class="bgHui outsideBox1 flex-wrap flex-vertical flex-justify-center flex-align-center">
        <div class="signBox">
          		<h3>天牛网管理后台</h3>
              <el-input v-model="userName" placeholder="请输入用户名" class="marginV-10"></el-input>
              <el-input type="password" v-model="passWord" placeholder="请输入密码" @keyup.enter.native="signBtn()"></el-input>
              <el-checkbox v-model="checked" label=true class="marginV-10">记住用户名</el-checkbox>
              <el-row>
              	<el-button type="success" class="btn mt-10" @click="signBtn">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
              </el-row>
        </div>
    </el-col>
   </el-row>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        userName:'',
        passWord:'',
        checked:'',
      }
    },
    methods:{
      signBtn(){

        if(!this.userName || !this.passWord ){
        	this.$message.warning('请输入用户名或密码');

        }else{
          this.$post('n/login/entry',{
                userName:this.userName,
                password:this.passWord
          }).then((data)=>{  
          	console.log(data)
				this.$router.push('/Main');
           })
          
        }
      }
        
   },
  }
</script>

<style scoped>
 
  .signBox{
    width:400px;
    height:300px;
    background:#fff;   
    box-sizing: border-box;
    padding:40px 20px 0 20px;
  }
 
.btn{ width:100%;}


</style>
