const express = require('express')
const router = express.Router()
// 创建用户id
const { v4: uuidv4 } = require('uuid');
const { getFileData, setFileData } = require('../common');

// 获取员工列表
router.get('/api/getStaffList', async (req, res) => {
  const staffList = await getFileData('staffData')
  // 根据 userId 匹配，获取到相对应的员工数据
  const data = staffList.find(item => item.userId === global.userId)
  res.status(200).json({
    code: 200,
    data: data.list,
    success: true,
    message: '获取数据成功！'
  })
})

// 新增员工列表
router.post('/api/addStaff', async (req, res) => {
  const staffList = await getFileData('staffData')
  for(let i = 0; i < staffList.length; i++) {
    let item = staffList[i]
    if (item.userId === global.userId) {
      // 判断员工是否存在
      const staffName = item.list.map(staff => staff.name)
      if (!staffName.includes(req.body.name)) {
        // 添加员工数据
        item.list.push({id: uuidv4(), ...req.body})
        setFileData('staffData', staffList)
        res.status(200).json({
          code: 200,
          data: null,
          success: true,
          message: '新增成功！'
        })
      } else {
        res.status(200).json({
          code: 200,
          data: null,
          success: false,
          message: '该员工已存在！'
        })
      }
      return
    }
  }
})

// 删除员工列表
router.post('/api/delStaff', async(req, res) => {
  const staffList = await getFileData('staffData')
  const ids = req.body.ids
  for(let i = 0; i < staffList.length; i++) {
    let item = staffList[i]
    if (item.userId === global.userId) {
      const newStaff = item.list.filter(item => !ids.includes(item.id))
      item.list = newStaff
      setFileData('staffData', staffList)
      res.status(200).json({
        code: 200,
        data: null,
        success: true,
        message: '删除成功！'
      })
      return
    }
  }
})

// 编辑员工信息
router.post('/api/editStaff', async(req, res) => {
  const staffList = await getFileData('staffData')
  for(let i = 0; i < staffList.length; i++) {
    let item = staffList[i]
    if (item.userId === global.userId) {
      const newStaff = item.list.map(staff => {
        if (staff.id === req.body.id) {
          return {...req.body}
        }
        return {...staff}
      })
      item.list = newStaff
      setFileData('staffData', staffList)
      res.status(200).json({
        code: 200,
        data: null,
        success: true,
        message: '编辑成功！'
      })
      return
    }
  }
  setFileData('staffData', staffList)
  res.status(200).json({
    code: 200,
    data: null,
    success: true,
    message: '修改成功！'
  })
})

module.exports = router;