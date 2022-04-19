const express = require('express');
const app = express();
const login = require('./router/login');
const menu = require('./router/menu');
const register = require('./router/register');
const user = require('./router/user');
const staff = require('./router/staff');

// 登录状态
global.isLogin = false

// 解析 application/json 数据
app.use(express.json())
// 解析 application/x-www-form-urlencoded 数据
app.use(express.urlencoded())

// 登录拦截
app.all('*', (req, res, next) => {
  console.log(req.url, global.isLogin)
  // 定义不受登录限制接口
  const unlimitedUrl = ['/api/login', '/api/register']
  if (!unlimitedUrl.includes(req.url)) {
    if (!global.isLogin) {
      return res.json({
        code: 304,
        data: null,
        success: false,
        message: '未登录！'
      })
    }
  }
  next()
})

// router
app.use('/', login);
app.use('/', menu);
app.use('/', register);
app.use('/', user);
app.use('/', staff);

app.listen(5000, () => {
  console.log('服务启动')
})