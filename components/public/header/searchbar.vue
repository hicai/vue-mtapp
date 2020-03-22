<template>
  <div class="search-panel">
		<el-row class="m-header-searchbar">
			<el-col :span="3" class="left">
		    <nuxt-link to="/">		
			<img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" 
					alt="美团">
		    </nuxt-link>
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
						   v-for="(item,idx) in $store.state.hot.hotPlace.slice(0,5)"
							 :key="idx"
							 >
							 <nuxt-link :to="'/product?keyword='+encodeURIComponent(item.name)">				
							  {{ item.name }}	
							 </nuxt-link> 
						 </dd>
						 
					 </dl>
					 <!-- 相关搜索 -->
           <dl class="searchList"
				    	 v-if="ifSearchList">
						 <dd 
						   v-for="(item,index) in searchList"
							 :key="index"
							 >
							  <nuxt-link :to="'/product?keyword='+encodeURIComponent(item.name)">				
							  {{ item.name }}	
							 </nuxt-link> 
						 </dd>
					 </dl>
					 <!-- 菜单 -->
				 </div>
				 <div class="suggest">
					<li 
					v-for="(item,idx) in $store.state.hot.hotPlace.slice(0,5)"
					:key="idx">
					  <nuxt-link :to="'/product?keyword='+encodeURIComponent(item.name)">				
							  {{ item.name }}	
							 </nuxt-link> 
						</li> 
				 </div>
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
import _ from 'lodash'
export default {
	name:'',
	data(){
	 return {
		search:'',
		ifFous:false,
		hotPlace:[],
		searchList:[]
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
		focus:function(){
			this.ifFous = true
		},
		blur:function(){
			let self = this;
			setTimeout(() => {
				self.ifFous = false
			},200);	
		},
		input:_.debounce(async function(){
			 //_.debounce延迟操作,输入监听请求数据
              let self = this;
			  let city=self.$store.state.geo.position.city.replace('市','')
			  self.searchList = []
			  let {status,data:{top}} = await self.$axios.get('/search/top',{
         params:{
					input: self.search,
					city
				 }
			  }) 		 
        self.searchList = top.slice(0,10)      
		},200)
		  
 

	}
}
</script>
<style lang="css">
</style>
