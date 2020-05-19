<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span>超市后台管理系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        status-icon
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="registerUser.name"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerUser.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            type="password"
            v-model="registerUser.password2"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('registerForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerUser: {
        name: '',
        password: '',
        password2: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 30,
            message: '长度在 6 到 30 个字符',
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post('/api/users/register', this.registerUser)
            .then(res => {
              this.$message({
                message: '注册成功！',
                type: 'success'
              })
              this.$router.push('/login')
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  @include bg;

  .registerForm {
    @include bg-form;
  }
}
</style>
