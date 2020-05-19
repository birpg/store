<template>
  <div class="home" v-show="!show">
    <div class="breadcrumb">
      <span>{{ page.title }}</span>
      <el-button type="text" @click="cancel()">返回</el-button>
    </div>

    <div class="container">
      <el-card class="box-card">
        <div class="btn">
          <el-button
            class="choose"
            size="small"
            type="primary"
            @click="addCommodity()"
            >选择商品</el-button
          >
        </div>

        <!-- 表单 -->
        <el-form
          ref="form"
          :model="form"
          :inline="true"
          :rules="form_rules"
          label-width="100px"
        >
          <div>
            <el-form-item prop="purchaseNumber" label="采购单号:">
              <el-input
                suffix-icon="xxx"
                v-model="form.purchaseNumber"
              ></el-input>
            </el-form-item>
            <el-form-item prop="audit" label="审核状态:">
              <el-select v-model="form.audit" placeholder="请选择">
                <el-option
                  v-for="item in audit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="store" label="采购门店:">
              <el-input suffix-icon="xxx" v-model="form.store"></el-input>
            </el-form-item>
          </div>

          <div>
            <el-form-item prop="supplier" label="供应商:">
              <el-select v-model="form.supplier" placeholder="请选择供应商">
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.supplierName"
                  :value="item.supplierName"
                  :disabled="!JSON.parse(item.status)"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="personnel" label="采购人员:">
              <el-input suffix-icon="xxx" v-model="form.personnel"></el-input>
            </el-form-item>

            <el-form-item prop="remarks" label="备注:">
              <el-input suffix-icon="xxx" v-model="form.remarks"></el-input>
            </el-form-item>
          </div>

          <!-- 表格 -->
          <el-table
            :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
            :data="form.table"
            border
            :summary-method="getSummaries"
            show-summary
            max-height="450"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            >
            </el-table-column>

            <el-table-column
              prop="coding"
              align="center"
              label="编码"
              width="150"
            >
              <template v-slot="scope">
                <span>{{ scope.row.coding }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="商品名称"
              width="250"
            >
              <template v-slot="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="unit"
              align="center"
              label="单位"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.unit }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="number"
              align="center"
              label="采购数量"
              width="120"
            >
              <template v-slot="scope">
                <el-input
                  @input="num()"
                  clearable
                  v-model="scope.row.number"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="cost"
              align="center"
              label="采购单价"
              width="120"
            >
              <template v-slot="scope">
                <span>{{ scope.row.cost }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="subtotal"
              align="center"
              label="小计金额"
              width="120"
            >
              <template v-slot="scope">
                <span>{{ scope.row.subtotal }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="operation"
              align="center"
              label="操作"
              fixed="right"
              width="80"
            >
              <template v-slot="scope">
                <el-button
                  type="text"
                  icon="delete"
                  size="small"
                  @click.native.prevent="
                    onDeletePurchase(scope.$index, form.table)
                  "
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-row>
            <el-col :span="24">
              <div class="pagination">
                <el-pagination
                  v-if="paginations.total > 0"
                  :page-sizes="paginations.page_sizes"
                  :page-size="paginations.page_size"
                  :layout="paginations.layout"
                  :total="paginations.total"
                  :current-page.sync="paginations.page_index"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                >
                </el-pagination>
              </div>
            </el-col>
          </el-row>

          <div class="foot">
            <el-form-item prop="ordrMakingStf" label="制单人员:">
              <el-input
                suffix-icon="xxx"
                v-model="form.ordrMakingStf"
              ></el-input>
            </el-form-item>

            <el-form-item prop="auditors" label="审核人员:">
              <el-input suffix-icon="xxx" v-model="form.auditors"></el-input>
            </el-form-item>

            <el-form-item prop="date" label="制单日期:">
              <span v-if="this.page.option == 'edit'">{{
                form.date | dateFormat
              }}</span>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitForm('form')"
              >保存</el-button
            >
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 弹框页面 -->
    <DialogPurchase
      :dialogShow="dialogShow"
      :delTab="selectedId"
      @update="handle($event)"
    ></DialogPurchase>
  </div>
</template>

<script>
const DialogPurchase = () => import('./DialogPurchase')
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
      allTableData: [],
      options: [],
      selectedId: [],
      audit: [
        {
          value: '未审核',
          label: '未审核'
        },
        {
          value: '已审核',
          label: '已审核'
        }
      ],
      dialogShow: {
        show: false,
        title: ''
      },
      isShow: this.show,
      form_rules: {
        purchaseNumber: [
          { required: true, message: '请输入采购单号', trigger: 'blur' }
        ],
        audit: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        store: [{ required: true, message: '请输入采购门店', trigger: 'blur' }],
        supplier: [
          { required: true, message: '请选择供应商', trigger: 'blur' }
        ],
        personnel: [
          { required: true, message: '请输入采购人员姓名', trigger: 'change' }
        ],
        ordrMakingStf: [
          {
            required: true,
            message: '制单人员姓名',
            trigger: 'blur'
          }
        ]
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      }
    }
  },
  components: {
    DialogPurchase
  },
  created() {
    this.getProfile()
    // 默认未审核
    this.form.audit = this.audit[0].value
  },
  methods: {
    // 获取选中数据的id
    mounted() {
      this.selectedId = []
      for (let item of this.form.table) {
        this.selectedId.push(item._id)
      }
    },
    // 监听商品数量
    num() {
      let arr = this.form.table
      for (let index in arr) {
        arr[index].subtotal = arr[index].number * arr[index].cost
      }
    },
    // 获取供应商数据
    getProfile() {
      this.$axios('/api/supplier', {
        showLoading: false
      }).then(res => {
        this.options = res.data
      })
    },
    // 添加
    addCommodity() {
      this.mounted()
      this.dialogShow = {
        show: true,
        title: '选择商品'
      }
    },
    // 删除
    onDeletePurchase(index, rows) {
      rows.splice(index, 1)
      this.allTableData.splice(index, 1)
    },
    // 接收弹框传递的选中数据
    handle(val) {
      this.allTableData = val
      this.setPaginations()
    },
    // 自定义合计逻辑
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index === 1) {
          sums[index] = 'N/A'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          if (index === 4) {
            sums[index] += ''
            return
          }
          sums[index] += '元'
        } else {
          sums[index] = 'N/A'
        }
      })
      this.form.total = sums[6]
      return sums
    },
    // 提交
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据
          const url = this.page.option == 'add' ? 'add' : `edit/${this.form.id}`

          this.$axios
            .post(`/api/purchase/${url}`, this.form)
            .then(res => {
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
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1)
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum
      })
      // 设置默认分页数据
      this.form.table = table.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.form.table = this.allTableData.filter((item, index) => {
        return index < page_size
      })
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 设置默认分页数据
      this.form.table = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include breadcrumb;
  @include pagination;

  .btn {
    overflow: hidden;
    padding-bottom: 20px;

    .choose {
      float: right;
    }
  }

  @include addContainer;
  .foot {
    padding: 20px 0;
  }
}
</style>