const express = require('express');
const router = express.Router();

// 获取 json 数据
const { getFileData } = require('../common');

// 获取菜单列表
router.get('/api/getMenuList', async(req, res) => {
  // 获取所有用户信息
  const menuData = await getFileData('menuData');
  res.status(200).json({
    code: 200,
    data: menuData,
    success: true,
    message: '获取数据成功！'
  });
});

module.exports = router;
