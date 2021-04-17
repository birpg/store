<template>
  <div class="home">
    <router-view />
    <div>
      <div class="breadcrumb">
        <span class="title">商品入库</span>
      </div>

      <el-card class="box-card" shadow="never">
        <!-- 搜索和添加 -->
        <div class="ser_add">
          <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

          <el-button class="btnRight" type="primary" @click="onAddStorage">新增</el-button>
        </div>

        <!-- 表内容 -->
        <el-table :header-cell-style="{ background: '#f2f2f2', color: '#606266' }" :data="tableData" border max-height="450" style="width: 100%">
          <el-table-column prop="numbering " align="center" label="入库单号" min-width="130">
            <template v-slot="scope">
              <span>{{ scope.row.numbering }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="store" align="center" label="入库门店" min-width="200">
            <template v-slot="scope">
              <span>{{ scope.row.store }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="type" align="center" label="入库类型" min-width="120">
            <template v-slot="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="total" align="center" label="入库数量" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.total }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="personnel" align="center" label="经办人员" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.personnel }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="ordrMakingStf" align="center" label="制单人员" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.ordrMakingStf }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="date " align="center" label="制单日期" min-width="180">
            <template v-slot="scope">
              <span>{{ scope.row.date | dateFormat }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="audit" align="center" label="审核状态" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.audit }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="operation" align="center" label="操作" min-width="100" fixed="right" width="80">
            <template v-slot="scope">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="onEditStorage(scope.row)">修改</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="onDeleteStorage(scope.row, scope.$index)">删除</el-button>
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
  name: 'Storage',
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
      const { data: res } = await this.$api.getStorageApi()
      this.setPagination(res)
      this.allTableData = res
    },
    setPagination (val) {
      this.$refs.pagination.setPaginations(val)
    },
    // 接收分页组件处理后的数据
    handleTable (val) {
      this.tableData = val
    },
    // 添加
    onAddStorage () {
      this.$router.push({
        path: '/storage/addStorage',
        query: {
          title: '新增入库单',
          option: 'add'
        }
      })
    },
    // 编辑
    onEditStorage (row) {
      this.$router.push({
        path: '/storage/addStorage',
        query: {
          title: '修改入库单',
          option: 'edit',
          id: row._id
        }
      })
    },
    // 删除
    async onDeleteStorage (row, index) {
      const { data: res } = await this.$api.delStorageApi(row._id)
      this.$message.success('删除成功')
      this.getProfile()
    },
  }
}
</script>

<style lang="scss" scoped></style>