const state = () => ({position:{}})

const mutations = {
    setPosition(state,val){
    state.position = val
    // console.log("切换城市"+state.position.city) 
    }
}

const actions = {
    setPosition: ({commit}, position) => {
      commit('setPosition', position)
    }
  }
export default {namespaced: true, state, mutations, actions}