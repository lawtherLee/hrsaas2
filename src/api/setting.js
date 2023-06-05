import request from '@/utils/request'

/**
 * 获取角色列表
 * ***/
export function getRoleListAPI(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/** *
 * 新增角色
 * ***/
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
