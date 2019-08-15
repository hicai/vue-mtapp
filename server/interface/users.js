import Router from 'koa-router';
//多个用户独立发送验证码
import Rides from 'koa-redis'; 
//邮箱发送验证
import nodeMailer from 'nodemailer';
//导入模型
import User from '../dbs/models/users' 
//导入接口
import Passport from './utils/passport'
import Email from '../dbs/config'
import Axios from './utils/axios'

let router =  new Router({ prefix: '/users' });
let Store = new Redis().client;

//注册接口
router.post('/signup', async (ctx) => {
	const { username, password, email, code } = ctx.request.body;

	if (code) {
		const saveCode = await Store.hget(`nodemail:${username}`, 'code')
		const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
		if (code === saveCode) {
			if (new Date().getTime() - saveExpire > 0) {
				ctx.body = {
					code: -1,
					msg: '验证码已过期，请重新尝试'
				}
				return false
			}
		} else {
			ctx.body = {
				code: -1,
				msg: '请填写正确的验证码'
			}
		}
	} else {
		ctx.body = {
			code: -1,
			msg: '请填写验证码'
		}
	}
	let user = await User.find({ username })
	if (user.length) {
		ctx.body = {
			code: -1,
			msg: '已被注册'
		}
		return
	}
	let nuser = await User.create({ username, password, email })
	if (nuser) {
		let res = await axios.post('/users/signin', { username, password })
		if (res.data && res.data.code === 0) {
			ctx.body = {
				code: 0,
				msg: '注册成功',
				user: res.data.user
			}
		} else {
			ctx.body = {
				code: -1,
				msg: 'error'
			}
		}
	} else {
		ctx.body = {
			code: -1,
			msg: '注册失败'
		}
	}
})

//登录接口
router.post('/signin',async(ctx,next) => {
	 return Passport.authenticate('local',function(err,user,info,status){
		 if(err){
			  ctx.body = {
					code: -1,
					msg = err
				}
		 }else{
			 if(user){
				 ctx.body = {
					 code:0,
					 msg:'注册成功',
					 user
				 }
				 return ctx.login(user)
			 }else{
				 ctx.body = {
					 code:1,
					 msg:info
				 }
			 }
		 }
	 })(ctx, next)
})

//验证接口
router.post('/verify',async(ctx,next)=>{
	let username = ctx.request.body.username
	const saveExpire = await Store.hegt(`nodemail:${username}`,'expire')
	if (saveExpire && new Date().getTime() - saveExpire < 0){
		ctx.body = {
			code:-1,
			msg:'验证请求过于频繁，1分钟内1次'
		}
		return false
	}
	let transporter = nodeMailer.createTransport({
		host:Email.smtp.host,
		post:587,
		secure:false,
		auth:{
			user:Email.smtp.user,
			pass:Email.smtp.pass
		}
	})
	
	let ko = {
		code: Email.smtp.code(),
		expire: Email.smtp.expire(),
		email: ctx.request.body.email,
		user: ctx.request.body.username
	}

	let mailOptions = {
		from: `"认证邮件" <${Email.smtp.user}>`,
		to: ko.email,
		subject: '《慕课网高仿美团网全栈实战》注册码',
		html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
	}

})