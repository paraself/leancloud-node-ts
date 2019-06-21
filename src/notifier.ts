import notifier from 'node-notifier'
import path from 'path'
if (!process.env.NODE_ENV) {
  notifier.notify({
    icon: path.join(__dirname, '../public/logo.png'),
    title: process.env.LEANCLOUD_APP_DOMAIN || '云引擎应用',
    message: '启动成功 - 点击开启云函数调试界面',
    sound: 'Pop',
    timeout: 4,
    open: 'http://localhost:3001'
  })
}