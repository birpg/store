<template>
  <div class="home">
    <div class="breadcrumb">
      <span class="title">商品单位</span>
    </div>

    <el-card class="box-card" shadow="never">
      <!-- 搜索和添加 -->
      <div class="ser_add">
        <search :allTableData="allTableData" @setPagination="setPagination($event)"></search>

        <el-button class="btnRight" type="primary" @click="onAddUnit()">新增</el-button>
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
        <el-table-column prop="name" align="center" label="单位名称" min-width="100">
          <template v-slot="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="operation" align="center" label="操作" fixed="right" min-width="200">
          <template v-slot="scope">
            <el-button type="warning" icon="edit" size="small" @click="onEditUnit(scope.row)">修改</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="onDeleteUnit(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination ref="pagination" @updata="handleTable($event)"></pagination>
    </el-card>

    <!-- 弹框页面 -->
    <DialogUnit :dialog="dialog" @update="getProfile"></DialogUnit>
  </div>
</template>

<script>
const DialogUnit = () => import('../../components/commodity/DialogUnit')
export default {
  name: 'unit',
  data () {
    return {
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: '',
        option: 'edit',
        form: {
          coding: '',
          name: '',
          id: ''
        }
      }
    }
  },
  components: {
    DialogUnit
  },
  created () {
    this.getProfile()
  },
  methods: {
    handleTable (val) {
      this.tableData = val
    },
    // 获取数据
    async getProfile () {
      const { data: res } = await this.$api.getUnitApi()
      this.setPagination(res)
      this.allTableData = res
    },
    // 设置分页数据
    setPagination (val) {
      this.$refs.pagination.setPaginations(val)
    },
    // 添加
    onAddUnit () {
      this.dialog = {
        show: true,
        title: '商品单位-新增',
        option: 'add',
        form: {}
      }
    },
    // 编辑
    onEditUnit (row) {
      this.dialog = {
        show: true,
        title: '商品单位-编辑',
        option: 'edit',
        form: row
      }

    },
    // 删除
    async onDeleteUnit (row, index) {
      const { data: res } = await this.$api.delUnitApi(row._id)
      this.$message.success('删除成功')
      this.getProfile()
    }
  }
}
</script>

<style lang="scss" scoped></style>