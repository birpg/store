<template>
  <div class="home">
    <AddSupplier
      :show="isShow"
      :page="page"
      :form="form"
      @update="handle($event)"
    ></AddSupplier>

    <div v-show="isShow">
      <div class="breadcrumb">
        <span>供应商管理</span>
      </div>

      <div class="container">
        <el-card class="box-card">
          <!-- 搜索和添加 -->
          <div class="search">
            <el-input
              style="width: 250px"
              v-model="search"
              clearable
              placeholder="请输入编码/供应商名称"
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
              @click="onAddSupplier()"
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
              prop="coding"
              align="center"
              label="编码"
              width="50"
            >
              <template v-slot="scope">
                <span>{{ scope.row.coding }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="supplierName"
              align="center"
              label="供应商名称"
              width="200"
            >
              <template v-slot="scope">
                <span>{{ scope.row.supplierName }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              align="center"
              label="联系人"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="tel"
              align="center"
              label="联系电话"
              width="150"
            >
              <template v-slot="scope">
                <span>{{ scope.row.tel }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="address"
              align="center"
              label="详细地址"
              width="300"
            >
              <template v-slot="scope">
                <span>{{ scope.row.address }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="status"
              align="center"
              label="状态"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.status == 'true' ? '正常' : '关闭' }}</span>
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
                  type="warning"
                  icon="edit"
                  size="small"
                  @click="onEditSupplier(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  icon="delete"
                  size="small"
                  @click="onDeleteSupplier(scope.row, scope.$index)"
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
const AddSupplier = () => import('../../components/purchase/AddSupplier')
export default {
  name: 'supplier',
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
        supplierName: '',
        coding: '',
        address: '',
        account: '',
        bank: '',
        bankAccount: '',
        name: '',
        gender: '',
        position: '',
        tel: '',
        email: '',
        remarks: '',
        status: '',
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
    AddSupplier
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
      this.$axios('/api/supplier').then(res => {
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
    onAddSupplier() {
      // 添加
      this.isShow = false
      this.page = {
        title: '新增供应商信息',
        option: 'add'
      }
    },
    onEditSupplier(row) {
      // 编辑
      this.isShow = false
      this.page = {
        title: '修改供应商信息',
        option: 'edit'
      }
      this.form = {
        supplierName: row.supplierName,
        coding: row.coding,
        address: row.address,
        account: row.account,
        bank: row.bank,
        bankAccount: row.bankAccount,
        name: row.name,
        gender: row.gender,
        position: row.position,
        tel: row.tel,
        email: row.email,
        remarks: row.remarks,
        status: row.status,
        id: row._id
      }
    },
    onDeleteSupplier(row, index) {
      // 删除
      this.$axios.delete(`/api/supplier/delete/${row._id}`).then(res => {
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