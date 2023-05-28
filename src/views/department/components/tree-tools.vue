<script>
import { defineComponent } from 'vue'
import { delDepartmentsAPI } from '@/api/departments'

export default defineComponent({
  name: 'tree-tools',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') {
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDept', this.treeNode)
      } else {
        this.$confirm('是否删除该部门', '提示', {
          type: 'warning'
        }).then(async res => {
          return delDepartmentsAPI(this.treeNode.id)
        }).then(res => {
          this.$message.success('删除成功')
          this.$emit('refreshList')
        })
      }
    }
  },
  created() {
  }
})
</script>

<template>
  <el-row align="middle" justify="space-between" style="height:40px;width: 100%;" type="flex">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row justify="space-between" type="flex">
        <span style="margin-right:16px;">{{ treeNode.manager }}</span>
        <el-dropdown @command="handleCommand">
          <span>操作<i class="el-icon-arrow-down el-icon--right" /></span>
          <el-dropdown-menu>
            <template #default>
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>

</style>
