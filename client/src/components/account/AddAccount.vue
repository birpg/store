<template>
  <div class="home">
    <div class="breadcrumb">
      <span class="title">{{ page.title }}</span>
    </div>

    <el-card class="box-card" shadow="never">
      <el-form ref="form" :model="form" :rules="form_rules" label-width="100px">
        <h2>基本信息</h2>
        <hr />
        <div style="width:450px">
          <el-form-item prop="coding" label="工号编码:">
            <el-input disabled v-model="form.coding"></el-input>
          </el-form-item>

          <el-form-item prop="name" label="员工姓名:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item v-if="page.option === 'add'" prop="password" label="登录密码:">
            <el-input show-password v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item prop="identity" label="账号角色:">
            <el-select style="width:250px" v-model="form.identity" placeholder="请选择">
              <el-option v-for="item of IdentityData" :key="item.index" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <h2>联系信息</h2>
        <hr />
        <div style="width:450px">
          <el-form-item prop="department" label="部门:">
            <el-select style="width:250px" v-model="form.department" placeholder="请选择">
              <el-option v-for="item of DepartmentData" :key="item.index" :value="item.name"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="position" label="职务:">
            <el-input v-model="form.position"></el-input>
          </el-form-item>

          <el-form-item prop="tel" label="手机:">
            <el-input maxlength="11" show-word-limit clearable v-model="form.tel"></el-input>
          </el-form-item>

          <el-form-item prop="phone" label="电话:">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>

          <el-form-item prop="email" label="邮箱:">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item prop="gender" label="性别:">
            <el-radio v-model="form.gender" label="man">男</el-radio>
            <el-radio v-model="form.gender" label="woman">女</el-radio>
          </el-form-item>

          <el-form-item prop="idCard" label="身份证号:">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>

          <el-form-item prop="address" label="详细地址:">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </div>

        <h2>其他信息</h2>
        <hr />
        <div style="width:450px">
          <el-form-item prop="remarks" label="备注:">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 10 }"
              v-model="form.remarks"
            ></el-input>
          </el-form-item>

          <el-form-item prop="status" label="状态:">
            <el-radio v-model="form.status" label="enable">启用</el-radio>
            <el-radio v-model="form.status" label="disable">禁用</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">保存</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AddAccount',
  data () {
    return {
      page: {},
      form: {},
      DepartmentData: [],
      IdentityData: [],
      form_rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password: [
          { required: false, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        tel: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created () {
    // 判断新增||修改
    this.page = this.$route.query
    if (this.page.option === 'edit') {
      this.form = JSON.parse(this.page.form)
    }
    this.getAll()
  },
  methods: {
    async getDepartment () {
      const { data: res } = await this.$axios('/api/department')
      return res
    },
    async getIdentity () {
      const { data: res } = await this.$axios('/api/identity')
      return res
    },
    getAll () {
      this.$axios.all([this.getDepartment(), this.getIdentity()])
        .then(
          this.$axios.spread((department, identity) => {
            this.DepartmentData = department
            this.IdentityData = identity
          })
        )
        .catch(err => this.$message.error(err.message))
    },
    // 提交用户信息
    submitForm () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const url = this.page.option == 'add' ? 'add' : `edit/${this.form._id}`

        const { data: res } = await this.$axios.post(`/api/users/employee/${url}`, this.form)
        // 操作成功
        this.$message.success('保存成功！')
        this.cancel()
      })
    },
    // 取消
    cancel () {
      this.$router.push('/account')
    }
  }
}
</script>

<style lang="scss" scoped></style>