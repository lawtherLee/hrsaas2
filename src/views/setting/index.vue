<script>
import { defineComponent } from 'vue'
import { addRoleAPI, deleteRoleAPI, getRoleListAPI } from '@/api/setting'

export default defineComponent({
  name: 'index',
  computed: {},

  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {},
      roleForm: {
        name: '',
        region: ''
      },
      dialogVisible: false,
      roleFormRules: {
        name: {
          required: true,
          message: '请填写角色名称',
          trigger: 'blur'
        }
      }
    }
  },

  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleListAPI(this.page)
      this.page.total = total
      this.list = rows
      console.log(this.list)
    },
    changePage(newPage) {
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    // 删
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该角色吗')
        await deleteRoleAPI(id)
        await this.getRoleList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 增
    async addRole() {
      try {
        await this.$refs.form.validate(async isOk => {
          if (isOk) {
            await addRoleAPI(this.roleForm)
            await this.getRoleList()
            this.$message.success('新增成功')
            this.dialogVisible = false
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.form.resetFields()
      this.dialogVisible = false
    }
  },

  created() {
    this.getRoleList()
  }
})
</script>

<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="角色管理">
          <!--          新增角色按钮-->
          <el-row style="height: 60px">
            <el-button icon="el-icon-plus" size="small" type="primary" @click="dialogVisible = true">
              新增角色
            </el-button>
          </el-row>
          <!--          表格-->
          <el-table :border="false" :data="list">
            <el-table-column align="center" label="序号" type="index" width="120" />
            <el-table-column align="center" label="角色名称" prop="name" width="240" />
            <el-table-column align="center" label="描述" prop="description" />
            <el-table-column align="center" label="操作">
              <template v-slot="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--          分页-->
          <el-row align="middle" justify="center" style="height: 60px" type="flex">
            <el-pagination
              :current-page="page.page"
              :page-size="page.pagesize"
              :total="page.total"
              layout="prev,pager,next"
              @current-change="changePage"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          公司信息
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--    弹窗-->
    <el-dialog :visible.sync="dialogVisible" title="新增角色" width="30%" @close="btnCancel">
      <el-form ref="form" :model="roleForm" :rules="roleFormRules" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">新增角色</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
