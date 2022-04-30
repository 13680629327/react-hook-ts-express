const express = require('express');
const router = express.Router();

// 更新 json 数据
const { getFileData, setFileData } = require('../common');

// 用户注册
router.post('/api/updateUserData', async(req, res) => {
  // 在前端做了数据限制，这里本人偷个懒
  // 获取所有用户信息
  const userData = await getFileData('userData');
  const newData = userData.map(user => {
    if (user.userId === req.body.userId) {
      return { ...user, ...req.body };
    }
    return { ...user };
  });
  const currentUserData = newData.find(user => user.userId === req.body.userId);
  setFileData('userData', newData);
  res.json({
    code: 200,
    data: currentUserData,
    success: true,
    message: '更新成功！'
  });
});

module.exports = router;