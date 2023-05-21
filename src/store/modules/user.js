import { getUserDetailById, getUserInfoAPI, login } from '@/api/user'
import { getToken, removeToken, setTimeStamp, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    createTime: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_TIME(state, time) {
      state.createTime = time
    },
    REMOVE_TOKEN(state) {
      state.token = null
      removeToken()
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = { ...userInfo }
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录
    async loginAction({ commit }, data) {
      try {
        const res = await login(data)
        commit('SET_TOKEN', res)
        setTimeStamp()
      } catch (err) {
        throw new Error(err)
      }
    },
    // 登出
    logout({ commit }) {
      commit('REMOVE_TOKEN')
      commit('REMOVE_USERINFO')
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      const res = await getUserInfoAPI() // 用户基本资料
      const baseInfo = await getUserDetailById(res.userId) // 获取头像
      const baseRes = { ...res, ...baseInfo } // 合并两个接口结果
      commit('SET_USERINFO', baseRes)
      console.log(baseRes)
      return baseRes
    }
  }
}
