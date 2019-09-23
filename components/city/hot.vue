<template>
    <div class="hot-city">
       <span>热门城市:</span> 
       <ul>
          <li 
          v-for="item in hotCity"
          :key="item.id"
          >
              {{item.name}}   
          </li> 
       </ul>
    </div>
</template>

<script>
export default {
   data(){
    return{
       hotCity:[] 
    }
   },
   async mounted(){
     let seft = this;
     let {status,data:{hots}} = await this.$axios.get('/geo/hotCity') 
     if(status === 200){
         seft.hotCity = hots
     }  
   }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/hot.scss";
  .hot-city{
     overflow: hidden; 
     span{
        float: left; 
        font-size: 16px; 
     } 
     li{
        list-style: none;
        float: left;
        font-size: 16px;
        margin: 0 10px; 
        cursor: pointer;
     } 
     li:hover{
         text-decoration: underline;
     }
  }
</style>