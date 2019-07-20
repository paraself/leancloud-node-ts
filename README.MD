# LeanCloud Node TypeScript 示例项目

帮助大家快速在LeanCloud的云引擎上构建起TypeScript的开发环境

**已经支持的特性：**

- 默认express框架
- cors跨域请求配置
- helmet安全防护
- 客户端ip获取
- sourcemap支持
- xss攻击防范

**计划的特性：**

- [X] 云函数集成redis缓存,通过安装[leancloud-cloud-decorator](https://github.com/paraself/leancloud-cloud-decorator)来实现
- [ ] 数据库ORM(功能已写完，已在内部使用，但是易用性需要调整以便能做到开箱即用)
- [ ] 数据库ORM集成redis缓存(功能已写完，已在内部使用，但是易用性需要调整以便能做到开箱即用)

**使用步骤:**

1. 确保已经安装了[Lean Cli命令行工具](https://leancloud.cn/docs/leanengine_cli.html)
2. 先下载本仓库，或者fork到本地
3. 在命令行终端里，进入本项目的文件夹，执行```lean switch```命令，切换到自己的云引擎实例
4. 执行```npm i```安装项目依赖，项目已经配置了cnpm作为安装源，因此无需使用cnpm命令
5. 运行```lean up```即可
6. 调试方法和一般的LC的云引擎NodeJS应用是一样的。访问```localhost:3001```进行云函数调试；访问```localhost:3000```路由到云引擎根路由上

其他使用方法请参考[LeanCloud的云引擎开发指南](https://leancloud.cn/docs/leanengine_quickstart.html)

