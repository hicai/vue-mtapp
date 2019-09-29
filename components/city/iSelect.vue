<template>
    <div class="m-iselect"> 
       <span class="name">按省份选择:</span> 
       <el-select 
         v-model="pvalue" 
         placeholder="省份"
         @change="setProv"
         >
           <el-option
              v-for="item in province"
              :key="item.value"
              :label="item.label"
              :value="item.value"
           >
           </el-option>
       </el-select> 
       <el-select
         v-model="cvalue"  
         :disabled="!city.length" 
         placeholder="城市"
       
         >
           <el-option
              v-for="item in city"
              :key="item.value"
              :label="item.label"
              :value="item.value"    
           >
               <span @click="changeCity(item)">{{item.label}}</span>
           </el-option>
       </el-select>  

       <span class="search">直接搜索:</span> 
       <el-autocomplete
          v-model="input"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入搜索城市"
          @select="handleSelect"
          >
       </el-autocomplete>
    </div>
</template>

<script>
// import { mapMutations } from 'vuex'
import pyjs from 'js-pinyin'
import _ from 'lodash';
import { async } from 'q';
export default {
  data(){
      return{
         pvalue:'',
         province:[],
         cvalue:'',
         city:[],
         input:'',
         cities: [], 
         value8:'',
      
      }
  },
  watch: {
   pvalue: async function(newPvalue){
         let self = this;
         let {status,data:{city}} = await this.$axios.get(`/geo/province/${newPvalue}`)
         if(status===200){
           self.city = city.map(item=>{
             return {
                value:item.id,
                label:item.name
             }
             console.log(self.city)
           })
           self.cvalue = ''
        }
     }
  },
  async mounted(){
      let self = this
      let {status,data:{province}} = await this.$axios.get('/geo/province')
      if(status===200){
        self.province = province.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
      } 
    },
methods:{
   //query输入的内容，cb回调
  //采用节流防抖 
  querySearchAsync:_.debounce(async function(query,cb){
     let self = this;
     if(self.cities.length){
       cb(self.cities.filter(item=>pyjs.getFullChars(item.value).indexOf(query) > -1))
      //  cb(self.cities.filter(item=>item.value.indexOf(query) && pyjs.getFullChars(item.value).indexOf(query) > -1))
     }else{
       let {status,data:{city}} = await self.$axios.get('/geo/city')
       if(status===200){
         self.cities = city.map(item=>{
            return {
              value:item.name
            }
         })
        cb(self.cities.filter(item=>pyjs.getFullChars(item.value).indexOf(query) > -1))
        // cb(self.cities.filter(item=>item.value.indexOf(query) && pyjs.getFullChars(item.value).indexOf(query) > -1))
       }else{
          cb([])
       }
     }
  },200),
  handleSelect:function(item){
      console.log(item.value);
      // store.commit('geo/setPosition', item.value)
      // this.$router.push({path: '/'});
     
    },
   currentSel:function(selVal){
     this.name = selVal.label;
     console.log("选择的name为：" + this.name);  
    },
    setProv:async function(selVal){
      this.selVal = selVal.label;
      // console.log(this.selVal)
    },

    changeCity:function(item){
      console.log("值"+ item.label + item.value)
      this.$store.commit('geo/setPosition', 
        { province:item.value,
          city:item.label
         }
      )
      localStorage.setItem('newCity', JSON.stringify(item.label));
      // this.$store.commit('geo/setnewCity', item.label)
      this.$router.push('/')
      
    }
  }
} 
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
  .m-iselect{
    //  position: relative;
    span{
      font-size: 16px;
    }
    .el-select,
    .el-autocomplete{
    
      padding: 0 10px;
    }
    .search{
      padding-left: 20px;
    }
 
  }
</style>