import http from './index'

// 获取菜单接口
export const getMenuList = () => {
  return http.get(`/api/getMenuList`)
}