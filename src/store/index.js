import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
import permission from '@/store/modules/permission'
import tagsView from '@/store/modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView
  },
  getters,
  plugins: [createPersistedState({ // 持久化
    reducer(state) {
      return {
        user: { token: state.user.token }
      }
    }
  })]
})

export default store
