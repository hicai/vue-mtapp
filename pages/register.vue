<template>
   <div class="page-register">
     <div class="header-box">
			 <div class="header">
         <nuxt-link to="/">
          <span class="site-logo"></span>
         </nuxt-link>
				 <span class="login">
					 已有美团账号
             <nuxt-link to="/login">
					    <el-button type="primary">登录</el-button>
             </nuxt-link>
				 </span>
			 </div>     
		 </div>
	 <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password" />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a 
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section> 
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
        export default {
          layout: 'bank',
          data() {
            return {
              statusMsg: '',
              error: '',
              ruleForm: {
                name: '',
                code: '',
                pwd: '',
                cpwd: '',
                email: ''
              },
              rules: {
                name: [{
                  required: true,
                  type: 'string',
                  message: '请输入昵称',
                  trigger: 'blur'
                }],
                email: [{
                  required: true,
                  type: 'email',
                  message: '请输入邮箱',
                  trigger: 'blur'
                }],
                pwd: [{
                  required: true,
                  message: '创建密码',
                  trigger: 'blur'
                }],
                cpwd: [{
                  required: true,
                  message: '确认密码',
                  trigger: 'blur'
                }, {
                  validator: (rule, value, callback) => {
                    if (value === '') {
                      callback(new Error('请再次输入密码'))
                    } else if (value !== this.ruleForm.pwd) {
                      callback(new Error('两次输入密码不一致'))
                    } else {
                      callback()
                    }
                  },
                  trigger: 'blur'
                }]
              }
            }
          },
          methods: {
            sendMsg: function () {
              const self = this;
              let namePass
              let emailPass
             
              this.$refs['ruleForm'].validateField('name', (valid) => {
                namePass = valid
              })
              self.statusMsg = ''
              if (namePass) {
                return false
              }
              this.$refs['ruleForm'].validateField('email', (valid) => {
                emailPass = valid
              })
              if (!namePass && !emailPass) {
                self.$axios.post('/users/verify', {
                  username: encodeURIComponent(self.ruleForm.name),
                  email: self.ruleForm.email
                }).then(({
                  status,
                  data
                }) => {
                  if (status === 200 && data && data.code === 0) {
                    let count = 60;
                    self.statusMsg = `验证码已发送,剩余${count--}秒`
                    self.timerid = setInterval(function () {
                      self.statusMsg = `验证码已发送,剩余${count--}秒`
                      if (count === -1) {
                        clearInterval(self.timerid);  
                        self.statusMsg = ''
                      }            
                    }, 1000)
                  } else {
                    self.statusMsg = data.msg
                  }
                })
              }
            },
            register: function () {
              let self = this;
              this.$refs['ruleForm'].validate((valid)=>{
                if(valid){
                  self.$axios.post('/users/signup',{
                    username:window.encodeURIComponent(self.ruleForm.name), //编码，防止中文名称
                    password:CryptoJS.MD5(self.ruleForm.pwd).toString(), //CryptoJS.MD5()密码加密
                    code:self.ruleForm.code,
                    email:self.ruleForm.email
                  }).then(({status,data})=>{
                    if(status === 200){
                      if(data && data.code === 0){
                       self.$router.push('/login')
                       this.$refs['ruleForm'].resetFields(); //移除校验结果并重置字段值
                      }else{
                        self.error = data.msg
                      }
                    }else{
                        self.error = `服务器出错，错误码${status}`
                     }
                     //定时清空xxxxxxxxxxxx
                     setTimeout(function(){
                       self.errpr = ''
                     },1000)
                  })
                }
              })
            }
          }
        }
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
