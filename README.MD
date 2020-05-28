# LeanCloud Node TypeScript 示例项目

帮助大家快速在LeanCloud的云引擎上构建起TypeScript的开发环境



### 已经支持的特性 ###

**1. 默认express框架**

**2. cors跨域请求配置**

通过`cors`模块实现，在`app.ts`文件中配置跨域。

``` ts
// 在这里开启cors跨域设置，设置自己的域名白名单，和需要跨域的方法
app.use(cors({
  // origin: [
  //   'http://localhost:52153'
  // ],
  // methods: ['POST', 'OPTIONS', 'GET']
}))
```

**3. helmet安全防护**

通过`helmet`模块实现

**4. 客户端ip获取**

通过`request-ip`实现，具体用法：
``` ts
app.use(function(req, res) {
  const ip = req.clientIp;
  res.end(ip);
});
```
**5. sourcemap支持**

通过`source-map-support`模块实现

**6. xss攻击防范**

通过`xss-clean`实现



### 增强特性 ###

本仓库只提供基本的云引擎TS环境的搭建。相对于[官方提供的云引擎开发方式](https://leancloud.cn/docs/leanengine_cloudfunction_guide-node.html), 我们通过另外一个仓库[leancloud-cloud-decorator](https://github.com/paraself/leancloud-cloud-decorator)提供了更丰富的增强特性：

- [x] 云函数集成redis缓存

  可以将一些对数据实时性不敏感的接口内容，缓存在redis中，当前端访问云函数的时候，直接读取redis里的内容，加快访问速度。例如，1小时更新一次的排行榜。通过安装[leancloud-cloud-decorator](https://github.com/paraself/leancloud-cloud-decorator)来实现。

- [x] 云函数参数校验

  接口参数校验，或者云函数参数校验，是业务中很重要的一块，可以有效杜绝前端传入的数据不规范，恶意的接口参数碰撞等行为。通过将`joi`集成到云函数装饰器中，实现该特性。

- [x] 云函数发布前端SDK

  后端在云函数创建的时候定义好参数以及返回值类型之后，可以一键将类型以及API wrapper代码，发布成前端环境可用的SDK。这样前端就可以在使用云函数API SDK的时候，通过VSCode的代码提示，清楚的知道接口的参数含义，以及接口返回值的schema。目前支持web/小程序/dart。

- [x] 云函数限流、防抖

  对于一些Post类的云函数，可以设定在Post没有结束的时候进行防抖。同时针对一些敏感云函数，可以设置限流。



### 其他计划中的特性 ###

现有的工作流程其实有很多还可以改进的地方，我们会在实践中持续提出新的想法：

- [ ] 数据库ORM

  LC在利用SDK操作数据库的时候，失去了数据库的字段类型。我们通过ORM组件，利用[数据schema的接口](https://tab.leancloud.cn/docs/rest_api.html#hash-1422845360)，可以预先生成全部数据库字段的TS interfaces，并创建出对应的Class。并在其中加入一层redis缓存。这样可以将对一致性要求比较低的数据，先操作缓存层，然后再以特定的周期，或者特定的事件，比如redis key过期，再写入脏数据到数据库，能够有效降低数据库的API访问次数。（目前已经写完，已在内部使用，还需要持续优化才能开箱即用）

- [ ] 可视化编程

  可以将路由以组件的形式进行可视化拼装，以实现用户常见的微信支付，支付宝支付，海报生成，小程序客户接口，带参转发，语音识别等功能

- [ ] 云引擎风控系统

  一个轻量化的云引擎风险识别+风险解决框架。已在内部使用。

- [ ] 云引擎监控系统

  已在内部使用



### 使用步骤 ###

1. 确保已经安装了[Lean Cli命令行工具](https://leancloud.cn/docs/leanengine_cli.html)
2. 先下载本仓库，或者fork到本地
3. 在命令行终端里，进入本项目的文件夹，执行```lean switch```命令，切换到自己的云引擎实例
4. 执行```npm i```安装项目依赖，项目已经配置了cnpm作为安装源，因此无需使用cnpm命令
5. 运行```lean up```即可打开本地服务器进行调试
6. 调试方法和一般的LC的云引擎NodeJS应用是一样的。访问```localhost:3001```进行云函数调试；访问```localhost:3000```路由到云引擎根路由上
7. 可以使用`lean deploy`进行部署，也可以使用源码部署

其他使用方法请参考[LeanCloud的云引擎开发指南](https://leancloud.cn/docs/leanengine_quickstart.html)



### Node版本 ###

目前使用的是[NodeJS 12.17.x LTS版](https://nodejs.org/en/)。如需使用其他版本的NodeJS，请修改`package.json`里的`engine`键。
``` json
"engines": {
  "node": "12.17.x",
  "npm": "6.x"
}
```
以及安装对应版本的`@types/node`模块。

### FAQ ###
1. 为什么把`@types/xxxx`安装到了生产依赖？
因为LeanCloud在构建的时候，只安装生产依赖，不安装开发依赖。而构建的时候，需要使用一些来自`@types/xxx`里的类型。

2. 如何安装私有模块
私有模块一般需要设置项目根目录下的`.npmrc`文件，在里面配置私有registry，形式如下。
``` yml
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```
其中`NPM_TOKEN`是一个环境变量，如果用的是官方NPM私有模块的话，可以在NPM官网里的tokens设置，生成一个专用的云引擎构建用的token。如果是其他的私有源，生成TOKEN这里的原理类似。把这个token设置到云引擎的控制台里的环境变量设置中。然后关键的一步是，需要在项目的根目录下，放一个`leanengine.yaml`，里面加上:
``` yml
exposeEnvironmentsOnBuild: true
```
这样，云引擎在构建的时候，就可以拿到环境变量了。私有依赖就都可以装上了。