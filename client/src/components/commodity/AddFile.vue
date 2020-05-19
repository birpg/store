<template>
  <div class="home" v-show="!show">
    <div class="breadcrumb">
      <span>{{ page.title }}</span>
      <el-button type="text" @click="cancel()">返回</el-button>
    </div>

    <div class="container">
      <el-card class="box-card">
        <h2>基本配置</h2>
        <hr
          style="background-color:#e4e4e4;height: 2px;border: none;margin:20px auto;"
        />

        <el-form
          ref="form"
          :model="form"
          :rules="form_rules"
          label-width="100px"
          style="width:350px"
        >
          <el-form-item prop="category" label="商品类别:">
            <el-select
              style="width:250px"
              v-model="form.category"
              placeholder="请选择"
            >
              <el-option
                v-for="item of categoryData"
                :key="item.index"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="coding" label="商品编码:">
            <el-input v-model="form.coding"></el-input>
          </el-form-item>

          <el-form-item prop="name" label="商品名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="brand" label="所属品牌:">
            <el-select
              style="width:250px"
              v-model="form.brand"
              placeholder="请选择"
            >
              <el-option
                v-for="item of brandData"
                :key="item.index"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="unit" label="单位:">
            <el-select
              style="width:250px"
              v-model="form.unit"
              placeholder="请选择"
            >
              <el-option
                v-for="item of unitData"
                :key="item.index"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="price" label="零售价:">
            <el-input v-model="form.price"></el-input>
          </el-form-item>

          <el-form-item prop="lowest" label="最低销售价:">
            <el-input v-model="form.lowest"></el-input>
          </el-form-item>

          <el-form-item prop="guidePrice" label="市场指导价:">
            <el-input v-model="form.guidePrice"></el-input>
          </el-form-item>

          <el-form-item prop="cost" label="成本参考价:">
            <el-input v-model="form.cost"></el-input>
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
  name: 'addFile',
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
      categoryData: [],
      brandData: [],
      unitData: [],
      form_rules: {
        category: [
          { required: true, message: '请选则商品类型', trigger: 'change' }
        ],
        coding: [
          {
            required: true,
            message: '请输入商品编码',
            trigger: 'blur'
          }
        ],
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        brand: [
          { required: true, message: '请选则所属品牌', trigger: 'change' }
        ],
        unit: [
          { required: true, message: '请选则商品单位', trigger: 'change' }
        ],
        price: [
          {
            required: true,
            message: '请输入零售价',
            trigger: 'blur'
          }
        ],
        lowest: [
          {
            required: true,
            message: '请输入最低销售价',
            trigger: 'blur'
          }
        ],
        guidePrice: [
          {
            required: true,
            message: '请输入市场指导价',
            trigger: 'blur'
          }
        ],
        cost: [
          {
            required: true,
            message: '请输入成本参考价',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.mounted()
  },
  methods: {
    getCategoryOptions() {
      return this.$axios.get('/api/category', {
        showLoading: false
      })
    },
    getBrandOptions() {
      return this.$axios.get('/api/brand', {
        showLoading: false
      })
    },
    getUnitOptions() {
      return this.$axios.get('/api/unit', {
        showLoading: false
      })
    },
    // 获取选择器选项数据
    mounted() {
      this.$axios
        .all([
          this.getCategoryOptions(),
          this.getBrandOptions(),
          this.getUnitOptions()
        ])
        .then(
          this.$axios.spread((category, brand, unit) => {
            this.categoryData = category.data
            this.brandData = brand.data
            this.unitData = unit.data
          })
        )
        .catch(err => {
          this.$message.error('未查到数据!')
        })
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据
          const url = this.page.option == 'add' ? 'add' : `edit/${this.form.id}`

          this.$axios.post(`/api/file/${url}`, this.form).then(res => {
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