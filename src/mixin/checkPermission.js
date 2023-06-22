import store from '@/store'

export default {
  methods: {
    checkPermission(key) {
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
// 使用
// <el-button :disabled="!checkPermission('POINT-USER-UPDATE')" >查看</el-button>
