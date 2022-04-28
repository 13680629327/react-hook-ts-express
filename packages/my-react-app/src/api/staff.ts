import http from './index';

// 获取员工列表
export const getStaffList = (params = {}) => {
  return http.get('/api/getStaffList', { params });
};

// 新增员工
export const addStaff = (data = {}) => {
  return http.post('/api/addStaff', data);
};

// 删除员工
export const delStaff = (data = {}) => {
  return http.post('/api/delStaff', data);
};

// 编辑员工
export const editStaff = (data = {}) => {
  return http.post('/api/editStaff', data);
};
