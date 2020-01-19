<template>
  <div class="m-product-select">
    <dl class="tab">
       <dt>
         {{title}}<i class="el-icon-arrow-down el-icon--right"></i>
       </dt>
       <dd>
         <span v-for="(item,index) in list" :key="index">
            {{item}}
         </span>
        </dd> 
    </dl>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title:{
       type:String,
       default:''
    },
    list:{
      type:Array,
      default:[]
    }
  },
};
</script>
<style lang="scss" scoped>
</style>