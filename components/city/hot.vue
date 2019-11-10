<template>
    <div class="hot-city">
       <span>热门城市:</span> 
       <ul>
          <li 
          v-for="item in hotCity"
          :key="item.id"> 
            <a @click="changcity(item)">
              {{item.name==="市辖区"?item.province:item.name}} 
            </a>   
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
   //   
   },
   methods: {
      changcity:async function(item){
        let seft = this;
       //搜索框热门城市切换显示
        const {status,data:{result}} = await this.$axios.get('search/hotPlace',{
           params:{
              city:item.name==="市辖区"?item.province.replace('市',''):item.name.replace('市','')
           }
        }) 
        this.$store.commit('hot/setHot',status===200?result:[])
        this.$store.commit('geo/setPosition',{
           city:item.name==="市辖区"?item.province.replace('市',''):item.name.replace('市','')
        })
   
        this.$router.push({path:'/'})
      }
   }
}
</script>

<style lang="scss">
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