<template>
  <div class="home">
    <AddAccount
      :show="isShow"
      :page="page"
      :form="form"
      @update="handle($event)"
    ></AddAccount>

    <div v-show="isShow">
      <div class="breadcrumb">
        <span>员工账号</span>
      </div>

      <div class="container">
        <el-card class="box-card">
          <!-- 搜索和添加 -->
          <div class="search">
            <el-input
              style="width: 250px"
              v-model="search"
              clearable
              placeholder="请输入工号编码"
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
              @click="onAddAccount()"
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
              label="工号编码"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.coding }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="姓名"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="tel"
              align="center"
              label="手机号码"
              width="150"
            >
              <template v-slot="scope">
                <span>{{ scope.row.tel }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="status"
              align="center"
              label="状态"
              width="80"
            >
              <template v-slot="scope">
                <span>{{
                  scope.row.status == 'enable' ? '启用' : '禁用'
                }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="logins"
              align="center"
              label="登录次数"
              width="100"
            >
              <template v-slot="scope">
                <span>{{ scope.row.logins }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="identity"
              align="center"
              label="账号角色"
              width="180"
            >
              <template v-slot="scope">
                <span>{{
                  scope.row.identity == undefined ? '--' : scope.row.identity
                }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="department"
              align="center"
              label="所属部门"
              width="180"
            >
              <template v-slot="scope">
                <span>{{
                  scope.row.department == undefined
                    ? '--'
                    : scope.row.department
                }}</span>
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
                  @click="onEditAccount(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  icon="delete"
                  size="small"
                  @click="onDeleteAccount(scope.row, scope.$index)"
                  >删除</el-button
                >
                <el-button
                  type="text"
                  icon="delete"
                  size="small"
                  @click="onEnable(scope.row)"
                  >启用</el-button
                >
                <el-button
                  type="text"
                  icon="delete"
                  size="small"
                  @click="onDisable(scope.row)"
                  >禁用</el-button
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
const AddAccount = () => import('../../components/account/AddAccount.vue')

export default {
  name: 'account',
  data() {
    return {
      tableData: [],
      allTableData: [],
      search: '',
      isShow: true,
      role: Boolean,

      page: {
        title: '',
        option: ''
      },
      form: {
        coding: '',
        name: '',
        gender: '',
        identity: '',
        department: '',
        position: '',
        tel: '',
        phone: '',
        email: '',
        remarks: '',
        status: '',
        logins: '',
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
    AddAccount
  },
  created() {
    this.getProfile()
    this.getIdentity()
  },
  methods: {
    handle(val) {
      this.isShow = val
      this.getProfile()
    },
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
    // 启用
    onEnable(row) {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      row.status = 'enable'
      this.$axios
        .post(`/api/users/employee/edit/${row._id}`, row)
        .then(res => {
          // 操作成功
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
        })

      this.getProfile()
    },
    // 禁用
    onDisable(row) {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      row.status = 'disable'
      this.$axios
        .post(`/api/users/employee/edit/${row._id}`, row)
        .then(res => this.$message.success('修改成功！'))

      this.getProfile()
    },
    getProfile() {
      // 获取数据
      this.$axios('api/users/employees').then(res => {
        this.allTableData = res.data
        let arr = []
        for (let item of res.data) {
          arr.push(item.coding)
        }
        arr.sort((num1, num2) => {
          return num2 - num1
        })
        this.form.coding = arr[0] + 1

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
    onAddAccount() {
      // 添加
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.isShow = false
      this.page = {
        title: '新增账号',
        option: 'add'
      }
    },
    onEditAccount(row) {
      // 编辑

      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.isShow = false
      this.page = {
        title: '修改账号',
        option: 'edit'
      }
      this.form = {
        coding: row.coding,
        name: row.name,
        gender: row.gender,
        identity: row.identity,
        department: row.department,
        position: row.position,
        tel: row.tel,
        phone: row.phone,
        email: row.email,
        remarks: row.remarks,
        status: row.status,
        id: row._id
      }
    },
    onDeleteAccount(row, index) {
      // 删除
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.$axios.delete(`/api/users/employee/delete/${row._id}`).then(res => {
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