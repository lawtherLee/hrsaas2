// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }

// 实现组件的自动注册
const fn = require.context('./', true, /\.vue$/)
// console.log(fn('./PageTools/index.vue'))// 根据路径查找模块
const components = fn.keys().map(ele => fn(ele))
export default Vue => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}
