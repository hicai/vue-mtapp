//入口文件
import Vue from 'vue'
import Vuex from 'vuex'

//引入模块
import geo from './modules/geo'
import menu from './modules/menu'
Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules:{
        geo,
        menu
    },
    actions:{
      async nuxtServerInit({
          commit
        },{req,app}){
         const { status, data:{ province,city }} = await app.$axios.get('/geo/getPosition')   
         commit('geo/setPosition',status===200?{ province,city }:{ province:'',city:'' })
         const {status:status2, data:{menu}} = await app.$axios.get('/geo/menu')
         commit('menu/setMenu',status2===200?menu:[])
         const {status:status3,data:{result}} = await app.$axios.get('/search/hotPlace',{
           params:{
             city:app.store.state.geo.position.city
           }
         })
         commit('hot/setHot',status3===200?result:[]) 
      }
    }
  })

  export default store