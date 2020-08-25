<!-- 公用表格组件 -->
<template>
  <el-dialog :title="dialogShow.title" :visible.sync="dialogShow.show">
    <el-table :header-cell-style="{
          background: '#f2f2f2',
          color: '#606266'
        }" ref="refTable" :data="tableData" border :row-key="getRowKey" @selection-change="handleCheckChange" max-height="350" style="width: 100%">
      <el-table-column :reserve-selection="true" type="selection" align="center" width="50">
      </el-table-column>

      <el-table-column prop="coding" align="center" label="编码" width="150">
        <template v-slot="scope">
          <span>{{ scope.row.coding }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="名称" width="200">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="unit" align="center" label="单位" width="50">
        <template v-slot="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="category" align="center" label="类别" width="100" :filters="categoryData" :filter-method="filterTag" filter-placement="bottom-end">
        <template v-slot="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="price" align="center" label="零售价" width="75">
        <template v-slot="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="cost" align="center" label="默认采购价">
        <template v-slot="scope">
          <span>{{ scope.row.cost }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <!-- 分页 -->
      <pagination ref="pagination" @updata="handleTable($event)"></pagination>

      <div class="button">
        <el-button type="primary" @click="submitForm(tableChecked)">添 加</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogTable',
  props: {
    dialogShow: Object,
    selectedId: Array
  },
  data () {
    return {
      tableData: [],
      allTableData: [],
      category: [],
      tableChecked: [],
    }
  },
  created () {
    this.getProfile()
    this.getCate()
  },
  computed: {
    // 筛选功能需要的数据格式
    categoryData: function () {
      let arr = []
      let options = []
      for (let i = 0; i < this.allTableData.length; i++) {
        arr.push(this.allTableData[i].category)
      }
      let filterArr = arr.filter(function (value, index, self) {
        return self.indexOf(value) === index
      })

      for (let index in filterArr) {
        let obj = {
          text: filterArr[index],
          value: filterArr[index]
        }
        options.push(obj)
      }
      return options
    }
  },
  methods: {
    async getCate () {
      const { data: res } = await this.$axios('/api/category')
      this.category = res
    },
    // 获取商品档案数据
    async getProfile () {
      const { data: res } = await this.$axios('/api/file')
      this.setPagination(res)
      this.allTableData = res
      this.dialogOpen()
    },
    // 设置分页数据
    setPagination (val) {
      this.$refs.pagination.setPaginations(val)
    },
    // 接收分页组件处理后的数据
    handleTable (val) {
      this.tableData = val
    },
    // 勾选
    dialogOpen () {
      this.$nextTick(() => {
        this.allTableData.forEach((item, index) => {
          this.$refs.refTable.toggleRowSelection(
            this.allTableData[index],
            this.selectedId.includes(item._id)
          )
        })
      })
    },
    // 类别筛选
    filterTag (value, row) {
      return row.category === value
    },
    //记住复选项
    getRowKey (row) {
      // 指定一个key标识这一行的数据
      return row._id
    },
    // 选中的数据
    handleCheckChange (val) {
      this.tableChecked = val
    },
    // 添加选中的商品
    submitForm (rows) {
      let table = rows
      this.dialogShow.show = false
      this.$emit('update', table)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  overflow: hidden;
  margin-bottom: -20px;
  .button {
    float: right;
    margin-top: 20px;
  }
}
</style>