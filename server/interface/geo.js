import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})

//根据ip获取当前省份定位
router.get('/getPosition', async(ctx)=>{
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

//获取省份 
router.get('/province', async(ctx)=>{
  //本地数据库方法
  // let province = await Province.find()
  // ctx.body = {
  //   province:province.map(item => {
  //      return {
  //        id : item.id,
  //        name: item.value[0]
  //      }
  //   }) 
  // }

  //线上数据
  let {status, data: {
    province
  }} = await axios.get(`http://cp-tools.cn/geo/province`)
  ctx.body = {
    province: status === 200
      ? province
      : []
  }
})

//每个省份对应的城市
router.get('/province/:id', async (ctx) => {
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

//获取所有城市
router.get('/city', async (ctx) => {
let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/city`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

//热门城市
router.get('/hotCity',async(ctx)=>{
  let {status,data:{hots}} = await axios.get('http://cp-tools.cn/geo/hotCity')
  if(status===200){
    ctx.body = {
      hots
    }
  }else{
    ctx.body = {
      hots:[]
    }
  }
})

//获取对应菜单
router.get('/menu', async(ctx)=>{
  let {status,data:{menu}} = await axios.get(`http://cp-tools.cn/geo/menu`);
    if(status === 200){
      ctx.body = {
        menu
      }
    }else{
      ctx.body = {
        menu:[]
      } 
    }
})


export default router;