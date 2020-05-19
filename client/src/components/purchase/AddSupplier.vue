<template>
  <div class="home" v-show="!show">
    <div class="breadcrumb">
      <span>{{ page.title }}</span>
      <el-button type="text" @click="cancel()">返回</el-button>
    </div>

    <div class="container">
      <el-card class="box-card">
        <h2>基本信息</h2>
        <hr
          style="background-color:#e4e4e4;height: 2px;width:997px; border: none;margin:20px auto;"
        />

        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="100px"
          style="width:450px"
        >
          <el-form-item prop="supplierName" label="供应商名称:">
            <el-input v-model="form.supplierName"></el-input>
          </el-form-item>

          <el-form-item prop="coding" label="编码:">
            <el-input v-model="form.coding"></el-input>
          </el-form-item>

          <el-form-item prop="address" label="详细地址:">
            <el-input v-model="form.address"></el-input>
          </el-form-item>

          <h2>财务信息</h2>
          <hr
            style="background-color:#e4e4e4;height: 2px;width:997px; border: none;margin:20px auto;"
          />
          <el-form-item prop="account" label="开户名称:">
            <el-input v-model="form.account"></el-input>
          </el-form-item>

          <el-form-item prop="bank" label="开户银行:">
            <el-input v-model="form.bank"></el-input>
          </el-form-item>

          <el-form-item prop="bankAccount" label="银行账号:">
            <el-input v-model="form.bankAccount"></el-input>
          </el-form-item>

          <h2>联系人信息</h2>
          <hr
            style="background-color:#e4e4e4;height: 2px;width:997px; border: none;margin:20px auto;"
          />
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

          <h2>其他信息</h2>
          <hr
            style="background-color:#e4e4e4;height: 2px;width:997px; border: none;margin:20px auto;"
          />

          <el-form-item prop="remarks" label="备注:"
            ><el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 10 }"
              v-model="form.remarks"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="status" label="状态:">
            <el-radio v-model="form.status" label="true">正常</el-radio>
            <el-radio v-model="form.status" label="false">关闭</el-radio>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('form')"
              >保存</el-button
            >
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addSupplier',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    page: Object,
    form: Object
  },
  data() {
    return {
      isShow: this.show,
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
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据
          const url = this.page.option == 'add' ? 'add' : `edit/${this.form.id}`

          this.$axios.post(`/api/supplier/${url}`, this.form).then(res => {
            // 操作成功
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.$refs.form.resetFields()
            this.show = !this.isShow
            this.$emit('update', true)
          })
        }
      })
    },
    // 取消
    cancel() {
      this.show = !this.isShow
      this.$emit('update', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include breadcrumb;

  @include addContainer;
}
</style>