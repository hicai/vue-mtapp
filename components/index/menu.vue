<template>
   <div class="m-menu"  @mouseleave="leave">
     <dl class="nav"  >
			 <dt>全部分类</dt>
			 <dd 
        v-for="(item,index) in $store.state.menu.menu"
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

	  }
	},
	computed:{
		curdetail(){
      //  console.log(this.menu.filter(item => item.type===this.kind[0]))
        return this.$store.state.menu.menu.filter(item => item.type===this.kind)[0]
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
