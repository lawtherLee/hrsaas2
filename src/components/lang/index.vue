<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- 这里必须加一个div -->
    <div>
      <svg-icon icon-class="language" style="color:#fff;font-size:20px" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="'zh'=== $i18n.locale " command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="'en'=== $i18n.locale " command="en">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  name: 'Lang',
  methods: {
    changeLanguage(lang) {
      Cookie.set('language', lang) // 切换多语言
      this.$i18n.locale = lang // 设置给本地的i18n插件
      this.$message.success('切换多语言成功')
    }
  }
}
</script>
