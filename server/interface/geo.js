import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})

//根据ip获取当前城市定位
router.get('/getPosition',async(ctx)=>{ 
  let {
    status,
    data: {
      province,
      city
    }
  }= await axios.get(`http://cp-tools.cn/geo/getPosition`)
   
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

export default router;