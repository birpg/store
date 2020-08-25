<template>
  <div class="home">
    <div class="breadcrumb">
      <span>修改密码</span>
    </div>

    <el-card class="box-card" shadow="never">
      <el-form ref="form" :model="form" :rules="form_rules" label-width="100px" style="width:350px">
        <el-form-item prop="password" label="原密码">
          <el-input v-model="form.password" clearable show-password></el-input>
        </el-form-item>

        <el-form-item prop="pass" label="新密码">
          <el-input v-model="form.pass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>

        <el-form-item prop="checkPass" label="确认新密码">
          <el-input v-model="form.checkPass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'changePwd',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        pass: '',
        checkPass: ''
      },
      form_rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios
            .post('/api/users/updatePwd', this.form)
            .then(res => {
              this.$message({
                message: '修改成功!请重新登录',
                type: 'success'
              })
              setTimeout(() => {
                sessionStorage.removeItem('storeToken')
                this.$store.dispatch('clearCurrentState')

                // 页面跳转
                this.$router.push('/login')
              }, 2000)
            })
            .catch(err => {
              this.$message({
                message: '修改失败,原密码错误!',
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 1000px;
}
</style>