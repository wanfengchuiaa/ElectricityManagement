import request from '@/utils/request'

/**
 * 获取所有权限列表(列表型)
 */
export const getPermissionsList = (type) => {
  return request({
    url: `rights/${type}`
  })
}

/**
 * 获取角色列表
 */
export const getRoleList = () => {
  return request({
    url: 'roles'
  })
}

/**
 * 删除角色指定权限
 */
export const delAuthz = (roleId, rightId) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

/**
 * 获取所有权限列表(树型)
 */
export const getPermissionsListtree = () => {
  return request({
    url: 'rights/tree'
  })
}
