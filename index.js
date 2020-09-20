const Koa = require('koa');
const app = new Koa();

// adding a date method to the context
app.context.date = Date();
app.context.userData = {
    first: 'Joe',
    last: 'Joergenstson',
    money: 0
};

app.use(async (ctx, next) => {
    await next();
    const responseTime = ctx.response.get('X-Response-Time');
    console.log(`Response Time: ${responseTime}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async (ctx) => {
    try {
        // if (!ctx.userData) { ctx.throw(400, 'User data is required')  };
        ctx.userData.money ++;
        ctx.state.user = 'Joe Joergenstson'; // ctx is main request that contains the request/response methods
        let from = ctx.request.origin;
        ctx.body = `${ctx.userData.first} ${ctx.userData.last} ${ctx.userData.money} \n ${ctx.date}`;
        console.log(`${ctx.request.method} from PORT: ${from}`);
    } catch(error) {
        console.log(error);
    }
});

app.listen(1212);