<script>
import { defineComponent } from 'vue'
import { delEmployeeAPI, exportEmployeeAPI, getEmployeeListAPI } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import { formatTime } from '@/filters'
import AddEmployee from '@/views/employees/components/add-employee.vue'
import FileSaver from 'file-saver'
import router from '@/router' // 员工导出

export default defineComponent({
  name: 'index',
  components: { AddEmployee },
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      visible: false
    }
  },
  methods: {
    router() {
      return router
    },
    formatTime,
    // 导出excel
    async exportEmployee() {
      const result = await exportEmployeeAPI()
      console.log(result)
      FileSaver.saveAs(result, '员工信息表.xlsx')
    },
    // 获取列表数据
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeListAPI(this.page)
      this.page.total = total
      this.list = rows
      console.log(this.list)
      this.loading = false
    },
    // 切换页面
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 解决聘用形式显示问题
    // formatEmployment(row, column, cellValue, index) {
    //   if (cellValue === 1) return '正式'
    //   if (cellValue === 2) return '非正式'
    //   return '未知'
    // }
    // 复用性解决
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除？')
        await delEmployeeAPI(id)
        if (this.list.length === 1 && this.page.page > 1) this.page.page--
        await this.getEmployeeList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
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
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportEmployee">导出</el-button>
          <el-button size="small" type="primary" @click="visible = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <keep-alive>
          <el-table :data="list" border>
            <el-table-column label="序号" sortable="" type="index" />
            <el-table-column label="姓名" prop="username" sortable="" />
            <el-table-column label="工号" prop="workNumber" sortable="" />
            <el-table-column :formatter="formatEmployment" label="聘用形式" prop="formOfEmployment" sortable="" />
            <el-table-column label="部门" prop="departmentName" sortable="" />
            <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
              <template v-slot="{row}">
                {{ row.timeOfEntry | formatTime }}
              </template>
            </el-table-column>
            <el-table-column label="账户状态" prop="enableState" sortable="">
              <template v-slot="{row}">
                <el-switch :value="row.enableState === 1" />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" sortable="" width="280">
              <template v-slot="{row}">
                <el-button size="small" type="text" @click="$router.push('/employees/detail/' + row.id)">查看
                </el-button>
                <el-button size="small" type="text">转正</el-button>
                <el-button size="small" type="text">调岗</el-button>
                <el-button size="small" type="text">离职</el-button>
                <el-button size="small" type="text">角色</el-button>
                <el-button size="small" type="text" @click="delEmployee(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </keep-alive>
        <!-- 分页组件 -->
        <keep-alive>
          <el-row align="middle" justify="center" style="height: 60px" type="flex">
            <el-pagination
              :current-page="page.page"
              :page-size="page.size"
              :total="page.total"
              layout="prev, pager, next"
              @current-change="changePage"
            />
          </el-row>
        </keep-alive>

      </el-card>

    </div>
    <!--    弹层-->
    <add-employee :visible.sync="visible" />
  </div>
</template>

<style lang="scss" scoped>

</style>
