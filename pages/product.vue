<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="230"
        :point="point"
        :BarFixed="BarFixed"
        />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/product/crumb.vue'
import Categroy from '@/components/product/categroy.vue'
import List from '@/components/product/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data(){
    return {
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[],
      BarFixed:false,
      sunHight:0
    }
  },
  async asyncData(ctx){
    let keyword = ctx.query.keyword
    let city = ctx.store.state.geo.position.city
    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword,
        city
      }
    })
    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
      params:{
        city
      }
    })
    if(status===200&&count>0&&status2===200){
      return {
        list: pois.filter(item=>item.photos.length).map(item=>{
          return {
            type: item.type.split(';')[0],
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random()*10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0],
            address:item.address
          }
        }),
        keyword,
        areas: areas.filter(item=>item.type!=='').slice(0,5),
        types: types.filter(item=>item.type!=='').slice(0,5),
        point: (pois.find(item=>item.location).location||'').split(',')
      }  
    }
  },
  mounted(){
      // this.$store.commit('product/getProduct',this.list)
     
     //列表高度
     this.$nextTick(()=>{
       let itemCollection = document.querySelectorAll(".s-item");
       for(let i = 0; i<itemCollection.length; i++){
          this.sunHight += itemCollection[i].offsetHeight;
       }
     })

      //监听页面滚动事件
      window.addEventListener('scroll', this.handleScroll, true); 
  },
  destroyed(){
     // 页面摧毁的时候要关闭监听
     window.removeEventListener('scroll', this.handleScroll)
  },
  methods:{
    handleScroll(){
      let self = this;
      //页面滚动的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //地图到顶部的距离
      let mapTop = document.querySelector('.m-map').offsetTop
      //列表高度
     
      //默认dl元素到顶部的距离
      let offsetTop = 0;
      this.list.forEach((item,index)=>{
        //获取每个dl的位置
        offsetTop = document.querySelectorAll(".s-item")[index].offsetTop;
        //滚动当前位置时，
        if(scrollTop > offsetTop && scrollTop < (offsetTop+172*item.location.length)){
            self.point = item.location.split(',')
           // console.log("坐标",self.point)
         }
      })
      
      //滚动时地图吸顶固定位置显示
      if(scrollTop > mapTop+197 && scrollTop < self.sunHight){
        self.BarFixed = true
      }else{
        self.BarFixed = false
      }
      
    }  
  }
}
</script>

<style lang="scss">
   @import "@/assets/css/products/index.scss";

</style>
