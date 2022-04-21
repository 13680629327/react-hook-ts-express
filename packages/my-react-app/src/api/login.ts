import http from './index';

// 登录
export const login = (data = {}) => {
  return http.post('/api/login', data);
};

//
export const loginOut = () => {
  return http.post('/api/loginOut');
};
