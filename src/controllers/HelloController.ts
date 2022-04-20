import { Request, Response } from 'express'
import { Application } from '../Application'

enum HTTPMethod {
    POST,
    GET,
    PUT,
    DELETE
}

export class HelloController {

    // "experimentalDecorators": true, "emitDecoratorMetadata": true
    // 执行较早, 构造函数执行前就开始执行注入, 需要注入app实例
    @restful(HTTPMethod.GET, '/')
    index(req: Request, res: Response){
        res.send('ok !')
    }
}

// 数据访问层 data access layer
// 1.封装对数据的持久化行为  隔离底层具体的数据库实现(如 sequelize)
// sequelize orm 对象关系映射

// finduser -> dao -> mysql/mongdb/sqllites

// 持久化层 1.数据存储


// 服务层
// 1.对服务进行抽象 例如抽象成class+method   将服务与协议分离开
class UserServer {
    async updateName(userid: number, name: string){
        // ...
    }
}
export class UserController {
    @restful(HTTPMethod.PUT, '/user/:id')
    index(req: Request, res: Response){
        // Route extends `${string}:${infer Rest}`  计算出 id 为string
        const id = req.params.id
        const json = req.body

        const us = new UserServer()
        us.updateName(parseInt(id), json.name)
        res.send('ok !' + id)
    }
}

// type HTTPMethod = 'POST'|'GET'|'PUT'|'DELETE'|'OPTIONS'|'PATCH'
function restful(method: HTTPMethod, path: string){
    return (target: any, propeetyKey: any, descriptor: PropertyDescriptor) => {
        // descriptor 修改装饰器的值
        // descriptor.value = 1
        const app = Application.getApplication()
        switch(method){
            case HTTPMethod.GET: 
                app.getExpress().get(path, descriptor.value.bind(target))
                break
        }
    }
}