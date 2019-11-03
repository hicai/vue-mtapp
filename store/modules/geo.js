// const state = {
//   position: {},
//   // newCity:''
// }
const state = () => ({position:{}})

const mutations = {
    setPosition(state,val){
    state.position = val
    console.log(state.position)
    }
}

const actions = {
    setPosition: ({commit}, position) => {
      commit('setPosition', position)
    }
  }
export default {namespaced: true, state, mutations, actions}