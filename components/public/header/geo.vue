<template>
   <div class="m-geo">
		 <i class="el-icon-location">  
       <!-- {{cityVal}}   -->
     {{$store.state.geo.position.city.replace('市','')}}
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
       cityVal:''
     }
   },
   mounted(){
     if(localStorage.getItem('newCity')){
        this.cityVal = JSON.parse(localStorage.getItem('newCity'))
     }else{
       this.cityVal = this.$store.state.geo.position.city
     }
   }
}
</script>

<style lang="css">

</style>
