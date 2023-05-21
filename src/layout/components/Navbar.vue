<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!--    左侧结构-->
    <div class="app-breadcrumb">
      {{ $store.state.user.userInfo.companyName }}
      <span class="breadBtn">体验版</span>
    </div>
    <!--    <breadcrumb class="breadcrumb-container" />-->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            v-if="userAvatar"
            v-imgErr="defaultAvatar"
            :src="userAvatar"
            alt=""
            class="user-avatar"
          >
          <span v-else class="username">{{ userName?.charAt(0) }}</span>
          <span>{{ userName }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--    改密码弹出框-->
    <el-dialog :visible.sync="showDialog" title="修改密码" width="500px" @close="cancelDialog">
      <el-form ref="passForm" :model="passForm" :rules="rules" label-width="120px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item v-model="passForm.confirmPassword" label="重复密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="isOk">确认修改</el-button>
          <el-button size="mini" @click="cancelDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' // import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePasswordAPI } from '@/api/user'
import defaultAvatar from '@/assets/common/head.jpg'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  data() {
    return {
      defaultAvatar: defaultAvatar,
      showDialog: false,
      passForm: {
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        confirmPassword: '' // 确认密码字段
      },
      rules: {
        oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }], // 旧密码
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 6,
            max: 16,
            message: '新密码的长度为6-16位之间'
          }], // 新密码
        confirmPassword: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              // value
              if (this.passForm.newPassword === value) {
                callback()
              } else {
                callback(new Error('重复密码和新密码输入不一致'))
              }
            }
          }] // 确认密码字段
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userName',
      'userAvatar'
    ])
  },
  methods: {
    updatePassword() {
      this.showDialog = true
    },
    // 确认新密码
    isOk() {
      this.$refs.passForm.validate(async isOk => {
        if (isOk) {
          await updatePasswordAPI(this.passForm)
          this.$message.success('修改成功')
          this.cancelDialog()
        }
      })
    },
    cancelDialog() {
      this.$refs.passForm.resetFields()
      this.showDialog = false
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;

    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .hamburger-container {
    color: #ffffff;
    fill: currentColor;
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        color: #fff;

        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #fff;
          margin-right: 4px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right: 8px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
