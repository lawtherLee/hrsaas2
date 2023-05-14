<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
      auto-complete="on"
      class="login-form"
      label-position="left"
    >
      <!--标题-->
      <div class="title-container">
        <h3 class="title">
          <img alt="" src="@/assets/common/login-logo.png">
        </h3>
      </div>
      <!--      用户名-->
      <el-form-item prop="mobile">
        <span
          class="svg-container el-icon-user-solid"
        />
        <el-input v-model="loginForm.mobile" placeholder="请输入手机号码" />
      </el-form-item>

      <!--      密码-->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" />
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType==='password'? 'eye':'eye-open'" />
        </span>
      </el-form-item>

      <!--登录按钮-->
      <el-button
        :loading="loading"
        class="loginBtn"
        style="width:100%;margin-bottom:30px;"
        type="primary"
        @click.native.prevent="onLogin"
      >登录
      </el-button>

      <!--提示文本-->
      <div class="tips">
        <span style="margin-right:20px;">username: 13800000002</span>
        <span> password: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>

import { validMobile } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    // 抽离的手机校验
    const validateMobile = (rule, val, cb) => {
      if (!validMobile(val)) {
        cb(new Error('手机格式不正确'))
      } else {
        cb()
      }
    }
    return {
      loading: false,
      loginForm: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? '123456' : ''
      },
      passwordType: 'password',
      loginFormRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          }, {
            validator: validateMobile,
            trigger: 'blur'
          }
        ],
        password: [{
          required: true,
          message: '请输入密码'
        }, {
          min: 6,
          max: 16,
          message: '密码长度在6-16位',
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {},
  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    async onLogin() {
      try {
        this.loading = true
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/loginAction', this.loginForm)
        this.$router.push('/')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    color: #454545;
  }

  .el-form-item__error {
    color: red;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: $bg url('~@/assets/common/login.jpg') no-repeat center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .loginBtn {
      background: #407ffe;
      height: 64px;
      line-height: 32px;
      font-size: 24px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
