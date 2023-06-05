import request from '@/utils/request'

/**
 * 组织架构信息
 * @returns {*}
 */
export const getDepartmentsAPI = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 编辑部门
 *
 * ***/
export function updateDepartmentsAPI(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

/**
 *  新增部门接口
 *
 * ****/
export function addDepartmentsAPI(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
 * 删除部门
 * @param id
 * @returns {AxiosPromise}
 */
export function delDepartmentsAPI(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

