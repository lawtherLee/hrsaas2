<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'index',
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }

  }
})
</script>

<template>
  <el-card class="page-tools">
    <el-row align="middle" justify="space-between" type="flex">
      <el-col>
        <div v-if="showBefore" class="before">
          <i class="el-icon-info" />
          <!-- 定义前面得插槽 -->
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row justify="end" type="flex">
          <!-- 定义后面的插槽 -->
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
.page-tools {
  margin: 10px 0;

  .before {
    line-height: 34px;

    i {
      margin-right: 5px;
      color: #409eff;
    }

    display: inline-block;
    padding: 0 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
