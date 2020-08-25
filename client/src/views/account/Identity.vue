<template>
  <div class="home">
    <div class="breadcrumb">
      <span class="title">身份管理</span>
    </div>

    <el-card class="box-card" shadow="never">
      <!-- 搜索和添加 -->
      <div class="ser_add">
        <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

        <el-button class="btnRight" type="primary" @click="onAddIdentity()">新增</el-button>
      </div>

      <!-- 表内容 -->
      <el-table
        :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
        :data="tableData"
        border
      >
        <el-table-column type="index" align="center" label="序号" width="100"></el-table-column>

        <el-table-column prop="coding" align="center" label="编码" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.coding }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="身份名称" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="operation" align="center" label="操作" min-width="100" fixed="right">
          <template v-slot="scope">
            <el-button type="text" @click="onEditIdentity(scope.row)">修改</el-button>
            <el-button type="text" @click="onDeleteIdentity(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination ref="pagination" @updata="handleTable($event)"></pagination>
    </el-card>

    <!-- 弹框页面 -->
    <DialogIdentity :dialog="dialog" @update="getProfile"></DialogIdentity>
  </div>
</template>

<script>
const DialogIdentity = () => import('../../components/account/DialogIdentity')
export default {
  name: 'Identity',
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
          id: '',
        },
      },
    }
  },
  components: {
    DialogIdentity,
  },
  created () {
    this.getProfile()
    this.getIdentity()
  },
  methods: {
    // 权限
    getIdentity () {
      let roles = this.$store.getters.user.identity
      if (roles === '系统管理员' || roles === '老板' || roles === '店长') return this.role = true
      this.role = false
    },
    async getProfile () {
      // 获取数据
      const { data: res } = await this.$axios('/api/identity')
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
    onAddIdentity () {
      if (!this.role) return this.$message.error('没有权限!')

      this.dialog = {
        show: true,
        title: '身份管理-新增',
        option: 'add',
        form: {}
      }
    },
    // 编辑
    onEditIdentity (row) {
      if (!this.role) return this.$message.error('没有权限!')

      this.dialog = {
        show: true,
        title: '身份管理-编辑',
        option: 'edit',
        form: row
      }

    },
    // 删除
    async onDeleteIdentity (row, index) {
      if (!this.role) return this.$message.error('没有权限!')

      const { data: res } = await this.$axios.delete(`/api/identity/delete/${row._id}`)
      this.$message('删除成功')
      this.getProfile()
    }
  }
}
</script>

<style lang="scss" scoped></style>
