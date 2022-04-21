import http from './index';

// 更新用户信息
export const updateUserData = (data = {}) => {
  return http.post('/api/updateUserData', data);
};
