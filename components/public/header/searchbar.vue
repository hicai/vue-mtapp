<template>
  <div class="search-panel">
		<el-row class="m-header-searchbar">
			<el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" 
				alt="美团">
			</el-col>
			<el-col :span="16" class="center">
			   <div class="wrapper">
					 <el-input placeholder="输入搜索内容" v-model="search"
					  @focus="focus"
						@blur="blur"
						@input="input"
					 >
            <el-button slot="append" icon="el-icon-search"></el-button>
					 </el-input>
					 <!-- 热门推荐 -->
           <dl class="hotPlace" 
					     v-if="ifHotPlace">
             <dt>热门搜索</dt>
						 <dd 
						   v-for="(item,index) in HotPlaceList"
							 :key="index"
							 >
						   {{item}}	 
						 </dd>
						 
					 </dl>
					 <!-- 相关搜索 -->
           <dl class="searchList"
				    	 v-if="ifSearchList">
						 <dd 
						   v-for="(item,index) in SearchList"
							 :key="index"
							 >
						   {{item}}	 
						 </dd>
					 </dl>
					 <!-- 菜单 -->
				 </div>
				 <p class="suggest">
					 <a href="#">故宫博物院</a>
					 <a href="#">故宫博物院</a>
					 <a href="#">故宫博物院</a>
					 <a href="#">故宫博物院</a>
					 <a href="#">故宫博物院</a>
				 </p>
				  <ul class="nav">
          <li><nuxt-link
            to="/"
            class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="business">商家入驻</nuxt-link></li>
        </ul>
			</el-col>
			<el-col :span="5" class="right">
				<ul class="security">
					<li><i class="refund"></i><p class="txt">随时退</p></li>
					<li><i class="single"></i><p class="txt">不满意免单</p></li>
					<li><i class="overdue"></i><p class="txt">过期退</p></li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name:'',
	data(){
	 return {
		search:'',
		ifFous:false,
		HotPlaceList:['故宫','故宫','故宫'],
		SearchList:['火锅','火锅','火锅']
	 }
	},
	computed: {
		ifHotPlace(){
			return this.ifFous&&!this.search
		},
		ifSearchList(){
			return this.ifFous&&this.search
		}
	},
	methods: {
		focus(){
			this.ifFous = true
		},
		blur(){
			let self = this;
			setTimeout(() => {
				self.ifFous = false
			},200);	
		},
		input(){
			console.log('input')
		}
	}
}
</script>

<style lang="css">

</style>
