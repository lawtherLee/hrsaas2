import request from '@/utils/request'

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeListAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployeeAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployeeAPI(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
