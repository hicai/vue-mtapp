<<<<<<< HEAD
const state = () => ({position: {}})
=======
// const state = {
//   position: {},
//   // newCity:''
// }
const state = () => ({position:{}})

>>>>>>> ebca570148af34b4fb30d79105df59526261ed13
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