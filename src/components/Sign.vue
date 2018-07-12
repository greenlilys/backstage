<template>
  <div class="container-fluid" id="sign">
    <div class="row ">
      <div class="col-md-12 bgHui flex-wrap flex-vertical flex-justify-center flex-align-center">

        <div class="signBox">
          <h3 class="text-left fontColor">天牛网管理后台</h3>
                    
              <el-input v-model="userName" placeholder="请输入用户名" class="marginV-10"></el-input>
              <el-input v-model="passWord" placeholder="请输入密码" ></el-input>  
              <el-radio v-model="radio" label=true class="marginV-10">记住用户名</el-radio> 
							<button type="button" class="btn btnReset mt-10" @click="signBtn">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</button>		
             
        </div>

      </div>
    </div>
  </div>
  
 
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
          userName:"",
          passWord:"",
          radio:false
      }
    },
    methods:{
      signBtn(){
        // 登录成功       
        this.$emit('loginSuccess');
        this.$router.push('/Worktable');
      }
    }
  }
</script>

<style scoped>
  #sign,#sign .row,#sign .bgHui{
    height:100%;
  }
  .signBox{
    width:400px;
    height:300px;
    background:#fff;   
    box-sizing: border-box;
    padding:40px 20px 0 20px;
  }
 
.btn{
  width:100%;  
	padding-top:8px;
	padding-bottom:8px;
}


</style>
