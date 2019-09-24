<template>
   <div class="m-geo">
		 <i class="el-icon-location">    
      {{ $store.state.geo.position.city }}
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
       city:[] 
     }
   },
  //   store,
  // async mounted(){
  //        let self = this;
  //        let positionCity = store.state.geo.position.city
  //        let {status,data:{city}} = await this.$axios.get(`/geo/province/${positionCity}`)
  //        if(status===200){
  //          self.city = city.map(item=>{
  //               return{
  //                 value:item.id,
  //                 label:item.name
  //               }
  //                console.log(self.city)
  //          })
  //        }
  //  }
}
</script>

<style lang="css">

</style>
