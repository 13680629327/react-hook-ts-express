const express = require('express');
const router = express.Router();

// 获取 json 数据
const { getFileData } = require('../common');


// 登录
router.post('/api/login', async(req, res) => {
  global.isLogin = true
  // 获取所有用户信息
  const allUserInfo = await getFileData('userData')
  const { userName, password } = req.body
  const info = allUserInfo.find(item => item.userName == userName)
  if (!info) {
    res.json({
      code: 200,
      data: null,
      success: false,
      message: '用户不存在！'
    })
  } else {
    if (info.password !== password) {
      res.json({
        code: 200,
        data: null,
        success: false,
        message: '密码错误！'
      })
    } else {
      global.userId = info.userId
      res.json({
        code: 200,
        data: info,
        success: true,
        message: '登录成功！'
      })
    }
  }
})

// 退出登陆
router.post('/api/loginOut', (req, res) => {
  global.isLogin = false
  res.json({
    code: 200,
    data: null,
    success: true,
    message: '退出登录成功！'
  })
})

module.exports = router;