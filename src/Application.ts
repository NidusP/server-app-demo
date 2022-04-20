import express, { Express } from 'express'

// app.listen(4000, () => {})
export class Application {
    static _inst: Application
    private _app: Express
    constructor(){
        this._app = express()
        // return Application.getApplication()
    }
    public listen(port?:number){
        this._app.listen(port|| 4002)
    }
    public getExpress(){
        return this._app
    }
    static getApplication(){
        if(!Application._inst){
            Application._inst = new Application()
        }
        return Application._inst
    }
}