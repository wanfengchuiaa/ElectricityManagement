
import request from '@/utils/request'
/**
 * 请求登录接口
 **/
export const getLogin = (data) => {
  return request({
    method: 'POST',
    url: 'login',
    data
  })
}
