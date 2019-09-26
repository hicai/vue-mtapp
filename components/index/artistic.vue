<template>
  <div class="m-istyle">
    <dl @mouseover="enter">
		  <dt>有格调</dt>
		    <dd 
			 v-for="(list,index) in nav" 			
			 :key="index"
			 :kind="list.kind"
			 :keyword="list.keyword"
			 :class="{active:list.kind===kind}"	
			 >
        {{ list.name }}
			</dd>
			
		</dl> 
		<ul class="ibody">
			<li v-for="(item, index) in cur" :key="index">
          <el-card :body-style="{padding:'0px'}">
           <img :src="item.img">
			<div class="cbody">
             <p class="title">{{ item.title }}</p>
			 <p class="pos">{{ item.pos }}</p>
			 <p class="price,">￥{{ item.price }}<span>/起</span></p>
				 </div>
			 </el-card>
 			</li>
		</ul>
	</div>	
</template>
 
<script>
import { timeout } from 'q'
export default {
	name:'',
	data(){
	 return {
	 kind:'all',
	 keyword:'景点',
	 nav:[
		{
		  name:'全部',
		  kind:'all',
		  keyword:'景点'	
		},{
		  name:'约会聚餐',
		  kind:'part',
		  keyword:'美食'	
		},{
          name:'丽人SPA',
		  kind:'sap',
		  keyword:'丽人'	
		},
		{
          name:'电影演出',
		  kind:'movie',
		  keyword:'电影'		
		},
		{
          name:'品质出游',
		  kind:'travel',
		  keyword:'旅游'		
		}
	 ],
     list:{
			all:[
						{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'汉堡1',
							pos:'地址1',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'汉堡2',
							pos:'地址2',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'汉堡3',
							pos:'地址3',
							price:'25',
							url:'//abc.com'
						}
					],
					part:[
						{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'标题1',
							pos:'地址1',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'标题2',
							pos:'地址2',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'标题3',
							pos:'地址3',
							price:'25',
							url:'//abc.com'
						}
					],
					sap:[
						{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'丽人1',
							pos:'地址1',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'丽人2',
							pos:'地址2',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'丽人3',
							pos:'地址3',
							price:'25',
							url:'//abc.com'
						}
					],
					movie:[
						{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出1',
							pos:'地址1',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出2',
							pos:'地址2',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出3',
							pos:'地址3',
							price:'25',
							url:'//abc.com'
						}
					],
					travel:[
						{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出1',
							pos:'地址1',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出2',
							pos:'地址2',
							price:'25',
							url:'//abc.com'
						},{
							img:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出3',
							pos:'地址3',
							price:'25',
							url:'//abc.com'
						}
			      ]				 	 
			 }			 	 
	  }
	},
	mounted () {
		
	},
   methods:{
	 async enter(e){
		let dom = e.target
		let tag = dom.tagName.toLowerCase()
		let self = this
		if(tag === 'dd'){
		  this.kind = dom.getAttribute('kind');  
		  this.keyword = dom.getAttribute('keyword');
		  let {status,data:{count,pois}} = await self.$axios.get('/search/artistic',{
			  params:{
				  keyword,
				  city:self.$store.state.geo.position.city
			  }
		  })
		  if(status===200&&count>0){
			  self.list = pois.filter(item=>{
				  item.photos.length  //过滤出有图片的数组
			  }).map(item=>{
				  return {
					img:item.photos[0].url,
					title:item.name,
					pos:item.address,
					price:item.biz_ext.cost||'暂无',
					url:'//abc.com'
				  }
			  })
		  }
		  
		}
	  }	
	},
	computed:{
      cur(){
		  // console.log(this.list[this.kind])
		  return this.list[this.kind]
		}
	}
}
</script>

<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>