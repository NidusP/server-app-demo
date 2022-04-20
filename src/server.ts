import { Application } from './Application'
import { router } from './router'
import { HelloController } from './controllers/HelloController'

Application.getApplication().listen()
// router(app)
new HelloController()


// 创建Controllers实例, 注册路由
// app.listen(4000, () => {

// })

// 路由层 分发流量, 对接http等协议
// 服务层 对服务进行抽象 例如抽象成class+method   将服务与协议分离开
// 服务层 领域层 整体业务在计算机中的具体描述
// 数据访问层  封装对数据的持久化行为  隔离底层具体的数据库实现
// 持久化层  数据存储 连接操作数据库

// finduser -> dao -> mysql/mongdb/sqllites