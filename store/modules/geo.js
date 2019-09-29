const state = {
  position: {},
  newCity:''
}
const mutations = {
    setPosition(state,val){
    state.position = val
    console.log("store"+state.position)
    }
    // ,
    // setnewCity(state,val){
    //   state.newCity = val
    //   localStorage.setItem('newCity', JSON.stringify(val));
    //   console.log("nndd"+val)
    // }
}

const actions = {
    setPosition: ({commit}, position) => {
      commit('setPosition', position)
    }
  }
export default {namespaced: true, state, mutations, actions}