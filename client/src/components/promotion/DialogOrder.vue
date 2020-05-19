<template>
  <div class="logOrder">
    <el-dialog
      :title="dialogShow.title"
      :visible.sync="dialogShow.show"
      @open="dialogOpen"
    >
      <el-table
        :header-cell-style="{
          background: '#f2f2f2',
          color: '#606266'
        }"
        ref="refTable"
        :data="tableData"
        border
        :row-key="getRowKey"
        @selection-change="handleCheckChange"
        max-height="350"
        style="width: 100%"
      >
        <el-table-column
          :reserve-selection="true"
          type="selection"
          align="center"
          width="50"
        >
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

        <el-table-column
          prop="category"
          align="center"
          label="类别"
          width="100"
          :filters="categoryData"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
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

      <div class="btn">
        <div class="button">
          <el-button type="primary" @click="submitForm(tableChecked)">
            添 加
          </el-button>
          <el-button @click="col">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'logOrder',
  props: {
    dialogShow: Object,
    delTab: Array
  },
  data() {
    return {
      tableData: [],
      allTableData: [],
      category: [],
      tableChecked: [],
      table: [],
      selectedId: [],
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
  created() {
    this.getProfile()
    this.mounted()
  },
  computed: {
    // 筛选功能需要的数据格式
    categoryData: function() {
      let arr = []
      let options = []
      for (let i = 0; i < this.allTableData.length; i++) {
        arr.push(this.allTableData[i].category)
      }

      let filterArr = arr.filter(function(value, index, self) {
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
    col() {},
    mounted() {
      // 获取所有商品类别数据
      this.$axios
        .get('/api/category', {
          showLoading: false
        })
        .then(res => {
          this.category = res.data
        })
        .catch(err => {
          this.$message.error('未查到数据!')
        })
    },
    // 获取商品档案数据
    getProfile() {
      this.$axios('/api/file').then(res => {
        this.allTableData = res.data
        // 设置分页数据
        this.setPaginations()
      })
    },
    // 勾选
    dialogOpen() {
      this.$nextTick(() => {
        this.allTableData.forEach((item, index) => {
          this.$refs.refTable.toggleRowSelection(
            this.allTableData[index],
            this.delTab.includes(item._id)
          )
        })
      })
    },
    // 类别筛选
    filterTag(value, row) {
      return row.category === value
    },
    //记住复选项
    getRowKey(row) {
      // 指定一个key标识这一行的数据
      return row._id
    },
    // 选中的数据
    handleCheckChange(val) {
      this.tableChecked = val
    },
    // 添加选中的商品
    submitForm(rows) {
      this.table = rows
      this.dialogShow.show = false
      this.$emit('update', this.table)
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1)
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum
      })
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size
      })
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logOrder {
  overflow: hidden;
  @include pagination;

  .btn {
    margin-top: 20px;
    overflow: hidden;
    .button {
      float: right;
    }
  }
}
</style>