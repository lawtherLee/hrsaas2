<script>
import { defineComponent } from 'vue'
import {
  addRoleAPI,
  assignPermAPI,
  deleteRoleAPI,
  getCompanyInfoAPI,
  getRoleDetailAPI,
  getRoleListAPI,
  updateRoleAPI
} from '@/api/setting'
import { tranListToTreeData } from '@/utils/'
import { getPermissionListAPI } from '@/api/permisson'

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
      },
      companyForm: {},
      showPermDialog: false,
      defaultProps: {
        label: 'name'
      },
      permData: [], // 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      roleId: null, // 用来记录分配角色的id
      loading: false
    }
  },

  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleListAPI(this.page)
      this.page.total = total
      this.list = rows
      // 响应式添加属性
      this.list.forEach(item => {
        this.$set(item, 'isEdit', false)
        // 数据缓存
        this.$set(item, 'editRow', {
          name: item.name,
          description: item.description
        })
      })
      console.log(this.list)
    },
    changePage(newPage) {
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },

    // 改
    btnEdit(ev) {
      ev.isEdit = true
    },
    async btnEditOK(ev) {
      if (ev.editRow.name && ev.editRow.description) {
        await updateRoleAPI({ ...ev.editRow, id: ev.id })
        this.$message.success('更新成功')
        // ev.isEdit = false 这样会引起esLint误判
        Object.assign(ev, {
          ...ev.editRow,
          isEdit: false
        })
      } else {
        this.$message.warning('角色和描述不能为空')
      }
    },

    // 删
    async deleteRole(id) {
      try {
        await this.$confirm('确认删除该角色吗')
        await deleteRoleAPI(id)
        this.$message.success('删除成功')
        // 删除的是最后一个
        if (this.list.length === 1) this.page.page--
        await this.getRoleList()
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
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.companyForm = await getCompanyInfoAPI(this.$store.state.user.userInfo.companyId)
    },
    // 关闭分配权限弹窗
    btnPermCancel() {
      this.selectCheck = [] // 重置数据
      this.showPermDialog = false
    },
    async assignPerm(id) {
      this.permData = tranListToTreeData(await getPermissionListAPI(), '0')
      this.roleId = id
      const { permIds } = await getRoleDetailAPI(id) // permIds是当前角色所拥有的权限点数据
      this.selectCheck = permIds
      this.showPermDialog = true
    },
    async btnPermOK() {
      await assignPermAPI({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.btnPermCancel()
    }
  },

  created() {
    this.getRoleList()
    this.getCompanyInfo()
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
            <el-table-column align="center" label="角色名称" prop="name" width="240">
              <template v-slot="{row}">
                <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
                <span v-else>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="描述" prop="description">
              <template v-slot="{row}">
                <el-input v-if="row.isEdit" v-model="row.editRow.description" size="mini" />
                <span v-else> {{ row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template v-slot="{row}">
                <!--              编辑状态-->
                <template v-if="row.isEdit">
                  <el-button size="mini" type="primary" @click="btnEditOK(row)">确定</el-button>
                  <el-button size="mini" @click="row.isEdit = false">取消</el-button>
                </template>
                <!--                非编辑状态-->
                <template v-else>
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="btnEdit(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
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
          <el-alert
            :closable="false"
            show-icon
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyForm.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyForm.remarks" :rows="3" disabled style="width:400px" type="textarea" />
            </el-form-item>
          </el-form>
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

    <el-dialog :visible="showPermDialog" title="分配权限" @close="btnPermCancel">
      <!-- 权限是一颗树 -->
      <!-- 将数据绑定到组件上 -->
      <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
      <!-- id作为唯一标识 -->
      <el-tree
        ref="permTree"
        :check-strictly="true"
        :data="permData"
        :default-checked-keys="selectCheck"
        :default-expand-all="true"
        :props="defaultProps"
        :show-checkbox="true"
        node-key="id"
      />
      <!-- 确定 取消 -->
      <el-row slot="footer" justify="center" type="flex">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
