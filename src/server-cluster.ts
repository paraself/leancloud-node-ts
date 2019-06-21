// 如果需要开启Node的多进程，则需要修改package.json文件里的
// "main": "dist/server.js", 为：
// "main": "dist/server-cluster.js",
// 但是对于LC来说，不建议开启cluster，LC的云引擎实例内存最大只有2g，
// 不足以支持cluster
import cluster from 'cluster'

// 进程数量建议设置为可用的 CPU 数量
let workers = parseInt(process.env.LEANCLOUD_AVAILABLE_CPUS || '1')
if (workers > 2) {
  workers = 2
}

if (cluster.isMaster) {
  for (var i = 0; i < workers; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker %s died, restarting...', worker.process.pid)
    cluster.fork()
  })
} else {
  require('./server.js')
}
