import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})

router.get('/getPostiion',async(ctx)=>{
    let {
      status,
      data:{
        province,
        city   
      } = await axios.get(`http://cp-tools.cn/geo/getPosition`)
    }
    if(status === 2000){
        ctx.body = {
          province,
          city   
        }
    }else{
        ctx.body = {
            province: '',
            city: ''
          }  
    }
})
