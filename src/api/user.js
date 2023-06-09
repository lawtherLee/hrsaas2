import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户资料
 * @returns {*}
 */
export function getUserInfoAPI() {
  return request({
    url: 'sys/profile',
    method: 'post'
  })
}

/**
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * @param id
 * @returns {*}
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * 更新密码
 * @param data
 * @returns {*}
 */
export function updatePasswordAPI(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
