import express from 'express'
import timeout from 'connect-timeout'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import xss from 'xss-clean'
import AV from 'leanengine'
import helmet from 'helmet'
import requestIp from 'request-ip'
import cors from 'cors'
import errorRouter from './error'
// 加载云函数
import './cloud'
const app = express()

// 在这里开启cors跨域设置，设置自己的域名白名单，和需要跨域的方法
app.use(cors({
  // origin: [
  //   'http://localhost:52153'
  // ],
  // methods: ['POST', 'OPTIONS', 'GET']
}))

// use helmet early in the stack
// https://www.npmjs.com/package/helmet
app.use(helmet())
Error.stackTraceLimit = 100

app.use(xss())
app.use(express.static('public')) // 静态资源请放到public文件夹下，首页为public/index.html
app.use(requestIp.mw()) // 获取客户端的ip
app.use(timeout('60s'))
app.use(AV.express())

// 云引擎因为用到了反向代理，所以要开启这个
app.enable('trust proxy')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

// 用于用户网络诊断
app.get('/ping', (req, res) => {
  res.send('pong')
})

// 默认的首页
app.get('/', AV.Cloud.HttpsRedirect(), (req, res) => {
  res.send('这是首页')
})

// error 404 and error handler
app.use(errorRouter)

export default app
