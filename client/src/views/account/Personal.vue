<template>
  <div class="home">
    <div class="breadcrumb">
      <span>个人信息</span>
    </div>

    <div class="container">
      <el-card class="box-card" shadow="never">
        <h2>基本信息</h2>
        <hr />

        <el-form ref="form" :model="form" :rules="form_rules" label-width="100px" style="width:440px">
          <el-form-item prop="coding" label="工号编码:">
            <el-input disabled v-model="form.coding"></el-input>
          </el-form-item>

          <el-form-item prop="name" label="员工姓名:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item prop="gender" label="性别:">
            <el-radio v-model="form.gender" label="man">男</el-radio>
            <el-radio v-model="form.gender" label="woman">女</el-radio>
          </el-form-item>

          <el-form-item prop="identity" label="账号角色:">
            <el-select disabled style="width:340px" v-model="form.identity" placeholder="请选择">
              <el-option value="form.identity"></el-option>
            </el-select>
          </el-form-item>

          <h2>联系信息</h2>
          <hr />
          <el-form-item prop="department" label="部门:">
            <el-select disabled style="width:340px" v-model="form.department" placeholder="请选择">
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

          <el-form-item prop="idCard" label="身份证号:">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>

          <el-form-item prop="address" label="详细地址:">
            <el-input v-model="form.address"></el-input>
          </el-form-item>

          <h2>其他信息</h2>
          <hr />
          <el-form-item prop="remarks" label="备注:">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10 }" v-model="form.remarks"></el-input>
          </el-form-item>

          <el-form-item prop="status" label="状态:">
            <el-radio v-model="form.status" disabled label="enable">启用</el-radio>
            <el-radio v-model="form.status" disabled label="disable">禁用</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personal',
  data () {
    return {
      form: {
        coding: '',
        name: '',
        gender: '',
        department: '',
        position: '',
        tel: '',
        phone: '',
        email: '',
        idCard: '',
        address: '',
        remarks: '',
        status: ''
      },
      DepartmentData: [],
      form_rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getProfile()
    this.getDepartment()
  },
  methods: {
    // 获取当前用户信息
    getProfile () {
      this.$api.getUserApi().then(res => {
        this.form = res.data
      })
    },
    // 获取部门信息
    getDepartment () {
      this.$api.getDepartmentApi().then(res => {
          this.DepartmentData = res.data
        })
    },
    // 更新用户信息
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const url = `edit/${this.$store.getters.user.id}`

          this.$api.putUserApi(url,this.form).then(res => {
            // 操作成功
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.getProfile()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
}
</style>