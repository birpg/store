<template>
  <div class="home">
    <div class="breadcrumb">
      <span class="title">员工账号</span>
    </div>

    <el-card class="box-card" shadow="never">
      <!-- 搜索和添加 -->
      <div class="ser_add">
        <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

        <el-button class="btnRight" type="primary" @click="onAddAccount()">新增</el-button>
      </div>

      <!-- 表内容 -->
      <el-table
        :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
        :data="tableData"
        border
      >
        <el-table-column prop="coding" align="center" label="工号编码" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.coding }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="姓名" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="tel" align="center" label="手机号码" min-width="150">
          <template v-slot="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="status" align="center" label="状态" min-width="80">
          <template v-slot="scope">
            <span>
              {{
              scope.row.status == 'enable' ? '启用' : '禁用'
              }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="logins" align="center" label="登录次数" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.logins }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="identity" align="center" label="账号角色" min-width="100">
          <template v-slot="scope">
            <span>
              {{
              scope.row.identity == undefined ? '--' : scope.row.identity
              }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="department" align="center" label="所属部门" min-width="100">
          <template v-slot="scope">
            <span>
              {{
              scope.row.department == undefined
              ? '--'
              : scope.row.department
              }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="operation" align="center" label="操作" min-width="200" fixed="right">
          <template v-slot="scope">
            <el-button type="text" icon="edit" size="small" @click="onEditAccount(scope.row)">修改</el-button>
            <el-button
              type="text"
              icon="delete"
              size="small"
              @click="onDeleteAccount(scope.row, scope.$index)"
            >删除</el-button>
            <el-button
              type="text"
              icon="delete"
              size="small"
              @click="onEnable(scope.row,'enable')"
            >启用</el-button>
            <el-button
              type="text"
              icon="delete"
              size="small"
              @click="onEnable(scope.row, 'disable')"
            >禁用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination ref="pagination" @updata="handleTable($event)"></pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      tableData: [],
      allTableData: [],
      role: Boolean
    }
  },
  created () {
    this.getProfile()
    this.getIdentity()
  },
  methods: {
    // 获取数据
    async getProfile () {
      const { data: res } = await this.$axios('api/users/employees')
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
    // 权限
    getIdentity () {
      let roles = this.$store.getters.user.identity
      if (roles === '系统管理员' || roles === '老板' || roles === '店长') return this.role = true

      this.role = false
    },
    // 启用 && 禁用
    async onEnable (row, name) {
      if (!this.role) return this.$message.error('没有权限!')
      row.status = name
      const { data: res } = await this.$axios
        .post(`/api/users/employee/edit/${row._id}`, row)
      this.$message.success('修改成功！')
      this.getProfile()
    },
    // 添加
    onAddAccount () {
      if (!this.role) return this.$message.error('没有权限!')
      this.$router.push({
        path: '/addAccount',
        query: {
          title: '新增账号',
          option: 'add',
        }
      })
    },
    // 编辑
    onEditAccount (row) {
      if (!this.role) return this.$message.error('没有权限!')
      this.$router.push({
        path: '/addAccount',
        query: {
          title: '修改账号',
          option: 'edit',
          form: JSON.stringify(row)
        }
      })
    },
    // 删除
    async onDeleteAccount (row, index) {
      if (!this.role) return this.$message.error('没有权限!')

      const { data: res } = await this.$axios.delete(`/api/users/employee/delete/${row._id}`)
      this.$message('删除成功')
      this.getProfile()
    },
  }
}
</script>

<style lang="scss" scoped></style>