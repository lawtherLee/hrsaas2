<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'index'
})
</script>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex">
          <el-col>传智教育</el-col>
          <el-col :span="4">
            <el-row type="flex">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
