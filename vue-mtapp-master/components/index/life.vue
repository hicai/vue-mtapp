<template>
   <div class="m-life">
     <el-row>
			 <el-col :span="14">
				  <Carousel/>
			 </el-col>
			  <el-col :span="4">
         <div class="m-life-pic"></div>
       </el-col>
			 <el-col :span="6">
				 <div class="m-life-login">
					 <div class="m-life-login-tx"><img 
            src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" 
            alt=""></div>
						<p class="m-life-login-name">Hi！你好</p>
						<div>
							<nuxt-link to="/register">
								<el-button size="medium">注册</el-button>
							</nuxt-link>							
						</div>
            <div>
						<nuxt-link to="">
							<el-button size="medium">立即登录</el-button>
						</nuxt-link>	
            </div>					
				 </div>
			 </el-col>
		 </el-row>
		 <el-row>
			 <el-col :span="7">
          <div class="m-life-hotel"></div> 
			 </el-col>
			 <el-col :span="7">
				  <div class="m-life-music"></div> 
			 </el-col>
			 <el-col :span="4">
				  <div class="m-life-coop"></div>
			 </el-col>
			 <el-col :span="6">
			   <div class="m-life-downapp">
				   <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" 
            alt="下载APP">
						<p>美团APP手机版</p>
						<h4><span class="red">1元起</span>吃喝玩乐</h4>
				 </div>	 
			 </el-col>			 
		 </el-row>
	 </div>
</template>
<script>
import Carousel from './carousel'
export default {
	name:'',
	components:{
		Carousel
	},
	data(){
	 return {

	 }
	}
}
</script>

<style lang="scss">
    @import "@/assets/css/index/life.scss";
</style>
