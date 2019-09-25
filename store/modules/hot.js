//热门推荐搜索
// const state = {
//     hotPlace:[]
// }

const state = () => ({
    hotPlace: []
})

const mutations = {
    setHot(state,val){
        state.hotPlace = val
    }
}
const actions={
    setHot:({commit}, hotPlace)=>{
       commit("setHot", hotPlace) 
    }
}

export default {namespaced: true, state, mutations, actions }