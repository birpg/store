<template>
  <div class="home">
    <div class="breadcrumb">
      <span>身份管理</span>
    </div>

    <div class="container">
      <el-card class="box-card">
        <!-- 搜索和添加 -->
        <div class="search">
          <el-input
            style="width: 250px"
            v-model="search"
            clearable
            placeholder="请输入编码/身份名称"
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
            @click="onAddIdentity()"
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
          <el-table-column type="index" align="center" label="序号" width="100">
          </el-table-column>

          <el-table-column
            prop="coding"
            align="center"
            label="编码"
            width="350"
          >
            <template v-slot="scope">
              <span>{{ scope.row.coding }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="身份名称"
            width="350"
          >
            <template v-slot="scope">
              <span>{{ scope.row.name }}</span>
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
                @click="onEditIdentity(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                icon="delete"
                size="small"
                @click="onDeleteIdentity(scope.row, scope.$index)"
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
    <!-- 弹框页面 -->
    <DialogIdentity
      :dialog="dialog"
      :form="form"
      @update="getProfile"
    ></DialogIdentity>
  </div>
</template>

<script>
const DialogIdentity = () => import('../../components/account/DialogIdentity')
export default {
  name: 'identity',
  data() {
    return {
      tableData: [],
      allTableData: [],
      search: '',
      role: Boolean,
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      },
      form: {
        coding: '',
        name: '',
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
    DialogIdentity
  },
  created() {
    this.getProfile()
    this.getIdentity()
  },
  methods: {
    // 权限
    getIdentity() {
      this.$axios
        .get('/api/users/current', {
          showLoading: false
        })
        .then(res => {
          let roles = res.data.identity
          if (roles === '系统管理员' || roles === '老板' || roles === '店长') {
            this.role = true
            return
          }
          this.role = false
        })
    },
    getProfile() {
      // 获取数据
      this.$axios('/api/identity').then(res => {
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
    // 添加
    onAddIdentity() {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.dialog = {
        show: true,
        title: '身份管理-新增',
        option: 'add'
      }
    },
    // 编辑
    onEditIdentity(row) {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.dialog = {
        show: true,
        title: '身份管理-编辑',
        option: 'edit'
      }
      this.form = {
        coding: row.coding,
        name: row.name,
        id: row._id
      }
    },
    // 删除
    onDeleteIdentity(row, index) {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.$axios.delete(`/api/identity/delete/${row._id}`).then(res => {
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