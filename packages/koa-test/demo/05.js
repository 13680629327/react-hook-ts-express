const Koa = require('koa');
const app = new Koa();

// 原生路由
const main = ctx => {
  if (ctx.request.path !== '/') {
    // ctx.response.type = 'html';
    ctx.response.body = `<a href="/">Index Page</a>`;
  } else {
    ctx.response.body = 'Hellow World';
  }
};

app.use(main);
app.listen(5000)