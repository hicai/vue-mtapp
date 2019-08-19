import Koa from 'Koa'
// const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

// import mongoose from 'mongoose'
// import bodyParser from 'koa-bodyparser'

// //处理登录状态
// import session from 'koa-generic-session'
// import Redis from 'koa-redis'
// //处理json格式 美观效果
// import Json from 'koa-json'
// //导入数据库配置
// import dbConfig from './dbs/config'
// import passport from './interface/utils/passport'
// import users from './interface/users'

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server



  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
