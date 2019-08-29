import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = () => ({position: {}})

const mutations={
    setPosition(state,val){
    state.position = val
    }
}
const actions = {
    setPosition: ({
      commit
    }, position) => {
      commit('setPosition', position)
    }
  }
export default {namespaced: true, state, mutations, actions}