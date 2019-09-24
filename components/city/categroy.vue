<template>
    <div>
       <dl class="m-categroy">
          <dt>按拼音首字母选择：</dt>
          <dd v-for="item in list" :key="item">
            <a :href="'#city-' + item">{{item}}</a>   
          </dd> 
       </dl>
       <!-- 按拼音分类城市 -->
       <dl class="m-categroy-section"
         v-for="item in block"
         :key = "item.title"
       >
         <dt :id="'city-'+item.title">{{ item.title }}</dt>
          <dd><span v-for="c in item.city" :key="c">{{ c }}</span></dd> 
       </dl>
    </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
   data(){
     return {
         list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        //  block:[
        //     {
        //       title:'A',
        //       city:['鞍山','安庆']
        //     },
        //     {
        //       title:'B',
        //       city:['北京','包头']
        //     },
        //     {
        //       title:'C',
        //       city:['重庆','成都']
        //     }
        //  ]
        block:[]
     }
   },
 async mounted(){
     let self = this;
     let blocks=[]
     let {status,data:{city}} = await this.$axios.get('/geo/city')
     if(status === 200){
        let p
        let c
        let d={}
        city.forEach(item=>{
           //提取城市名称转化为拼音并提前首字母大写
           p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1);
           c = p.charCodeAt(0)
           if(c>93&&c<123){
              if(!d[p]){
                d[p] = []
              }
              d[p].push(item.name)
           }
        })
        for(let [k,v] of Object.entries(d)){
           blocks.push({
            title:k.toUpperCase(),
            city:v
          })
        }
        blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
        self.block=blocks
     }

     
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss";
</style>
