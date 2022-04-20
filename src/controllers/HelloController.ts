import { Request, Response } from 'express'
import { Application } from '../Application'

enum HTTPMethod {
    POST,
    GET,
    PUT,
    DELETE
}

export class HelloController {

    // "experimentalDecorators": true,
    // "emitDecoratorMetadata": true

    // 执行较早, 构造函数执行前就开始执行注入, 需要注入app实例
    @restful(HTTPMethod.GET, '/')
    index(req: Request, res: Response){
        res.send('ok !')
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