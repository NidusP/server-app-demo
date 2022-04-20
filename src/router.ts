import type {Express} from 'express'
import path from 'path'
import fs from 'fs'
// moduleResolution: "node"
import { createClient } from 'redis';


// 高速缓存
// (缓存大小)lru缓存 根据使用时间决定失效时间, 从而控制缓存体量
interface ICache {
    set(key: string, value: string): void,
    get(key: string): any|Promise<any>,
    has(key: string): boolean|Promise<boolean>
}
class CacheRedis implements ICache {
    static inst: CacheRedis = new CacheRedis()
    private client = createClient({ })

    constructor(){
        this.client.on('error', (error) => {
            console.log(error)
            throw error
        })
        this.connect()
        return CacheRedis.inst
    }

    async connect(){
        await this.client.connect()
    }
    public set(key: string, val: any){
        this.client.set(key, val)
    }
    public async get(key: string):Promise<any>{
        return await this.client.get(key)
    }
    public async has(key: string){
        return !!(await this.client.get(key))
    }

}
class Cache implements ICache{
    private items = new Map
    static inst: Cache = new Cache()
    constructor(){
        return Cache.inst
    }
    public get(key: string){
        return this.items.get(key)
    }
    public set(key: string, val: any){
        return this.items.set(key, val)
    }
    public has(key: string){
        return this.items.has(key)
    }
}

const cache = new Cache()
const cacheRedis = new CacheRedis()

// 无状态服务 内部没有数据, 只是提供数据读取工具

// 路由层  
// 1.分发流量
// 2.负责对接http协议(以及相关规范) ftp tcp 等其他传输协议
export function router(app: Express){
    app.get('/', (req, res) => {
        if(!cache.has('index.html')) {
            cache.set('index.html', fs.readFileSync(path.resolve(__dirname, '../index.html')))
        }
        res.send(cache.get('index.html'))
        return;
        // 从磁盘读取文件返回
        res.sendFile(path.resolve(__dirname, '../index.html'))
    })
    app.get('/redis', async (req, res) => {
        let html = await cacheRedis.get('index.html')
        console.log('get redis', html)
        if(!html) {
            html = fs.readFileSync(path.resolve(__dirname, '../index.html'))
            cacheRedis.set('index.html', html)
            console.log('set redis', html)
        }
        res.send(html)
    })

    app.get('/test', (req, res) => {
        res.send('test')
    })
}