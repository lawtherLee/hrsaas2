<script>
import { defineComponent } from 'vue'
import { getRoleListAPI } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRolesAPI } from '@/api/employees'

export default defineComponent({
  name: 'assign-role',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [],
      list: [] // 角色列表
    }
  },
  methods: {
    onclose() {
      this.roleIds = []
      this.$emit('update:visible', false)
    },
    async getRoleList() {
      const { rows } = await getRoleListAPI()
      this.list = rows
      // console.log(this.list)
    },
    onOpen() {
      this.getRoleList()
      this.getUserDetailById()
    },
    async getUserDetailById() {
      const { roleIds } = await getUserDetailById(this.userId)
      this.roleIds = roleIds // 赋值本用户的角色
    },
    async saveEmployeesRole() {
      await assignRolesAPI({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:visible', false)
    }
  }
})
</script>

<template>
  <el-dialog :visible="visible" title="分配角色" @close="onclose" @open="onOpen">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="saveEmployeesRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>
