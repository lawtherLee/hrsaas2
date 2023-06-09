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

/**
 * 获取公司信息
 * **/
export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * 更新角色
 * ***/

export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 给角色分配权限
export function assignPermAPI(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}

/**
 * 获取角色详情
 * @param {String} id 角色id
 * @returns promise
 */
export const getRoleDetailAPI = (id) => {
  return request({
    url: '/sys/role/' + id
  })
}
