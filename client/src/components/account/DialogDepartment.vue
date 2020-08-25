<template>
  <div class="logDepartment">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="true"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="dialog.form"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item prop="coding" label="编码:">
            <el-input type="coding" v-model="dialog.form.coding"></el-input>
          </el-form-item>

          <el-form-item prop="name" label="名称:">
            <el-input type="name" v-model="dialog.form.name" @keyup.enter.native="submitForm()"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submitForm()">保 存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'logDepartment',
  props: {
    dialog: Object
  },
  data () {
    return {
      form_rules: {
        coding: [
          { required: true, message: '编码不能为空！', trigger: 'blur' }
        ],
        name: [{ required: true, message: '名称不能为空！', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(valid => {
        if (!valid) return
        //表单数据验证完成之后，提交数据
        const url =
          this.dialog.option == 'add' ? 'add' : `edit/${this.dialog.form.id}`

        this.$axios.post(`/api/department/${url}`, this.dialog.form).then(res => {
          // 操作成功
          this.$message.success('保存成功！')
          this.dialog.show = false
          this.$emit('update')
        })
      })
    },
    closeDialog () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    }
  }
}
</script>

