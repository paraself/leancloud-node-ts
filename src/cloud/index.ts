import AV from 'leanengine'

AV.Cloud.define('TestCloudFunc', async request => {
  return '这是一个示例云函数'
})