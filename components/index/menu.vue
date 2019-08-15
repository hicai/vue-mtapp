<template>
   <div class="m-menu"  @mouseleave="leave">
     <dl class="nav"  >
			 <dt>全部分类</dt>
			 <dd 
        v-for="(item,index) in menu"
        :key="index"
        @mouseenter="enter"
        >
				 <i :class="item.type"></i>
				   {{item.name}}
				 <span class="arrow"></span>
			 </dd>
		 </dl>
		 <div class="detail"
        v-if="kind"
      >
        <template v-for="(item,idx) in curdetail.child">
				   <h4 :key="idx">{{ item.title }}</h4>
					 <span 
           v-for="v in item.child"
           :key="v"
           >
             {{ v }}
           </span>
				</template> 
		 </div>
	 </div>
</template>

<script>
export default {
	name:'',
	data(){
	 return {
       kind:0,
       menu:[{
        type:'food',
        name:'美食',
        child:[{
          title:'美食',
          child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
        }]
      },{
        type:'takeout',
        name:'外卖',
        child:[{
          title:'外卖',
          child:['美团外卖']
        }]
      },{
        type:'hotel',
        name:'酒店',
        child:[{
          title:'酒店星级',
          child:['经济型','舒适/三星','高档/四星','豪华/五星']
        }]
      }]
	  }
	},
	computed:{
		curdetail(){
       // console.log(this.menu.filter(item => item.type===this.kind))
        return this.menu.filter(item => item.type===this.kind)[0]
		 }
	},
 methods: {
    enter(e){
      this.kind = e.target.querySelector('i').className
      },
    leave(){
      let self = this;
      setTimeout(() => {
        self.kind = ''
      }, 200);
    }  
  },
}
</script>

<style lang="css">

</style>
