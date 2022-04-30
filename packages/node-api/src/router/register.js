const express = require('express');
const router = express.Router();
// 创建用户id
const { v4: uuidv4 } = require('uuid');

// 更新 json 数据
const { getFileData, setFileData } = require('../common');

// 用户注册
router.post('/api/register', async(req, res) => {
  // 获取所有用户信息
  const allUserInfo = await getFileData('userData');
  const allUserName = allUserInfo.map(user => user.userName);
  const { userName, password, sex } = req.body;
  // 判断用户是否已注册
  if (allUserName.includes(userName)) {
    res.json({
      code: 200,
      data: null,
      success: false,
      message: '该用户已注册！'
    });
    return;
  }
  if (!password) {
    res.json({
      code: 200,
      data: null,
      success: false,
      message: '请填写账号密码！'
    });
    return;
  }
  if (!sex) {
    res.json({
      code: 200,
      data: null,
      success: false,
      message: '请选择性别！'
    });
    return;
  }
  allUserInfo.push({
    ...req.body,
    userId: uuidv4()
  });
  setFileData('userData', allUserInfo);
  res.json({
    code: 200,
    data: null,
    success: true,
    message: '注册成功！'
  });
});

module.exports = router;