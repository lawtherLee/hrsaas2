import { login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN(state) {
      state.token = null
      removeToken()
    }
  },
  actions: {
    async loginAction({ commit }, data) {
      try {
        const res = await login(data)
        // console.log(res)
        commit('SET_TOKEN', res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
