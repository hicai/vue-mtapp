<template>
    <div class="m-iselect"> 
       <span class="name">按省份选择:</span> 
       <el-select v-model="pValue" placeholder="省份">
           <el-option
              v-for="item in province"
              :key="item.value"
              :label="item.label"
              :value="item.value"
           >
           </el-option>
       </el-select> 
    </div>
</template>

<script>
export default {
  data(){
      return{
         pValue:'',
         province:[] 
      }
  },
  watch: {
      
  },
//  mounted:async function(){
//     let self=this;
//     let {status,data:{province}}=await self.$axios.get('/geo/province')
//     if(status===200){
//       self.province=province.map(item=>{
//         return {
//           value:item.id,
//           label:item.name
//         }
//       })
//     }
//   },
 mounted(){
    this.$axios.get("/geo/province").then(res=>{
        console.log(res.data)
        this.province = res.data
    })

  },
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>