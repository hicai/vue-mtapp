const state = () => ({position: {}})
const mutations = {
    setPosition(state,val){
    state.position = val
    console.log("store"+state.position)
    }
}

const actions = {
    setPosition: ({commit}, position) => {
      commit('setPosition', position)
    }
  }
export default {namespaced: true, state, mutations, actions}