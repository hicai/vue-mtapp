<template>
  <div class="page-product">
    <!-- <el-row>
      <el-col :span="19">
         <crumb :keyword="keyword"></crumb>
         <categroy :types="types" :areas="areas"></categroy>
         <list></list>
      </el-col>
      <el-col :span="5">
         <amap></amap>
      </el-col>
    </el-row>  -->
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
  props: {
    
  },
  data() {
    return {
       types:[
         {
           name:'主题',
           module:'选项'
         }, {
           name:'主题',
           module:'选项'
         }, {
           name:'主题',
           module:'选项'
         }
       ],
       areas:[
         {
           name:'主题',
           module:'选项'
         }, {
           name:'主题',
           module:'选项'
         }, {
           name:'主题',
           module:'选项'
         }
       ],
       keyword:''
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/products/index.scss";
</style>