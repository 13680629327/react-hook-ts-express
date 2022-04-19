import axios from 'axios'
import { message } from 'antd';
// 创建axios
const http = axios.create({
  timeout: 60000,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})

// 请求拦截
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
http.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === 304) {
      message.error(data.message);
      window.location.href = '/login'
    } else if (data.code !== 200 || !data.success) {
      message.error(data.message);
      return Promise.reject({ ...data })
    } else {
      return data
    }
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response)
    }
  }
)

export default http
