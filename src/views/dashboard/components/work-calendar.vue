<template>
  <div>
    <el-row justify="end" type="flex">
      <!--      年-->
      <el-col :span="4">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option v-for="item in years" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
      <!--      月-->
      <el-col :span="4">
        <el-select v-model="currentMonth" @change="updateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{date}">
        <div>
          <span>{{ date.getDate() }}</span>
          <span v-if="date.getDay() === 6 || date.getDay() === 0">休</span>
        </div>
      </template>

    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  data() {
    return {
      currentYear: '',
      currentMonth: 10,
      years: [],
      currentDate: new Date()
    }
  },
  created() {
    this.initYear()
  },
  methods: {
    initYear() {
      const date = new Date()
      console.log(date)
      this.currentYear = date.getFullYear()
      console.log(this.currentYear)
      this.years = Array(11).fill(this.currentYear).map((item, index) => {
        console.log(item - 5 + index)
        return item - 5 + index
      })
      console.log(this.years)
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }

  .el-calendar-table td, .el-calendar-table tr:first-child td {
    border: none;
  }
}
</style>
