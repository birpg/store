<template>
  <div class="home">
    <div class="breadcrumb">
      <span>{{ page.title }}</span>
      <el-button
        type="text"
        @click="cancel()"
      >返回</el-button>
    </div>

    <div class="container">
      <el-card class="box-card">
        <!-- 表单 -->
        <el-form
          ref="form"
          :model="form"
          :inline="true"
          :rules="form_rules"
          label-width="100px"
        >
          <h2>促销配置</h2>
          <hr style="background-color:#e4e4e4;height: 2px;border: none;margin:20px auto;" />
          <el-form-item
            prop="coding"
            label="促销编码:"
          >
            <el-input
              suffix-icon="xxx"
              v-model="form.coding"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="store"
            label="促销门店:"
          >
            <el-input
              suffix-icon="xxx"
              v-model="form.store"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="promDt"
            label="促销日期:"
          >
            <el-date-picker
              v-model="form.promDt"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            prop="promTm"
            label="促销时间:"
          >
            <el-time-picker
              is-range
              arrow-control
              v-model="form.promTm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>

          <el-form-item
            prop="cycle"
            label="促销周期:"
          >
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group
              v-model="form.cycle"
              @change="handleCheckedCycleChange"
            >
              <el-checkbox
                v-for="cycle in cycles"
                :label="cycle"
                :key="cycle"
              >{{ cycle }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="促销规则:">
            <el-tabs
              v-model="activeName"
              type="card"
            >
              <el-tab-pane
                label="减满"
                name="first"
              >
                <el-form-item
                  v-for="(item, index) in form.full"
                  :key="item.key"
                  style="padding-top:20px"
                >
                  订单满
                  <el-input
                    style="width:80px"
                    v-model="form.full[index].num1"
                  ></el-input>
                  立减
                  <el-input
                    style="width:80px"
                    v-model="form.full[index].num2"
                  ></el-input>
                  元
                  <el-button @click.prevent="removeItem(item, 'full')">删除</el-button>
                </el-form-item>
                <el-button
                  class="addRule"
                  type="primary"
                  @click="addItem('full')"
                >新 增</el-button>
              </el-tab-pane>
              <el-tab-pane
                label="折扣"
                name="second"
              >
                <el-form-item
                  v-for="(item, index) in form.discount"
                  :key="item.key"
                  style="padding-top:20px"
                >
                  订单满
                  <el-input
                    style="width:80px"
                    v-model="form.discount[index].num1"
                  ></el-input>
                  尊享
                  <el-input
                    style="width:80px"
                    v-model="form.discount[index].num2"
                  ></el-input>
                  折
                  <el-button @click.prevent="removeItem(item, 'discount')">删除</el-button>
                </el-form-item>
                <el-button
                  class="addRule"
                  type="primary"
                  @click="addItem('discount')"
                >新增</el-button>
              </el-tab-pane>
              <el-tab-pane
                label="赠送"
                name="third"
              >
                <el-form-item
                  v-for="(item, index) in form.handsel"
                  :key="item.key"
                  style="padding-top:20px"
                >
                  订单满
                  <el-input
                    style="width:80px"
                    v-model="form.handsel[index].num1"
                  ></el-input>
                  赠送
                  <el-input
                    style="width:80px"
                    v-model="form.handsel[index].num2"
                  ></el-input>
                  积分
                  <el-button @click.prevent="removeItem(item, 'handsel')">删除</el-button>
                </el-form-item>
                <el-button
                  class="addRule"
                  type="primary"
                  @click="addItem('handsel')"
                >新增</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>

          <el-form-item
            prop="personnel"
            label="经办人员:"
          >
            <el-input
              suffix-icon="xxx"
              v-model="form.personnel"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="remarks"
            label="备注:"
          >
            <el-input
              suffix-icon="xxx"
              v-model="form.remarks"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="audit"
            label="审核状态:"
          >
            <el-select
              v-model="form.audit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in audit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <div class="btn">
            <h2 style="display: inline;line-height: 32px;">促销商品</h2>

            <el-button
              class="choose"
              size="small"
              type="primary"
              @click="addCommodity()"
            >选择商品</el-button>
          </div>
          <hr style="background-color:#e4e4e4;height: 2px;border: none;margin:20px auto;" />

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
              width="100"
            >
            </el-table-column>

            <el-table-column
              prop="coding"
              align="center"
              label="编码"
              width="200"
            >
              <template v-slot="scope">
                <span>{{ scope.row.coding }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="商品名称"
              width="400"
            >
              <template v-slot="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="unit"
              align="center"
              label="单位"
              width="150"
            >
              <template v-slot="scope">
                <span>{{ scope.row.unit }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="operation"
              align="center"
              label="操作"
              fixed="right"
              width="140"
            >
              <template v-slot="scope">
                <el-button
                  type="text"
                  icon="delete"
                  size="small"
                  @click.native.prevent="
                    onDeleteOrder(scope.$index, form.table)
                  "
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="foot">
            <el-form-item
              prop="ordrMakingStf"
              label="制单人员:"
            >
              <el-input
                suffix-icon="xxx"
                v-model="form.ordrMakingStf"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="auditors"
              label="审核人员:"
            >
              <el-input
                suffix-icon="xxx"
                v-model="form.auditors"
              ></el-input>
            </el-form-item>

            <el-form-item
              prop="date"
              label="制单日期:"
            >
              <span v-if="this.page.option == 'edit'">{{
                form.date | dateFormat
              }}</span>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('form')"
            >保存</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 弹框页面 -->
    <DialogOrder
      :dialogShow="dialogShow"
      :delTab="selectedId"
      @update="handle($event)"
    ></DialogOrder>
  </div>
</template>

<script>
const DialogOrder = () => import('../promotion/DialogOrder')
export default {
  name: 'addOrder',
  data () {
    return {
      page: {},
      checkAll: false,
      cycles: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      isIndeterminate: false,
      activeName: 'first',
      form: {
        coding: '',
        store: '',
        promDt: [],
        promTm: '',
        cycle: [],
        full: [{ num1: '', num2: '' }],
        discount: [{ num1: '', num2: '' }],
        handsel: [{ num1: '', num2: '' }],
        personnel: '',
        remarks: '',
        audit: '',
        table: [],
        ordrMakingStf: '',
        auditors: '',
        auditDate: '',
        date: ''
      },
      dialogShow: {
        show: false,
        title: ''
      },
      selectedId: [],
      audit: [
        {
          value: '未审核'
        },
        {
          value: '已审核'
        }
      ],
      form_rules: {
        coding: [
          { required: true, message: '请输入促销编码', trigger: 'blur' }
        ],
        store: [{ required: true, message: '请输入促销门店', trigger: 'blur' }],
        promDt: [
          { required: true, message: '请选择促销日期', trigger: 'change' }
        ],
        promTm: [
          { required: true, message: '请选择促销时间', trigger: 'change' }
        ],
        cycle: [
          {
            type: 'array',
            required: true,
            message: '请选择活动周期',
            trigger: 'change'
          }
        ],
        ordrMakingStf: [
          {
            required: true,
            message: '请输入制单人员姓名',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    DialogOrder
  },
  created () {
    this.page = this.$route.query
    if (this.page.option === 'edit') {
      this.getProfile()
    }
    // 默认未审核
    this.form.audit = this.audit[0].value
  },
  methods: {
    // 删除促销规则
    removeItem (item, name) {
      switch (name) {
        case 'full':
          let index = this.form.full.indexOf(item)
          if (index !== -1) {
            this.form.full.splice(index, 1)
          }
          break
        case 'discount':
          let i = this.form.discount.indexOf(item)
          if (i !== -1) {
            this.form.discount.splice(i, 1)
          }
          break
        default:
          let j = this.form.handsel.indexOf(item)
          if (j !== -1) {
            this.form.handsel.splice(j, 1)
          }
      }
    },
    // 添加促销规则
    addItem (item) {
      switch (item) {
        case 'full':
          this.form.full.push({
            num1: '',
            num2: '',
            key: Date.now()
          })
          break
        case 'discount':
          this.form.discount.push({
            num1: '',
            num2: '',
            key: Date.now()
          })
          break
        default:
          this.form.handsel.push({
            num1: '',
            num2: '',
            key: Date.now()
          })
      }
    },
    handleCheckAllChange (val) {
      this.form.cycle = val ? this.cycles : []
      this.isIndeterminate = false
    },
    handleCheckedCycleChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cycles.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cycles.length
    },
    // 获取数据
    getProfile () {
      this.$axios.get(`/api/order/${this.$route.query.id}`).then(res => {
        this.form = res.data
      })
    },
    // 获取选中数据的id
    mounted () {
      this.selectedId = []
      for (let item of this.form.table) {
        this.selectedId.push(item._id)
      }
    },
    // 添加
    addCommodity () {
      this.mounted()
      this.dialogShow = {
        show: true,
        title: '选择商品'
      }
    },
    // 删除
    onDeleteOrder (index, rows) {
      rows.splice(index, 1)
      this.allTableData.splice(index, 1)
    },
    // 接收弹框传递的选中数据
    handle (val) {
      for (let index in val) {
        this.form.table.push(val[index])
      }
    },
    // 自定义合计逻辑
    getSummaries (param) {
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
      return sums
    },
    // 提交
    submitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据
          const url =
            this.page.option == 'add' ? 'add' : `edit/${this.form._id}`
          if (this.form.audit == '已审核' && this.form.auditors != '') {
            this.form.auditDate = new Date()
          }
          this.$axios
            .post(`/api/order/${url}`, this.form)
            .then(res => {
              // 操作成功
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
              this.$router.push('/order')
            })
        }
      })
    },
    // 取消
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include breadcrumb;

  .el-form-item {
    display: block;
  }
  .addRule {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: 200px;
    margin-top: 20px;
  }
  .btn {
    overflow: hidden;
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