import Router from 'koa-router';
import axios from './utils/axios'
// import Province from '../dbs/models/province'

let router = new Router({prefix: '/categroy'})

//详情页 分类导航
router.get('/crumbs', async(ctx)=>{
    let {status,data:{
        areas,
        types
    }} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
        params:{
            city:ctx.query.city.replace('市','')||"广州"
        }
    });
    if(status === 200){
        ctx.body = {
            areas,
            types
        }
      }else{
        ctx.body = {
            areas:[],
            types:[]
        } 
      }
  })
  
  
  export default router;