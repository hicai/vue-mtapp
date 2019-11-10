

<template>
  <div class="page-product">
    <el-row>
      <el-col :span="19">
         <crumb :keyword="keyword"></crumb>
         <categroy 
         :types="types" 
         :areas="areas"></categroy>
         <list :list="list"></list>
      </el-col>
      <el-col :span="5">
         <amap 
          v-if="point.length"
          :width="230" 
          :height="290" 
          :point="point"></amap>
      </el-col>
    </el-row> 
  </div>
</template>

<script>
import Crumb from '@/components/product/crumb'
import Categroy from '@/components/product/categroy'
import List from '@/components/product/sort'
import Amap from '@/components/public/map'
export default {
  components: {
    Crumb,
    Categroy,
    List,
    Amap,
  },

  data() {
    return {
       keyword:'',
       types:[],
       areas:[],
       list:[],
       point:[]
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/products/index.scss";
</style>





















