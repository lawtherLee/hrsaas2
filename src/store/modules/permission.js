import router, { asyncRouters, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routers: [],
    roles: []
  },
  // 7.自己维护一套路由规则 并存到state
  mutations: {
    SET_ROUTERS(state, payload) {
      state.routers = payload
      console.log(state.routers)
    },
    SET_ROLES(state, payload) {
      state.roles = payload
    }
  },
  // 6. 注释234步
  actions: {
    filterRouters({ commit }, roles) {
      console.log(asyncRouters)
      const routers = asyncRouters.filter(item => {
        return roles.menus.includes(item.meta.id)
      })
      router.addRoutes([...routers, { path: '*', redirect: '/404', hidden: true }])
      commit('SET_ROUTERS', [...routers, ...constantRoutes])
      commit('SET_ROLES', roles) // 这里面有用户按钮权限的字段
    }
  }
}
// 8.layout的sidebar组件应用
