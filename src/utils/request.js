import axios from 'axios'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/'
})

request.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('dianshangToken')
  return config
})
export default request
