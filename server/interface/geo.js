import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})

//根据ip获取当前城市定位
<<<<<<< HEAD
router.get('/getPosition',async(ctx)=>{
=======
router.get('/getPosition',async(ctx)=>{ 
>>>>>>> 83ad42ad539a7f3216df06232fa9954bbdf28d06
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