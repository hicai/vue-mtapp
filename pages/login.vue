<template>
  <div class="page-login">
      <div class="login-header">
      <a
        href="/"
        class="logo"/>
      </div>     
    <div class="form">
      <h4
        v-if="error"
        class="tips"><i/>{{ error }}</h4>
      <p>账号登陆</p>
      <el-input 
        v-model="username" 
        prefix-icon="el-icon-user"
        autocomplete="off"
        placeholder="请输入用户名"
        ></el-input>
      <p>密码</p>
       <el-input
          v-model="password"
          prefix-icon="el-icon-lock"
          autocomplete="off"
           placeholder="请输入密码"
          show-password></el-input>
       <div class="remember">
        <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
        <span>忘记密码？</span>
       </div>
       <el-button 
       class="btn-login"
       size="medium"
       type="success"
       @click="login"
       >登录</el-button>
    </div>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'bank',
  data(){
    return{
      username:'',
      password:'',
      checked:true,
      error: ''
    }
  },
  methods: {
      login(){
         this.$axios.post("/users/signin",{
            username:window.encodeURIComponent(this.username),
            password:CryptoJS.MD5(this.password).toString()
         }).then(res=>{
             if(res.status === 200){
               if(res.data && res.data.code === 0){
                   this.$router.push('/')
                   this.username = ""
                   this.password = ""
               }else{
                   this.error = res.data.msg
               }
             }else{
                this.error=`服务器出错`   
             }
         })

      }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/login/index.scss"; 
 .page-login{
      .form{
          background: #fff;
          width: 300px;
          height: 250px;
          border:1px solid #ccc;
          border-radius: 15px;
          padding:20px;
          text-align: center;
          position: absolute;
          top:50%;
          left: 50%;
          margin-top:-125px;
          margin-left:-150px;
    
          .el-input{
              margin-bottom: 10px;
          }
          p{
              text-align: left;
          }
        .remember{
            margin: 10px 0 20px 0;
            text-align: right;
            span{
                color:#333;
            }
        }
        .btn-login{
            background: #2bb8aa;  
        }
      }
  }
 
</style>