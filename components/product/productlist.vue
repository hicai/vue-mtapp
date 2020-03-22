<template>
  <dl class="s-item">
   <dt>
     <img :src="meta.img" alt="商品图片">
   </dt>
   <dd>
     <h3>{{meta.name}}</h3>
     <el-rate
      v-model="meta.rate"
      :colors="['#FF9900', '#FF9900', '#FF9900']"
     ></el-rate>
     <span v-if="meta.rate>4" class="s-item-comment">很好</span>
     <span v-if="meta.rate>3" class="s-item-comment">一般</span>
     <span v-else class="s-item-comment">很差</span>
     <span class="s-item-value">{{meta.rate}}分</span>
     <span class="s-item-comment-total">{{meta.comment}}人评论</span>
     <p>
       <span class="s-item-type">{{meta.type}}</span>
       <span class="s-item-addr">{{meta.address}}</span>
     </p>
     <p>
       <em>人均￥{{meta.price}}起</em>
       <b>{{meta.status}}</b>
     </p>
   </dd>
  </dl>
</template>
<script>
export default {
  props:{
    meta:{
      type:Object,
      default(){
        return {}
      }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>