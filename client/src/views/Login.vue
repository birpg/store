<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span>超市后台管理系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        class="loginForm"
        status-icon
        ref="loginForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="loginUser.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginUser.password"
            placeholder="请输入密码"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
        <div class="tiparea">
          <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'login',
  data() {
    return {
      loginUser: {
        name: '',
        password: ''
      },
      options: [
        {
          value: 'manager',
          label: '管理员'
        },
        {
          value: 'employee',
          label: '员工'
        }
      ],
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/users/login', this.loginUser).then(res => {
            const { token } = res.data
            localStorage.setItem('storeToken', token)

            // 解析token
            const decoded = jwt_decode(token)

            // token存到vuex中
            this.$store.dispatch('setIsAuthenticated', !this.isEmpty(decoded))
            this.$store.dispatch('setUser', decoded)
            // 弹窗提示
            this.$message({
              message: '登录成功!',
              type: 'success'
            })
            this.$router.push('/index')
          })
        }
      })
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>


<style lang="scss" scoped>
.login {
  @include bg;

  .loginForm {
    @include bg-form;

    .tiparea {
      text-align: right;
      font-size: 12px;
      color: #333;

      a {
        color: #409eff;
      }
    }
  }
}
</style>
