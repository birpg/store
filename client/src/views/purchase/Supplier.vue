<template>
  <div class="home">
    <router-view />
    <div v-show="this.$route.meta.show">
      <div class="breadcrumb">
        <span class="title">供应商管理</span>
      </div>

      <el-card class="box-card" shadow="never">
        <!-- 搜索和添加 -->
        <div class="ser_add">
          <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

          <el-button class="btnRight" type="primary" @click="onAddSupplier()">新增</el-button>
        </div>

        <!-- 表内容 -->
        <el-table
          :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
          :data="tableData"
          border
        >
          <el-table-column prop="coding" align="center" label="编码" width="100">
            <template v-slot="scope">
              <span>{{ scope.row.coding }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="supplierName" align="center" label="供应商名称" min-width="200">
            <template v-slot="scope">
              <span>{{ scope.row.supplierName }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" align="center" label="联系人" min-width="80">
            <template v-slot="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="tel" align="center" label="联系电话" min-width="120">
            <template v-slot="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="address" align="center" label="详细地址" min-width="300">
            <template v-slot="scope">
              <span>{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="status" align="center" label="状态" min-width="100">
            <template v-slot="scope">
              <span>{{ scope.row.status == 'true' ? '正常' : '关闭' }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="operation" align="center" label="操作" min-width="200" fixed="right">
            <template v-slot="scope">
              <el-button
                type="warning"
                icon="edit"
                size="small"
                @click="onEditSupplier(scope.row)"
              >修改</el-button>
              <el-button
                type="danger"
                icon="delete"
                size="small"
                @click="onDeleteSupplier(scope.row, scope.$index)"
              >删除</el-button>
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
const AddSupplier = () => import('../../components/purchase/AddSupplier')
export default {
  name: 'Supplier',
  data () {
    return {
      tableData: [],
      allTableData: [],
    }
  },
  components: {
    AddSupplier
  },
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      // 获取数据
      const { data: res } = await this.$axios('/api/supplier')
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
    onAddSupplier () {
      this.$router.push({
        path: '/supplier/addSupplier',
        query: {
          title: '新增供应商信息',
          option: 'add'
        }
      })
    },
    // 编辑
    onEditSupplier (row) {
      this.$router.push({
        path: '/supplier/addSupplier',
        query: {
          title: '修改供应商信息',
          option: 'edit',
          form: JSON.stringify(row)
        }
      })
    },
    // 删除
    async onDeleteSupplier (row, index) {
      const { data: res } = await this.$axios.delete(`/api/supplier/delete/${row._id}`)
      this.$message('删除成功')
      this.getProfile()
    }
  }
}
</script>

<style lang="scss" scoped></style>