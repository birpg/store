<template>
  <div class="home">
    <div class="breadcrumb">
      <span class="title">{{ this.$route.query.title }}</span>
    </div>

    <el-card class="box-card" shadow="never">
      <div class="ser_add">
        <el-button class="btnRight" type="primary" @click="addCommodity()">选择商品</el-button>
      </div>

      <!-- 表单 -->
      <el-form ref="form" :model="form" :inline="true" :rules="form_rules" label-width="100px">
        <el-form-item prop="numbering" label="入库单号:">
          <el-input suffix-icon="xxx" v-model="form.numbering"></el-input>
        </el-form-item>
        <el-form-item prop="audit" label="审核状态:">
          <el-select v-model="form.audit" placeholder="请选择">
            <el-option label="未审核" value="未审核"></el-option>
            <el-option label="已审核" value="已审核"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="store" label="入库门店:">
          <el-input suffix-icon="xxx" v-model="form.store"></el-input>
        </el-form-item>

        <el-form-item prop="type" label="入库类型:">
          <el-select v-model="form.type">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="personnel" label="经办人员:">
          <el-input suffix-icon="xxx" v-model="form.personnel"></el-input>
        </el-form-item>

        <el-form-item prop="remarks" label="备注:">
          <el-input suffix-icon="xxx" v-model="form.remarks"></el-input>
        </el-form-item>

        <el-form-item prop="ordrMakingStf" label="制单人员:">
          <el-input suffix-icon="xxx" v-model="form.ordrMakingStf"></el-input>
        </el-form-item>

        <el-form-item prop="auditors" label="审核人员:">
          <el-input suffix-icon="xxx" v-model="form.auditors"></el-input>
        </el-form-item>

        <el-form-item prop="date" label="制单日期:">
          <span v-if="this.$route.query.option == 'edit'">
            {{
              form.date | dateFormat
              }}
          </span>
        </el-form-item>

        <!-- 表格 -->
        <el-table :header-cell-style="{ background: '#f2f2f2', color: '#606266' }" :data="form.table" border :summary-method="getSummaries" show-summary max-height="450" style="width: 100%">
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>

          <el-table-column prop="coding" align="center" label="编码" width="150">
            <template v-slot="scope">
              <span>{{ scope.row.coding }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="商品名称" width="250">
            <template v-slot="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="unit" align="center" label="单位" width="100">
            <template v-slot="scope">
              <span>{{ scope.row.unit }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="number" align="center" label="入库数量" width="120">
            <template v-slot="scope">
              <el-input clearable v-model="scope.row.number"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="remarks" align="center" label="备注" width="200">
            <template v-slot="scope">
              <el-input v-model="scope.row.remarks"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="operation" align="center" label="操作" fixed="right">
            <template v-slot="scope">
              <el-button type="text" icon="delete" size="small" @click.native.prevent="
                    onDeleteStorage(scope.$index, form.table)
                  ">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination ref="pagination" @updata="handleTable($event)"></pagination>

        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 弹框页面 -->
    <dialog-table v-if="dialogShow.show" :selectedId="selectedId" :dialogShow="dialogShow" @update="handle($event)"></dialog-table>
  </div>
</template>

<script>
export default {
  name: 'AddStorage',
  data () {
    return {
      form: {},
      allTableData: [],
      options: [
        {
          value: '采购入库',
          label: '采购入库'
        },
        {
          value: '调拨入库',
          label: '调拨入库'
        },
        {
          value: '销售退货入库',
          label: '销售退货入库'
        },
        {
          value: '其他入库',
          label: '其他入库'
        }
      ],
      dialogShow: {
        show: false,
        title: ''
      },
      selectedId: [],
      form_rules: {
        numbering: [
          { required: true, message: '请输入入库单号', trigger: 'blur' }
        ],
        audit: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        store: [{ required: true, message: '请输入入库门店', trigger: 'blur' }],
        type: [
          { required: true, message: '请选择入库类型', trigger: 'change' }
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
  created () {
    if (this.$route.query.option === 'edit') return this.getProfile()
  },
  methods: {
    async getProfile () {
      const { data: res } = await this.$api.getStorageItemApi(this.$route.query.id)
      this.form = res
      this.allTableData = res.table
      this.setPagination(this.form.table)
    },
    // 设置分页数据
    setPagination (val) {
      this.$refs.pagination.setPaginations(val)
    },
    // 接收分页组件处理后的数据
    handleTable (val) {
      this.form.table = val
    },
    // 获取选中数据的id
    getId () {
      // 清空拿最新的id
      this.selectedId = []
      for (let item of this.allTableData) {
        this.selectedId.push(item._id)
      }
    },
    // 接收弹框传递的选中数据
    handle (val) {
      this.allTableData = val
      this.setPagination(val)
    },
    // 添加
    addCommodity () {
      this.getId()
      this.dialogShow = {
        show: true,
        title: '选择商品'
      }
    },
    // 删除
    onDeleteStorage (index, rows) {
      rows.splice(index, 1)
      this.allTableData.splice(index, 1)
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
      this.form.total = sums[4]
      return sums
    },
    // 提交
    submitForm () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        this.form.table = this.allTableData
        //表单数据验证完成之后，提交数据
        const url = this.$route.query.option == 'add' ? 'add' : `edit/${this.form._id}`

        const { data: res } = await this.$api.putStorageItemApi(url,this.form)
        this.$message.success('保存成功！')
        this.cancel()
      })
    },
    // 取消
    cancel () {
      this.$router.push('/storage')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  float: right;
  margin-top: 20px;
}
</style>