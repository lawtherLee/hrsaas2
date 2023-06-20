<script>
import { defineComponent } from 'vue'
import { getEmployeeSimpleAPI } from '@/api/employees'
import { addDepartmentsAPI, getDepartmentsAPI, updateDepartmentsAPI } from '@/api/departments'

export default defineComponent({
  name: 'add-dept',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currentNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 校验部门编码，不允许有重复

    // 部门名称 同级部门中禁止出现重复部门
    // 重点 是同级部门 如何从所有部门中 把同级部门的数据刷选出来
    // 先确定 父ID
    // 先从 tree-tools 拿到数据 在把数据 送到 父组件  父组件 在把数据给 addDept
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = true
      if (!this.formData.id) { // 新增部门
        const deptstj = depts.filter(item => item.pid === this.treeNode?.id)
        isRepeat = deptstj.some(ele => ele.name === value)
      } else { // 编辑部门
        // 保证同级目录并排除自己
        const deptstj1 = depts.filter(item => item.pid === this.treeNode?.pid && item.id !== this.treeNode?.id)
        console.log(deptstj1)
        isRepeat = deptstj1.some(ele => ele.name === value)
      }
      isRepeat ? callback(new Error(`${value}部门已经存在`)) : callback()
    }
    const codeCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = true
      if (!this.formData?.id) {
        console.log(1)
        isRepeat = depts.some(ele => ele.code === value)
      } else {
        // 编辑模式下避免自己和自己校验
        isRepeat = depts.some(ele => ele.id !== this.formData?.id && ele.code === value)
      }
      isRepeat ? callback(new Error(`${value}编码已经存在`)) : callback()
    }
    return {
      peoples: [],
      loading: false,
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门管理者必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-50个字符', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    title() {
      return this.formData.id ? '编辑组织' : '新增组织'
    }
  },

  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addDeptForm.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },

    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimpleAPI()
    },

    async submit() {
      try {
        await this.$refs.addDeptForm.validate()
        this.loading = true
        if (this.formData.id) {
          await updateDepartmentsAPI(this.formData)
        } else {
          await addDepartmentsAPI({ ...this.formData, pid: this.treeNode?.id })
        }
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}成功`)
        this.$parent.getDepartments() // 刷新父组件组织架构列表
        this.handleClose()
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<template>
  <el-dialog :title="title" :visible="dialogVisible" @close="handleClose">
    <el-form ref="addDeptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50个字符" style="width:80%" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择" style="width:80%" @focus="getEmployeeSimple">
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" :rows="3" placeholder="1-300个字符" style="width:80%" type="textarea" />
      </el-form-item>
    </el-form>
    <!--    底部操作拦-->
    <el-row slot="footer" justify="center" type="flex">
      <el-col :span="6">
        <el-button v-loading="loading" size="small" type="primary" @click="submit">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>
