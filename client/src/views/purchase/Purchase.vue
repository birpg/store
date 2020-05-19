<template>
  <div class="home">
    <AddPurchase
      :show="isShow"
      :page="page"
      :form="form"
      @update="handle($event)"
    ></AddPurchase>

    <div v-show="isShow">
      <div class="breadcrumb">
        <span>采购单</span>
      </div>

      <div class="container">
        <el-card class="box-card">
          <!-- 搜索和添加 -->
          <div class="search">
            <el-input
              style="width: 250px"
              v-model="search"
              clearable
              placeholder="请输入采购单号"
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
              @click="onAddPurchase()"
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
              prop="purchaseNumber"
              align="center"
              label="采购单号"
              width="150"
            >
              <template v-slot="scope">
                <span>{{ scope.row.purchaseNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="supplier"
              align="center"
              label="供应商"
              width="200"
            >
              <template v-slot="scope">
                <span>{{ scope.row.supplier }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="total"
              align="center"
              label="采购金额"
              width="120"
            >
              <template v-slot="scope">
                <span>{{ scope.row.total }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="personnel"
              align="center"
              label="采购人员"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.personnel }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="ordrMakingStf"
              align="center"
              label="制单人员"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.ordrMakingStf }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="date "
              align="center"
              label="制单日期"
              width="200"
            >
              <template v-slot="scope">
                <span>{{ scope.row.date | dateFormat }}</span>
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
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      ><el-button type="text" @click="onEditPurchase(scope.row)"
                        >修改</el-button
                      ></el-dropdown-item
                    >
                    <el-dropdown-item
                      ><el-button
                        type="text"
                        @click="onDeletePurchase(scope.row, scope.$index)"
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
const AddPurchase = () => import('../../components/purchase/AddPurchase')
export default {
  name: 'purchase',
  data() {
    return {
      tableData: [],
      allTableData: [],
      search: '',
      isShow: true,
      page: {
        title: '',
        option: ''
      },
      form: {
        purchaseNumber: '',
        audit: '',
        store: '',
        supplier: '',
        personnel: '',
        remarks: '',
        table: [
          {
            coding: '',
            name: '',
            unit: '',
            number: '',
            cost: '',
            subtotal: ''
          }
        ],
        total: '',
        ordrMakingStf: '',
        auditors: '',
        date: '',
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
  watch: {
    search: function(val) {
      if (val == '') return this.getProfile()
    }
  },
  components: {
    AddPurchase
  },
  created() {
    this.getProfile()
  },
  methods: {
    // 接收子组件传递的参数
    handle(val) {
      this.isShow = val
      this.getProfile()
    },
    getProfile() {
      // 获取数据
      this.$axios('/api/purchase').then(res => {
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
    onAddPurchase() {
      // 添加
      this.isShow = false
      this.page = {
        title: '新增采购单',
        option: 'add'
      }
    },
    onEditPurchase(row) {
      // 编辑
      this.isShow = false
      this.page = {
        title: '编辑采购单',
        option: 'edit'
      }
      this.form = {
        purchaseNumber: row.purchaseNumber,
        audit: row.audit,
        store: row.store,
        supplier: row.supplier,
        personnel: row.personnel,
        remarks: row.remarks,
        table: row.table,
        total: row.total,
        ordrMakingStf: row.ordrMakingStf,
        auditors: row.auditors,
        date: row.date,
        id: row._id
      }
    },
    onDeletePurchase(row, index) {
      // 删除
      this.$axios.delete(`/api/purchase/delete/${row._id}`).then(res => {
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