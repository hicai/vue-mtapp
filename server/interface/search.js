import Router from 'koa-router';
import axios from './utils/axios';
// import { posix } from 'upath';
let router =  new Router({prefix:'/search'})

//搜索框列表
router.get('/top',async (ctx)=>{
   let {status, data:{top}} = await axios.get('http://cp-tools.cn/search/top',{
      params:{
        input: ctx.query.input,  //query：返回的是格式化好的参数对象。
         city: ctx.query.city
      } 
    }) 
    if(status===200){
        ctx.body = {
            top
        }
        
    }else{
        ctx.body = {
            top:[]
        }
    }
})

//热门搜索xx
router.get('/hotPlace',async (ctx)=>{
    let city = ctx.store
    ? ctx.store.geo.position.city
    : ctx.query.city
    let {status, data:{result}} = await axios.get('http://cp-tools.cn/search/hotPlace',{
       params:{
           city
       } 
    })
   ctx.body={
     result: status === 200?result:[]
   }  
})


//推荐列表
router.get('/artistic',async(ctx)=>{
    let {status,data:{
        count,
        pois
    }} = await axios.get('http://cp-tools.cn/search/resultsByKeywords',{
        params:{
            keyword:ctx.query.keyword,
            city: ctx.query.city
        }
    })
    if(status===200){
      ctx.body={
        count,
        pois
      }
    }else{
        ctx.body={
            count:[],
            pois:[]
          } 
    }
}) 

export default router