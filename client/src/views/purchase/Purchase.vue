<template>
  <div class="home">
    <router-view />
    <div>
      <div class="breadcrumb">
        <span class="title">采购单</span>
      </div>

      <el-card class="box-card" shadow="never">
        <!-- 搜索和添加 -->
        <div class="ser_add">
          <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

          <el-button class="btnRight" type="primary" @click="onAddPurchase()">新增</el-button>
        </div>

        <!-- 表内容 -->
        <el-table :header-cell-style="{ background: '#f2f2f2', color: '#606266' }" :data="tableData" border>
          <el-table-column prop="purchaseNumber" align="center" label="采购单号" min-width="150">
            <template v-slot="scope">
              <span>{{ scope.row.purchaseNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="supplier" align="center" label="供应商" min-width="200">
            <template v-slot="scope">
              <span>{{ scope.row.supplier }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="total" align="center" label="采购金额" min-width="120">
            <template v-slot="scope">
              <span>{{ scope.row.total }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="personnel" align="center" label="采购人员" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.personnel }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="ordrMakingStf" align="center" label="制单人员" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.ordrMakingStf }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="date " align="center" label="制单日期" min-width="200">
            <template v-slot="scope">
              <span>{{ scope.row.date | dateFormat }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="audit" align="center" label="审核状态" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.audit }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="operation" align="center" label="操作" min-width="100" fixed="right">
            <template v-slot="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="onEditPurchase(scope.row)">修改</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="onDeletePurchase(scope.row, scope.$index)">删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination ref="pagination" @updata="handleTable($event)"></pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Purchase',
  data () {
    return {
      tableData: [],
      allTableData: []
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    // 获取数据
    async getProfile () {
      const { data: res } = await this.$api.getPurchaseApi()
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
    onAddPurchase () {
      this.$router.push({
        path: '/purchase/addPurchase',
        query: {
          title: '新增采购单',
          option: 'add'
        }
      })
    },
    // 编辑
    onEditPurchase (row) {
      this.$router.push({
        path: '/purchase/addPurchase',
        query: {
          title: '编辑采购单',
          option: 'edit',
          id: row._id
        }
      })
    },
    // 删除
    async onDeletePurchase (row, index) {
      const { data: res } = await this.$api.getPurchaseApi(row._id)
      this.$message.success('删除成功')
      this.getProfile()
    },
  }
}
</script>

<style lang="scss" scoped></style>