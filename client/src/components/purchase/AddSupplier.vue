<template>
  <div class="home">
    <div class="breadcrumb">
      <span class="title">{{ page.title }}</span>
    </div>

    <el-card class="box-card" shadow="never">
      <h2>基本信息</h2>
      <hr />

      <el-form ref="form" :model="form" :rules="form_rules" label-width="100px">
        <div style="width:450px">
          <el-form-item prop="supplierName" label="供应商名称:">
            <el-input v-model="form.supplierName"></el-input>
          </el-form-item>

          <el-form-item prop="coding" label="编码:">
            <el-input v-model="form.coding"></el-input>
          </el-form-item>

          <el-form-item prop="address" label="详细地址:">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </div>

        <h2>财务信息</h2>
        <hr />
        <div style="width:450px">
          <el-form-item prop="account" label="开户名称:">
            <el-input v-model="form.account"></el-input>
          </el-form-item>

          <el-form-item prop="bank" label="开户银行:">
            <el-input v-model="form.bank"></el-input>
          </el-form-item>

          <el-form-item prop="bankAccount" label="银行账号:">
            <el-input v-model="form.bankAccount"></el-input>
          </el-form-item>
        </div>

        <h2>联系人信息</h2>
        <hr />
        <div style="width:450px">
          <el-form-item prop="name" label="姓名:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item prop="gender" label="性别:">
            <el-radio v-model="form.gender" label="man">男</el-radio>
            <el-radio v-model="form.gender" label="woman">女</el-radio>
          </el-form-item>

          <el-form-item prop="postiton" label="职务:">
            <el-input v-model="form.postiton"></el-input>
          </el-form-item>

          <el-form-item prop="tel" label="电话:">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>

          <el-form-item prop="email" label="邮箱:">
            <el-input v-model="form.email"></el-input>
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
            <el-radio v-model="form.status" label="true">正常</el-radio>
            <el-radio v-model="form.status" label="false">关闭</el-radio>
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
  name: 'AddSupplier',
  data () {
    return {
      page: {},
      form: {},
      form_rules: {
        supplierName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur' }
        ],
        coding: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        tel: [
          {
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
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
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        //表单数据验证完成之后，提交数据
        const url = this.page.option == 'add' ? 'add' : `edit/${this.form._id}`

        const { data: res } = await this.$axios.post(`/api/supplier/${url}`, this.form)
        // 操作成功
        this.$message.success('保存成功！')
        this.cancel()
      })
    },
    // 取消
    cancel () {
      this.$router.push('/supplier')
    }
  }
}
</script>

<style lang="scss" scoped></style>