<template>
  <div class="home">
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
            <el-form-item prop="numbering" label="出库单号:">
              <el-input suffix-icon="xxx" v-model="form.numbering"></el-input>
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
            <el-form-item prop="store" label="出库门店:">
              <el-input suffix-icon="xxx" v-model="form.store"></el-input>
            </el-form-item>
          </div>

          <div>
            <el-form-item prop="type" label="出库类型:">
              <el-select v-model="form.type">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="personnel" label="经办人员:">
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
              label="出库数量"
              width="120"
            >
              <template v-slot="scope">
                <el-input clearable v-model="scope.row.number"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="remarks"
              align="center"
              label="备注"
              width="200"
            >
              <template v-slot="scope">
                <el-input v-model="scope.row.remarks"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="operation"
              align="center"
              label="操作"
              fixed="right"
            >
              <template v-slot="scope">
                <el-button
                  type="text"
                  icon="delete"
                  size="small"
                  @click.native.prevent="
                    onDeleteOutBound(scope.$index, form.table)
                  "
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

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
    <DialogOutBound
      :dialogShow="dialogShow"
      :delTab="selectedId"
      @update="handle($event)"
    ></DialogOutBound>
  </div>
</template>

<script>
const DialogOutBound = () => import('../inventory/DialogOutBound')
export default {
  name: 'addOutBound',
  data() {
    return {
      page: {},
      form: {
        numbering: '',
        audit: '',
        store: '',
        type: '',
        personnel: '',
        remarks: '',
        table: [],
        total: '',
        ordrMakingStf: '',
        auditors: '',
        date: '',
        id: ''
      },
      dialogShow: {
        show: false,
        title: ''
      },
      selectedId: [],
      options: [
        {
          value: '采购退货出库',
          label: '采购退货出库'
        },
        {
          value: '调拨出库',
          label: '调拨出库'
        },
        {
          value: '销售出库',
          label: '销售出库'
        },
        {
          value: '其他出库',
          label: '其他出库'
        }
      ],
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
      form_rules: {
        numbering: [
          { required: true, message: '请输入出库单号', trigger: 'blur' }
        ],
        audit: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        store: [{ required: true, message: '请输入出库门店', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择出库类型', trigger: 'change' }
        ],
        personnel: [
          { required: true, message: '请输入经办人员姓名', trigger: 'blur' }
        ],
        ordrMakingStf: [
          {
            required: true,
            message: '制单人员姓名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    DialogOutBound
  },
  created() {
    this.page = this.$route.query
    if (this.page.option === 'edit') {
      this.getProfile()
    }
    // 默认未审核
    this.form.audit = this.audit[0].value
  },
  methods: {
    getProfile() {
      this.$axios.get(`/api/outbound/${this.$route.query.id}`).then(res => {
        this.form = res.data
      })
    },
    // 获取选中数据的id
    mounted() {
      this.selectedId = []
      for (let item of this.form.table) {
        this.selectedId.push(item._id)
      }
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
    onDeleteOutBound(index, rows) {
      rows.splice(index, 1)
      this.allTableData.splice(index, 1)
    },
    // 接收弹框传递的选中数据
    handle(val) {
      for (let index in val) {
        this.form.table.push(val[index])
      }
    },
    // 自定义合计逻辑
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index !== 4) {
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
        }
      })
      this.form.total = sums[4]
      return sums
    },
    // 提交
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据
          const url =
            this.page.option == 'add' ? 'add' : `edit/${this.form._id}`

          this.$axios
            .post(`/api/outbound/${url}`, this.form)
            .then(res => {
              // 操作成功
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
              this.$router.push('/outbound')
            })
        }
      })
    },
    // 取消
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include breadcrumb;

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