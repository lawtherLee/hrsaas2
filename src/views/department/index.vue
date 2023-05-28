<script>
import { defineComponent } from 'vue'
import { getDepartmentsAPI } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import TreeTools from '@/views/department/components/tree-tools.vue'
import AddDept from '@/views/department/components/add-dept.vue'

export default defineComponent({
  name: 'index',
  components: { AddDept, TreeTools },

  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人', id: '' },
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },

  methods: {
    // 获取组织架构数据
    async getDepartments() {
      try {
        this.loading = true
        const res = await getDepartmentsAPI()
        console.log(res)
        this.departs = tranListToTreeData(res.depts, '') // 转换树形结构需要的数据
        this.company = {
          name: res.companyName,
          manager: res.companyManage,
          id: ''
        }
      } finally {
        this.loading = false
      }
    },
    // 新增子部门
    handleAddDept(node) {
      console.log(node)
      this.dialogVisible = true
      this.currentNode = node
    },
    // 编辑子部门
    editDept(node) {
      this.currentNode = { ...node } // 存放当前操作的节点
      // 回显数据
      this.$refs.addDept.formData = { ...node }
      this.dialogVisible = true
    }
  },
  created() {
  },
  mounted() {
    this.getDepartments()
  }
})
</script>

<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <tree-tools :is-root="false" :tree-node="company" @addDept="handleAddDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" default-expand-all>
      <template v-slot="{data}">
        <tree-tools
          :tree-node="data"
          @addDept="handleAddDept"
          @editDept="editDept"
          @refreshList="getDepartments"
        />
      </template>
    </el-tree>
    <!--    新增子部门弹窗-->
    <add-dept
      ref="addDept"
      :dialog-visible.sync="dialogVisible"
      :tree-node="currentNode"
    />
  </div>
</template>

<style lang="scss" scoped>
.departments-container {
  width: 1100px;
  margin: 20px auto;

  .el-card__body {
    // padding-right: 0px !important;
  }
}
</style>
