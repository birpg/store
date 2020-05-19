<template>
  <div class="home">
    <AddFile
      :show="isShow"
      :page="page"
      :form="form"
      @update="handle($event)"
    ></AddFile>

    <div v-show="isShow">
      <div class="breadcrumb">
        <span>商品档案</span>
      </div>

      <div class="container">
        <el-card class="box-card">
          <!-- 搜索和添加 -->
          <div class="search">
            <el-input
              style="width: 250px"
              v-model="search"
              clearable
              placeholder="请输入编码/商品名称"
              @keyup.enter.native="onSearch()"
            >
              <el-button
                @click="onSearch()"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>

            <el-button
              class="btnRight"
              type="primary"
              size="small"
              icon="view"
              @click="onAddFile()"
              >新增</el-button
            >
            <el-button
              class="btnLeft"
              type="danger"
              size="small"
              icon="view"
              @click="onDelFile(tableChecked)"
              >批量删除</el-button
            >
          </div>

          <!-- 表内容 -->
          <el-table
            :header-cell-style="{
              background: '#f2f2f2',
              color: '#606266'
            }"
            :data="tableData"
            border
            :row-key="getRowKey"
            @selection-change="handleCheckChange"
            max-height="450"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              align="center"
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
              label="名称"
              width="220"
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

            <el-table-column
              prop="price"
              align="center"
              label="零售价"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.price }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="lowest"
              align="center"
              label="最低销售价"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.lowest }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="guidePrice"
              align="center"
              label="市场指导价"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.guidePrice }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="cost"
              align="center"
              label="成本参考"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.cost }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="operation"
              align="center"
              label="操作"
              fixed="right"
            >
              <template v-slot="scope">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      ><el-button type="text" @click="onEditFile(scope.row)"
                        >修改</el-button
                      ></el-dropdown-item
                    >
                    <el-dropdown-item
                      ><el-button
                        type="text"
                        @click="onDeleteFile(scope.row, scope.$index)"
                        >删除</el-button
                      ></el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
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
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
const AddFile = () => import('../../components/commodity/AddFile')
export default {
  name: 'file',
  data() {
    return {
      tableData: [],
      allTableData: [],
      tableChecked: [],
      idArr: [],
      search: '',
      isShow: true,
      page: {
        title: '',
        option: ''
      },
      form: {
        category: '',
        coding: '',
        name: '',
        brand: '',
        unit: '',
        price: '',
        lowest: '',
        guidePrice: '',
        cost: '',
        id: ''
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
  computed: {
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
  watch: {
    search: function(val) {
      if (val == '') return this.getProfile()
    }
  },
  components: {
    AddFile
  },
  created() {
    this.getProfile()
  },
  methods: {
    handle(val) {
      this.isShow = val
      this.getProfile()
    },
    // 获取数据
    getProfile() {
      this.$axios('/api/file').then(res => {
        this.allTableData = res.data

        // 设置分页数据
        this.setPaginations()
      })
    },
    // 搜索
    onSearch() {
      let items = this.allTableData.find(
        item => item.coding == this.search || item.name == this.search
      )
      if (items) {
        let temp = this.allTableData
        this.allTableData = [items]
        this.setPaginations()
        this.allTableData = temp
      } else {
        this.$message.warning('没有该数据')
        this.getProfile()
      }
    },
    filterTag(value, row) {
      return row.category === value
    },
    // 添加
    onAddFile() {
      this.isShow = false
      this.page = {
        title: '新增商品',
        option: 'add'
      }
    },
    // 编辑
    onEditFile(row) {
      this.isShow = false
      this.page = {
        title: '修改商品',
        option: 'edit'
      }
      this.form = {
        category: row.category,
        coding: row.coding,
        name: row.name,
        brand: row.brand,
        unit: row.unit,
        price: row.price,
        lowest: row.lowest,
        guidePrice: row.guidePrice,
        cost: row.cost,
        id: row._id
      }
    },
    handleCheckChange(val) {
      this.tableChecked = val
    },
    // 批量删除
    onDelFile(rows) {
      rows.forEach(item => {
        this.idArr.push(item._id)
      })
      this.idArr = Array.from(new Set(this.idArr))
      this.$axios
        .delete(`/api/file/deleteAllSelected/${this.idArr}`)
        .then(res => {
          this.$message('删除成功')
          this.getProfile()
        })
        .catch(err => {
          this.$message.error('删除失败!')
        })
    },
    // 删除
    onDeleteFile(row, index) {
      this.$axios
        .delete(`/api/file/delete/${row._id}`)
        .then(res => {
          this.$message('删除成功')
          this.getProfile()
        })
        .catch(err => {
          this.$message.error('删除失败!')
        })
    },
    //记住复选
    getRowKey(row) {
      // 指定一个key标识这一行的数据
      return row._id
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
.home {
  @include breadcrumb;

  @include container;

  .btnLeft {
    float: right;
    margin-right: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  @include pagination;
}
</style>