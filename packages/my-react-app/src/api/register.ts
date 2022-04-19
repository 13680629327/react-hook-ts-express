import http from './index';

// 注册
export const register = (data = {}) => {
  return http.post(`/api/register`, data);
};
