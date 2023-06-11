<script>
import { defineComponent } from 'vue'
import employees from '@/api/constant/employees'
import { getDepartmentsAPI } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import { addEmployeeAPI } from '@/api/employees'

export default defineComponent({
  name: 'add-employee',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      treeLoading: false,
      employees,
      // 表单数据
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async btnOK() {
      try {
        await this.$refs.addEmployee.validate(async vald => {
          if (vald) {
            await addEmployeeAPI(this.formData)
            this.$parent.getEmployeeList()
            this.$parent.visible = false
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    onClose() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields()
      this.$emit('update:visible', false)
    },
    // 选择部门
    handleNodeClick(data) {
      console.log(data)
      this.formData.departmentName = data.name
      this.$refs.deptSelect.blur()
    },
    async getDepartments() {
      this.treeLoading = true
      const { depts } = await getDepartmentsAPI()
      this.treeData = tranListToTreeData(depts, '')
      this.treeLoading = false
    }
  }
})
</script>

<template>
  <el-dialog :visible="visible" title="提示" width="50%" @close="onClose">
    <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" style="width:50%" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" style="width:50%" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" placeholder="请选择入职时间" style="width:50%" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择" style="width:50%">
          <el-option v-for="item in employees.hireType" :key="item.id" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" placeholder="请输入工号" style="width:50%" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          ref="deptSelect"
          v-model="formData.departmentName"
          placeholder="请选择部门"
          style="width:50%"
          @focus="getDepartments"
        >
          <el-option v-loading="treeLoading" class="treeSelectOption" value="">
            <el-tree :data="treeData" :props="{label:'name'}" @node-click="handleNodeClick" />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" placeholder="请选择转正时间" style="width:50%" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="btnOK">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped>
.treeSelectOption.el-select-dropdown__item.hover {
  background-color: #fff;
}

.treeSelectOption.el-select-dropdown__item {
  overflow: unset;
  height: 80px;
}
</style>
