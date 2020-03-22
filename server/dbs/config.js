export default{
    dbs:'mongodb://127.0.0.1:27017/student', //端口+指定数据库名称
    redis:{
       get host(){
           return '127.0.0.1'  //redis主机端口
       },
       get port(){
           return 6379   //端口号
       }
    },
    smtp:{
        get host(){
            return 'smtp.qq.com'  //smtp服务（qq邮箱验证）
        },
        get user(){
            return '1021794763@qq.com'
        },
        get pass(){
            return 'qgbxzjuykvspbdaa'  //qq邮箱授权码
        },
        get code(){ //随机生成邮箱验证码
            return () => {
               return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        get expire(){  //验证码过期时间
            return () => {
              return new Date().getTime() + 60*1000
            }
        }
    }
}