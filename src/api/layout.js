import request from '@/utils/request'
/**
 * 请求左侧菜单接口
 **/
export const getLeftSideMenu = (params) => {
  return request({
    url: 'menus',
    params
  })
}
