import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives'

import Component from '@/components'
import * as filters from '@/filters'
import Print from 'vue-print-nb'
import i18n from '@/lang'
// 打印功能
Vue.use(Print)

// 全局注册过滤器
for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(Component) // 注册自己的插件

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// set ElementUI lang to EN
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
