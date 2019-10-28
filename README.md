## element ui + nuxt + koa 项目


命令

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## 功能
 - 用户登录注册退出
 - 验证码接收验证
 - 登录后返回当前城市定位 
 - 全国城市根据拼音首字母分类
 - 切换城市
 - 城市搜索（服务端）
 - 根据城市定位推荐列表
 
 待做
 - 城市搜索（新增拼音搜索）
 - 地图组件
 - 列表详情
 - 订单
 - 购物车

编码问题
encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。

产品列表获取数据
(asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象)

 
