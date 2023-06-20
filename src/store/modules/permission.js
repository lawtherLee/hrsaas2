import router, { asyncRouters, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routers: []
  },
  // 7.自己维护一套路由规则 并存到state
  mutations: {
    SET_ROUTERS(state, payload) {
      state.routers = payload
    }
  },
  // 6. 注释234步 哈哈哈
  actions: {
    filterRouters({ commit }, roles) {
      const routers = asyncRouters.filter(item => {
        return roles.menus.includes(item.meta.id)
      })
      router.addRoutes([...routers, { path: '*', redirect: '/404', hidden: true }])
      commit('SET_ROUTERS', [...routers, ...constantRoutes])
    }
  }
}
// 7.layout的sidebar组件
