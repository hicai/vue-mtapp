<template>
   <div></div>
</template>

<script>
import { async } from 'q';
export default {
  layout:'bank',
  middleware:async (ctx) =>{
    let {status,data}=await ctx.$axios.get('/users/exit')
    if(status===200&&data&&data.code===0){
      //  window.location.href='/'
    }
  },
  mounted(){
     this.$router.push({path: '/'});
  }
}
</script>

<style>

</style>