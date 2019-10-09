<template>
   <div class="m-geo">
		 <i class="el-icon-location">    
     {{$store.state.geo.position.city}}
     </i> 
		  <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
      [佛山 ,深圳 ,珠海]
	 </div>
</template>

<script>
import { async } from 'q'
import store from '@/store'
export default {
   data(){
     return{
       city:''
     }
   },
  //  methods:{
     
  //     if(localStorage.getItem('newCity')){
  //         this.city = JSON.parse(localStorage.getItem('newCity'))
  //     }else{
  //       this.city = this.$store.state.geo.position.city
  //     }
  //  }
   mounted(){
     if(localStorage.getItem('newCity')){
        this.city = JSON.parse(localStorage.getItem('newCity'))
     }else{
       this.city = this.$store.state.geo.position.city
     }
   }
}
</script>

<style lang="css">

</style>
