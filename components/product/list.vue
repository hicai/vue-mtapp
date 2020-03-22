<template>
  <div class="m-products-list">
    <dl>
     <dd 
       v-for="(item,index) in nav"
       :key="index"
       :class="[item.name,{changeStyle:changeSelectStyle == index}]"
       @click="navSelect(index)"
       >
         {{item.txt}}
       </dd>
    </dl>
    <ul>
      <Item 
      v-for="(item,idx) in list"
      :key="idx"
      :meta="item"
      ></Item>
    </ul> 
  </div>
</template>
<script>
import Vue from 'vue' 
import Item from './productlist'
export default {
  components: {
     Item
  },
  props: {
    list:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      changeSelectStyle:'',
      defaultList:[],
      nav:[
         {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    };
  },
  async asyncData({app}) {
    let { data } = await app.$axios.get('searchList')
    return { list: data.list }
  },
  watch:{

  },
  computed:{
    //  defaultPic(){
    //     let defaultList = this.$store.state.product.earlyProduct;
    //     defaultList.sort(function(a,b){
    //          return b.price - a.price
    //        })
    //        console.log("初始化")
    //  }
  },
  methods: {
    navSelect(index){
      let self = this;
      let flag = false;
      let flag2 = false;
      this.changeSelectStyle = index;
      if(index==0){ //智能排序
         let items = self.list; //产品列表
        // console.info(items)
         items.reverse()
      }
      if(index==1){ //价格高低排序
        let items = self.list; 
        if(self.nav[1].txt==="价格最高"){
          items.sort(function(a,b){
             return a.price - b.price
          })
           Vue.set(self.nav[1], "txt", "价格最低")
        }else{
             items.sort(function(a,b){
             return b.price - a.price
           })
             Vue.set(self.nav[1], "txt", "价格最高")
        }
       
      }
      if(index==2){ //人气排序
      //  if(flag = false){
        let items = self.list;
        items.sort(function(a,b){
           return b.rate - a.rate
        })
       // flag = true;
      //  }else{
      //     // this.$store.state.product.earlyProduct = self.list;
      //      self.list.reverse()
      //      flag = false;
      //  }
      }
      if(index==3){ //评价排序
       
        let items = self.list;
        items.sort(function(a,b){
           return b.comment - a.comment
        })
      //   flag2 = true;
      //  }else{
      //      self.list.reverse()
      //      flag2 = false;
      //  }

        
      }
     
    }
  }
};
</script>
<style lang="scss" scoped>
.changeStyle{
  color: #13D1BE;
}
</style>