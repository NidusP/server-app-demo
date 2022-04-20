import { Application } from './Application'
import { router } from './router'
import { HelloController } from './controllers/HelloController'

Application.getApplication().listen()
// router(app)
new HelloController()


// 创建Controllers实例, 注册路由
// app.listen(4000, () => {

// })