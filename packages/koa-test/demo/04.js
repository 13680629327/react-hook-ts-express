const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demo/template.html')
};


app.use(main);
app.listen(5000);