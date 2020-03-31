const state=()=>({
  earlyProduct:[]
 
})
const mutations = {
  getProduct(state, value) {
    state.earlyProduct.push(value)
    console.info("数据储存",state.earlyProduct)
  }
}
const actions =  {
}
export default {
  namespaced: true, 
  state,
  mutations,
  actions
}