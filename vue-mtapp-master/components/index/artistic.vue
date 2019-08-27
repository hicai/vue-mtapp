<template>
  <div class="m-istyle">
    <dl @mouseover="enter">
		  <dt>有格调</dt>
		    <dd 
			 v-for="(list,index) in nav" 			
			 :key="index"
			 :kind="list.kind"
			 :class="{active:list.kind===kind}"	
			 >
        {{ list.name }}
			</dd>
			
		</dl> 
		<ul class="ibody">
			<li v-for="(item, index) in cur" :key="index">
          <el-card :body-style="{padding:'0px'}">
           <img :src="item.url">
			<div class="cbody">
             <p class="title">{{ item.title }}</p>
			 <p class="pos">{{ item.pos }}</p>
			 <p class="price">￥<em>{{ item.price }}</em><span>/起</span></p>
				 </div>
			 </el-card>
 			</li>
		</ul>
	</div>	
</template>
 
<script>
export default {
	name:'',
	data(){
	 return {
	 kind:'all',
	 nav:[
		{
		  name:'全部',
		  kind:'all'	
		},{
		  name:'约会聚餐',
		  kind:'part'	
		},{
          name:'丽人SPA',
		  kind:'sap'	
		},
		{
          name:'电影演出',
		  kind:'movie'	
		}
	 ],
     list:{
			all:[
						{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'汉堡1',
							pos:'地址1',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'汉堡2',
							pos:'地址2',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'汉堡3',
							pos:'地址3',
							price:'25'
						}
					],
					part:[
						{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'标题1',
							pos:'地址1',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'标题2',
							pos:'地址2',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'标题3',
							pos:'地址3',
							price:'25'
						}
					],
					sap:[
						{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'丽人1',
							pos:'地址1',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'丽人2',
							pos:'地址2',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'丽人3',
							pos:'地址3',
							price:'25'
						}
					],
					movie:[
						{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出1',
							pos:'地址1',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出2',
							pos:'地址2',
							price:'25'
						},{
							url:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
							title:'电影演出3',
							pos:'地址3',
							price:'25'
						}
					]				 
			 
			 }			 	 
	  }
	},
	mounted () {
		
	},
	methods:{
	  enter(e){
		let dom = e.target
		let tag = dom.tagName.toLowerCase()
		let self = this
		if(tag === 'dd'){
		  this.kind = dom.getAttribute('kind');  
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