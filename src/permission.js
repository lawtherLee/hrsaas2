// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
//
// NProgress.configure({ showSpinner: false }) // NProgress Configuration
//
import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404'] // no redirect whitelist
// 全局前置守卫
router.beforeEach(async(to, from, next) => {
  // const token = store.getters.token
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.getters.userId) { // 读取不到用户id才发请求重新获取，解决重复获取
        // 动态路由第一步获取权限数据
        const { roles } = await store.dispatch('user/getUserInfo') // 第一时间获取用户信息
        console.log(roles, '动态路由表')
        await store.dispatch('permission/filterRouters', roles)
        // 2.进行路由筛选，路由规则中准备meta的id标识
        // const filterRouters = asyncRouters.filter(item => {
        //   return roles.menus.includes(item.meta.id)
        // })
        // 3.动态添加
        // Router.addRoutes(filterRouters)
        // 4.解决404
        // Router.addRoutes([...filterRouters, { path: '*', redirect: '/404', hidden: true }])
        next(to.path) // 动态添加的路由规则,后修的next必须是next(to.path)
        // 5.store封装permission模块
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) { // 在白名单直接放行
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})
// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()
//
//   // set page title
//   document.title = getPageTitle(to.meta.title)
//
//   // determine whether the user has logged in
//   const hasToken = getToken()
//
//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')
//
//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/
//
//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })
//
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
