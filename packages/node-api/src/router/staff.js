const express = require('express')
const router = express.Router()

const { getFileData } = require('../common');

// 获取员工列表
router.get('/api/getStaffList', async (req, res) => {
  console.log(req.query)
  res.status(200).json({
    code: 200,
    data: req.query,
    success: true,
    message: '获取数据成功！'
  })
})

module.exports = router;