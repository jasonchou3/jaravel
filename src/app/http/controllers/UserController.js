import Controller from '../../../../framework/src/controllers/Controller'
import EmailJob from '../../queue/jobs/EmailJob'
import inject from '../../../../framework/src/decorators/inject'

export default class UserController extends Controller {
    handle() {

    }

    @inject('redis')                                      //依赖注入
    async get([cache], ctx) {
        await ctx.getAuth().authenticate('zhou', 'asdfs');
        // throw new Error(14211)                         //错误收集
        await cache.getClient().setAsync('name', 'xxxxx');
        this.event_fire('order-success', {userId: 1111}); //消息机制解耦

        EmailJob.init('hello!', '购买成功！').dispatch();      //队列任务
        ctx.body = 'index'                                 //koa api
    }
}