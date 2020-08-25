<template>
  <div class="home">
    <router-view />
    <div v-show="this.$route.meta.show">
      <div class="breadcrumb">
        <span class="title">商品档案</span>
      </div>

      <el-card class="box-card" shadow="never">
        <!-- 搜索和添加 -->
        <div class="ser_add">
          <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>
          <el-button class="btnRight" type="primary" @click="onAddFile()">新增</el-button>
          <el-button class="btnLeft" type="danger" @click="onDelFile(tableChecked)">批量删除</el-button>
        </div>

        <!-- 表内容 -->
        <el-table :header-cell-style="{
              background: '#f2f2f2',
              color: '#606266'
            }" :data="tableData" border :row-key="getRowKey" @selection-change="handleCheckChange">
          <el-table-column type="selection" :reserve-selection="true" align="center" min-width="50"></el-table-column>

          <el-table-column prop="coding" align="center" label="编码" min-width="150">
            <template v-slot="scope">
              <span>{{ scope.row.coding }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" align="center" label="名称" min-width="220">
            <template v-slot="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="unit" align="center" label="单位" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.unit }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="category" align="center" label="类别" min-width="100" :filters="categoryData" :filter-method="filterTag" filter-placement="bottom-end">
            <template v-slot="scope">
              <span>{{ scope.row.category }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="price" align="center" label="零售价" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="lowest" align="center" label="最低销售价" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.lowest }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="guidePrice" align="center" label="市场指导价" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.guidePrice }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="cost" align="center" label="成本参考" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.cost }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="operation" align="center" label="操作" fixed="right">
            <template v-slot="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="onEditFile(scope.row)">修改</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="onDeleteFile(scope.row, scope.$index)">删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination ref="pagination" @updata="handleTable($event)"></pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
const AddFile = () => import('../../components/commodity/AddFile')
export default {
  name: 'File',
  data () {
    return {
      tableData: [],
      allTableData: [],
      tableChecked: [],
      idArr: [],
    }
  },
  computed: {
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
  components: {
    AddFile
  },
  watch: {
    $route: function () {
      if (this.$route.meta.show) {
        this.getProfile()
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    // 获取数据
    async getProfile () {
      const { data: res } = await this.$axios('/api/file')
      this.setPagination(res)
      this.allTableData = res
    },
    // 设置分页数据
    setPagination (val) {
      this.$refs.pagination.setPaginations(val)
    },
    // 接收分页组件处理后的数据
    handleTable (val) {
      this.tableData = val
    },
    // 添加
    onAddFile () {
      this.$router.push({
        name: 'AddFile',
        params: {
          title: '新增商品',
          option: 'add',
        }
      })
    },
    // 编辑
    onEditFile (row) {
      this.$router.push({
        name: 'AddFile',
        params: {
          title: '修改商品',
          option: 'edit',
          form: row
        }
      })
    },
    // 批量删除
    async onDelFile (rows) {
      if (rows.length === 0) return this.$message.error('请至少选中一项!')

      rows.forEach(item => {
        this.idArr.push(item._id)
      })
      this.idArr = Array.from(new Set(this.idArr))
      const { data: res } = await this.$axios
        .delete(`/api/file/deleteAllSelected/${this.idArr}`)
      this.$message('删除成功')
      this.getProfile()
    },
    // 删除
    async onDeleteFile (row, index) {
      const { data: res } = await this.$axios
        .delete(`/api/file/delete/${row._id}`)
      this.$message('删除成功')
      this.getProfile()
    },
    // 筛选
    filterTag (value, row) {
      return row.category === value
    },
    // 复选的数据
    handleCheckChange (val) {
      this.tableChecked = val
    },
    //记住复选
    getRowKey (row) {
      // 指定一个key标识这一行的数据
      return row._id
    },
  }
}
</script>

<style lang="scss" scoped>
.home {
  .btnLeft {
    float: right;
    margin-right: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>