<script>
import { defineComponent } from 'vue'
import employees from '@/api/constant/employees'
import { formatTime } from '@/filters'
import { importEmployeeAPI } from '@/api/employees'

export default defineComponent({
  name: 'index',
  data() {
    return {}
  },
  methods: {
    // excel转换正常时间戳
    ExcelDateToJSDate(serial) {
      const utc_days = Math.floor(serial - 25569)
      const utc_value = utc_days * 86400
      const date_info = new Date(utc_value * 1000)
      const fractional_day = serial - Math.floor(serial) + 0.0000001
      let total_seconds = Math.floor(86400 * fractional_day)
      const seconds = total_seconds % 60
      total_seconds -= seconds
      const hours = Math.floor(total_seconds / (60 * 60))
      const minutes = Math.floor(total_seconds / 60) % 60
      return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds)
    },
    beforeUpload(file) {
      if (!file.name.endsWith('.xlsx')) {
        return alert('请选择excel文件')
      }
      return true
    },
    async handleSuccess({ header, results }) {
      const { excelMapKeyPath } = employees
      const arr = results.map(item => {
        return Object.keys(excelMapKeyPath).reduce((sum, ele) => {
          if (ele === '入职日期' || ele === '转正日期') {
            const time = item[ele]
            const date = this.ExcelDateToJSDate(time)
            sum[excelMapKeyPath[ele]] = formatTime(date)
          } else {
            sum[excelMapKeyPath[ele]] = item[ele]
          }
          return sum
        }, {})
      })
      await importEmployeeAPI(arr)
      this.$router.go(-1)
      this.$message.success('导入成功')
      // 解析成功时候会触发的回调函数，它会返回表格的表头和内容。
      // const userRelations = {
      //   '入职日期': 'timeOfEntry',
      //   '手机号': 'mobile',
      //   '姓名': 'username',
      //   '转正日期': 'correctionTime',
      //   '工号': 'workNumber'
      // }
      // const arr = []
      // results.forEach(item => {
      //   const userInfo = {}
      //   Object.keys(item).forEach(key => {
      //     userInfo[userRelations[key]] = item[key]
      //   })
      //   arr.push(userInfo)
      // })

      // 还可以这样
      // const arr = results.map(item => {
      //   const obj = {}
      //   for (const key in userRelations) {
      //     obj[userRelations[key]] = item[key]
      //   }
      //   return obj
      // })

      // 甚至可以这样
      // const arr = results.map(item => {
      //   return Object.keys(userRelations).reduce((sum, key) => {
      //     sum[userRelations[key]] = item[key]
      //   }, {})
      // })
    }
  }
})
</script>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :before-upload="beforeUpload" :on-success="handleSuccess" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
