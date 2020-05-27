require('source-map-support').install()

// 开启最大线程池
// https://stackoverflow.com/questions/24320578/node-js-get-request-etimedout-esockettimedout/37946324#37946324
// @ts-ignore
process.env.UV_THREADPOOL_SIZE = 128
import AV from 'leanengine'

AV.init({
  appId: process.env.LEANCLOUD_APP_ID!,
  appKey: process.env.LEANCLOUD_APP_KEY!,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY!
})

// 如果不希望使用 masterKey 权限，可以将下面一行删除
// @ts-ignore
AV.Cloud.useMasterKey()

let app
try {
  console.time('app')
  app = require('./app').default
  console.timeEnd('app')
} catch (error) {
  console.error(error)
}

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT! || process.env.PORT! || '3000')
console.log('================================')
app && app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT)
  require('./notifier')
  if (err) {
    console.error(err)
    // 这里可以把错误发给自己的监控渠道
  }
  // 注册全局未捕获异常处理器
  process.on('uncaughtException', async function (err) {
    console.error('Caught exception:', err.stack)
  })
  process.on('unhandledRejection', async function (reason, p) {
    // @ts-ignore
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason && reason.stack || 'unknown')
  })
})
