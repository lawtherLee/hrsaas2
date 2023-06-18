<script>
import { defineComponent } from 'vue'
import { tranListToTreeData } from '@/utils'
import {
  addPermissionAPI,
  delPermissionAPI,
  getPermissionDetailAPI,
  getPermissionListAPI,
  updatePermissionAPI
} from '@/api/permisson'

export default defineComponent({
  name: 'index',
  data() {
    return {
      list: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionListAPI(), '0')
    },
    addPermission(id, type) {
      this.formData.pid = id
      this.formData.type = type
      this.showDialog = true
    },
    async editPermission(id) {
      this.formData = await getPermissionDetailAPI(id)
      this.showDialog = true
    },
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除吗')
        await delPermissionAPI(id)
        await this.getPermissionList()
        this.$message.success('删除成功')
      } catch (e) {
        console.log(e)
      }
    },
    btnOK() {
      this.$refs.perForm.validate().then(() => {
        if (this.formData.id) return updatePermissionAPI(this.formData) // 编辑
        return addPermissionAPI(this.formData) // 新增
      }).then(() => {
        this.$message.success('新增成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    },
    expend(row) {
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, row.isExpand)
    }
  },
  created() {
    this.getPermissionList()
  }
})
</script>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button size="small" type="primary" @click="addPermission(0,1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table ref="table" :data="list" border row-key="id">
        <el-table-column align="center" label="名称">
          <template v-slot="{row}">

            <template v-if="row.type === 1">
              <i class="el-icon-folder-opened" @click="expend(row)" />
              {{ row.name }}
            </template>
            <template v-if="row.type === 2">
              <i class="el-icon-folder" style="margin-left: 20px;" />
              {{ row.name }}
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type === 1" type="text" @click="addPermission(row.id,2)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    弹窗-->
    <el-dialog :title="`${showText}权限点`" :visible="showDialog" @close="btnCancel">
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" justify="center" type="flex">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
