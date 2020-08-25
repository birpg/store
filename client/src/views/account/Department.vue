<template>
  <div class="home">
    <div class="breadcrumb">
      <span>部门设置</span>
    </div>

    <el-card class="box-card" shadow="never">
      <!-- 搜索和添加 -->
      <div class="ser_add">
        <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

        <el-button class="btnRight" type="primary" @click="onAddDepartment()">新增</el-button>
      </div>

      <!-- 表内容 -->
      <el-table
        :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
        :data="tableData"
        border
      >
        <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>

        <el-table-column prop="coding" align="center" label="编码" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.coding }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="部门名称" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="operation" align="center" label="操作" min-width="100" fixed="right">
          <template v-slot="scope">
            <el-button icon="edit" size="small" type="text" @click="onEditDepartment(scope.row)">修改</el-button>
            <el-button
              icon="delete"
              type="text"
              size="small"
              @click="onDeleteDepartment(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination ref="pagination" @updata="handleTable($event)"></pagination>
    </el-card>
    <!-- 弹框页面 -->
    <DialogDepartment :dialog="dialog" @update="getProfile"></DialogDepartment>
  </div>
</template>

<script>
const DialogDepartment = () =>
  import('@/components/account/DialogDepartment')
export default {
  name: 'department',
  data () {
    return {
      tableData: [],
      allTableData: [],
      role: Boolean,
      dialog: {
        show: false,
        title: '',
        option: 'edit',
        form: {
          coding: '',
          name: '',
          id: ''
        },
      },
    }
  },
  components: {
    DialogDepartment
  },
  created () {
    this.getProfile()
    this.getIdentity()
  },
  methods: {
    //  权限
    getIdentity () {
      let roles = this.$store.getters.user.identity
      if (roles === '系统管理员' || roles === '老板' || roles === '店长') return this.role = true
      this.role = false
    },
    // 获取数据
    async getProfile () {
      const { data: res } = await this.$axios('/api/department')
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
    onAddDepartment () {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.dialog = {
        show: true,
        title: '部门-新增',
        option: 'add',
        form: {}
      }
    },
    // 编辑
    onEditDepartment (row) {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      this.dialog = {
        show: true,
        title: '部门-编辑',
        option: 'edit',
        form: row
      }

    },
    // 删除
    async onDeleteDepartment (row, index) {
      if (!this.role) {
        return this.$message.error('没有权限!')
      }
      const { data: res } = await this.$axios.delete(`/api/department/delete/${row._id}`)
      this.$message.success('删除成功')
      this.getProfile()
    },
  }
}
</script>

<style lang="scss" scoped></style>