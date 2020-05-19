<template>
  <div class="home">
    <router-view></router-view>
    <div v-show="this.$route.meta.show">
      <div class="breadcrumb">
        <span>订单促销</span>
      </div>

      <div class="container">
        <el-card class="box-card">
          <!-- 搜索和添加 -->
          <div class="search">
            <el-input
              style="width: 250px"
              v-model="search"
              clearable
              placeholder="请输入促销编码"
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
              @click="onAddOrder"
              >新增</el-button
            >
          </div>

          <!-- 表内容 -->
          <el-table
            :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
            :data="tableData"
            border
            max-height="450"
            style="width: 100%"
          >
            <el-table-column
              prop="coding "
              align="center"
              label="促销编码"
              width="150"
            >
              <template v-slot="scope">
                <span>{{ scope.row.coding }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="store"
              align="center"
              label="促销门店"
              width="200"
            >
              <template v-slot="scope">
                <span>{{ scope.row.store }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="promDt"
              align="center"
              label="促销日期"
              width="200"
            >
              <template v-slot="scope">
                <span>{{ scope.row.promDt | dateFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="personnel"
              align="center"
              label="制单人员"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.personnel }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="auditDate"
              align="center"
              label="审核日期"
              width="200"
            >
              <template v-slot="scope">
                <span>{{ scope.row.auditDate | dateFormat }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="audit"
              align="center"
              label="审核状态"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.audit }}</span>
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
                  icon="edit"
                  size="small"
                  @click="onEditOrder(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  icon="delete"
                  size="small"
                  @click="onDeleteOrder(scope.row, scope.$index)"
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
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order',
  data() {
    return {
      tableData: [],
      allTableData: [],
      search: '',
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
  watch: {
    search: function(val) {
      if (val == '') return this.getProfile()
    },
    $route: function() {
      if (this.$route.meta.show) {
        this.getProfile()
      }
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      // 获取数据
      this.$axios('/api/order').then(res => {
        this.allTableData = res.data
        // 设置分页数据
        this.setPaginations()
      })
    },
    // 搜索
    onSearch() {
      let items = this.allTableData.find(
        item => item.numbering == this.search || item.name == this.search
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
    onAddOrder() {
      // 添加
      this.$router.push({
        path: '/order/addOrder',
        query: {
          title: '新增促销单',
          option: 'add'
        }
      })
    },
    onEditOrder(row) {
      // 编辑
      this.$router.push({
        path: '/order/addOrder',
        query: {
          title: '修改促销单',
          option: 'edit',
          id: row._id
        }
      })
    },
    onDeleteOrder(row, index) {
      // 删除
      this.$axios.delete(`/api/order/delete/${row._id}`).then(res => {
        this.$message('删除成功')
        this.getProfile()
      })
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

  @include pagination;
}
</style>