<template>
  <div class="page-login">
      <div class="login-header">
      <a
        href="/"
        class="logo"/>
      </div>     
    <div class="form">
      <p>账号登陆</p>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <p>密码</p>
       <el-input v-model="password" placeholder="请输入密码"></el-input>
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
         let self = this;
         this.$axios.post("/users/signin",{
            username:window.encodeURIComponent(this.username),
            password:CryptoJS.MD5(this.password).toString()
         }).then(res=>{
             if(status === 2000){
               if(res.data && res.data.code === 0){
                   self.$router.push('/')
               }else{
                   self.error = res.data.msg
               }
             }else{
                self.error=`服务器出错`   
             }
         })

      }
  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/css/login/index.scss"; 
 .page-login{
    // position: fixed;
    //  width: 100%;
    //  height: 100%;
    //  background: linear-gradient(141deg, #89e6dd 0%, #32ccbc 51%, #2bb8aa 75%);
    //  top:0;
    //  left: 0;
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