<script>
import { defineComponent } from 'vue'
import { getEmployeeListAPI } from '@/api/employees'

export default defineComponent({
  name: 'index',
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    // 获取列表数据
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeListAPI(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 切换页面
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    }
  },
  created() {
    this.getEmployeeList()
  }
})
</script>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template #before>
          <span>共166条记录</span>
        </template>
        <!--        <span slot="before">共166条记录</span>-->
        <template v-slot:after>
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table :data="list" border>
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column label="聘用形式" prop="formOfEmployment" sortable="" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="" />
          <el-table-column label="账户状态" prop="enableState" sortable="" />
          <el-table-column fixed="right" label="操作" sortable="" width="280">
            <template>
              <el-button size="small" type="text">查看</el-button>
              <el-button size="small" type="text">转正</el-button>
              <el-button size="small" type="text">调岗</el-button>
              <el-button size="small" type="text">离职</el-button>
              <el-button size="small" type="text">角色</el-button>
              <el-button size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row align="middle" justify="center" style="height: 60px" type="flex">
          <el-pagination
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
