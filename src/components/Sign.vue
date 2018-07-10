<template>
  <div class="container-fluid" id="sign">
    <div class="row">
      <div class="col-md-12 bgQianHui flex-wrap flex-vertical flex-justify-center flex-align-center">

        <div class="signBox">
          <h3 class="text-left fontColor">天牛网管理后台</h3>
                    
              <el-input v-model="userName" placeholder="请输入用户名" class="marginV-10"></el-input>
              <el-input v-model="passWord" placeholder="请输入密码" ></el-input>  
              <el-radio v-model="radio" label=true class="marginV-10">记住用户名</el-radio> 
              <el-row type="flex" justify="center">
                     <el-button type="primary" class="btn btnReset" @click="signBtn">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
                    

              </el-row> 
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
  #sign,#sign .row,#sign .bgQianHui{
    height:100%;
  }
  .signBox{
    width:400px;
    height:300px;
    background:#fff;   
    box-sizing: border-box;
    padding:20px 20px 0 20px;
  }
 
.btn{
  width:100%;
  margin-top:15px;

}

</style>
