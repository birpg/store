<template>
  <div class="home">
    <div class="breadcrumb">
      <span class="title">订单促销</span>
    </div>

    <el-card class="box-card" shadow="never">
      <!-- 搜索和添加 -->
      <div class="ser_add">
        <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

        <el-button class="btnRight" type="primary" @click="onAddOrder">新增</el-button>
      </div>

      <!-- 表内容 -->
      <el-table :header-cell-style="{ background: '#f2f2f2', color: '#606266' }" :data="tableData" border>
        <el-table-column prop="coding " align="center" label="促销编码" min-width="150">
          <template v-slot="scope">
            <span>{{ scope.row.coding }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="store" align="center" label="促销门店" min-width="200">
          <template v-slot="scope">
            <span>{{ scope.row.store }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="promDt" align="center" label="促销日期" min-width="200">
          <template v-slot="scope">
            <span>{{ scope.row.promDt | dateFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="personnel" align="center" label="制单人员" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.personnel }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="auditDate" align="center" label="审核日期" min-width="200">
          <template v-slot="scope">
            <span>{{ scope.row.auditDate | dateFormat }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="audit" align="center" label="审核状态" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.audit }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="operation" align="center" label="操作" min-width="100" fixed="right">
          <template v-slot="scope">
            <el-button type="text" icon="edit" size="small" @click="onEditOrder(scope.row)">修改</el-button>
            <el-button type="text" icon="delete" size="small" @click="onDeleteOrder(scope.row, scope.$index)">删除</el-button>
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
  name: 'Order',
  data () {
    return {
      tableData: [],
      allTableData: [],
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    // 获取数据
    async getProfile () {
      const { data: res } = await this.$axios('/api/order')
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
    onAddOrder () {
      this.$router.push({
        path: '/order/addOrder',
        query: {
          title: '新增促销单',
          option: 'add'
        }
      })
    },
    // 编辑
    onEditOrder (row) {
      this.$router.push({
        path: '/order/addOrder',
        query: {
          title: '修改促销单',
          option: 'edit',
          id: row._id
        }
      })
    },
    // 删除
    async onDeleteOrder (row, index) {
      const { data: res } = await this.$axios.delete(`/api/order/delete/${row._id}`)
      this.$message.success('删除成功')
      this.getProfile()
    },
  }
}
</script>

<style lang="scss" scoped>
</style>