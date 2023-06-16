<script>
import { defineComponent } from 'vue'
import { getUserDetailById } from '@/api/user'
import { saveUserDetailByIdAPI } from '@/api/employees'
import UserInfo from '@/views/employees/components/user-info.vue'
import JobInfo from '@/views/employees/components/job-info.vue'
import Cookie from 'js-cookie'

export default defineComponent({
  name: 'detail',
  components: { JobInfo, UserInfo },
  data() {
    return {
      formData: {},
      activeName: Cookie.get('tabActive') || 'job'
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.formData = await getUserDetailById(this.$route.params.id)
    },
    async onSave() {
      await saveUserDetailByIdAPI(this.formData)
      this.$message.success('修改成功')
      this.$router.back()
    },
    tabHandleClick() {
      Cookie.set('tabActive', this.activeName)
    }
  }
})
</script>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabHandleClick">
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input v-model="formData.mobile" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="formData.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info />

          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
