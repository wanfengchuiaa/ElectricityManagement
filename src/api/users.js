import request from '@/utils/request'

/**
 * 获取用户列表
 */
export const getUsersList = (params) => {
  return request({
    url: 'users',
    params
  })
}

/**
 * 修改用户状态
 */
export const ModifyUserState = (id, cheacked) => {
  return request({
    url: `users/${id}/state/${cheacked}`,
    method: 'PUT'
  })
}

/**
 * 添加用户
 */
export const AddUser = (data) => {
  return request({
    url: 'users',
    method: 'POST',
    data
  })
}

/**
 * 根据id查找用户信息
 */
export const IdGetUser = (id) => {
  return request({
    url: `users/${id}`
  })
}

/**
 * 修改用户信息提交
 */
export const emitUser = (id, email, mobile) => {
  return request({
    method: 'put',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}

/**
 * 删除单个用户
 */
export const delUser = (id) => {
  return request({
    method: 'delete',
    url: `users/${id}`
  })
}

/**
 * 分配用户角色
 */
export const DistributionUser = (id, rid) => {
  return request({
    method: 'put',
    url: `users/${id}/role`,
    body: {
      rid
    }
  })
}
