import store from '@/store'

export const imgErr = {
  inserted(dom, option) {
    // options是 指令中的变量的解释  其中有一个属性叫做 value
    // dom 表示当前指令作用的dom对象
    // dom认为此时就是图片
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    if (!dom.src) return (dom.src = option.value)
    dom.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      // dom可以注册error事件
      dom.src = option.value
    }
  }
}

export const hasPermission = {
  inserted(dom, option) {
    function has(point) {
      return store.state.permission.roles.points.includes(point)
    }

    if (!has(option.value)) {
      dom.remove()
    }
  }
}
