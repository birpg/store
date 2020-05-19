<template>
  <div class="home">
    <div class="breadcrumb">
      <span>商品类别</span>
    </div>

    <div class="container">
      <el-card class="box-card">
        <!-- 搜索和添加 -->
        <div class="search">
          <el-input
            style="width: 250px"
            v-model="search"
            clearable
            placeholder="请输入编码/类别名称"
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
            @click="onAddCategory()"
            >新增</el-button
          >
        </div>

        <!-- 表内容 -->
        <el-table
          :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
          v-if="tableData.length > 0"
          :data="tableData"
          border
          max-height="450"
          :default-sort="{ prop: 'date', order: 'ascending' }"
          style="width: 100%"
        >
          <el-table-column type="index" align="center" label="序号" width="60">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间"
            align="center"
            width="250"
            sortable
          >
            <template v-slot="scope">
              <el-icon name="time"></el-icon>
              <span style="margin-left: 10px">{{
                scope.row.date | dateFormat
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="coding"
            align="center"
            label="编码"
            width="200"
          >
            <template v-slot="scope">
              <span>{{ scope.row.coding }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="类别名称"
            width="200"
          >
            <template v-slot="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" align="center" label="排序" width="200">
            <template v-slot="scope">
              <span>{{ scope.row.sort }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="operation"
            align="center"
            label="操作"
            fixed="right"
            width="180"
          >
            <template v-slot="scope">
              <el-button
                type="warning"
                icon="edit"
                size="small"
                @click="onEditCategory(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                icon="delete"
                size="small"
                @click="onDeleteCategory(scope.row, scope.$index)"
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
    <DialogCate :dialog="dialog" :form="form" @update="getProfile"></DialogCate>
  </div>
</template>

<script>
const DialogCate = () => import('../../components/commodity/DialogCate')
export default {
  name: 'category',
  data() {
    return {
      tableData: [],
      allTableData: [],
      search: '',
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      },
      form: {
        coding: '',
        name: '',
        sort: '',
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
    DialogCate
  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile() {
      // 获取数据
      this.$axios('/api/category').then(res => {
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
    onAddCategory() {
      // 添加
      this.dialog = {
        show: true,
        title: '商品类别-新增',
        option: 'add'
      }
    },
    onEditCategory(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: '商品类别-编辑',
        option: 'edit'
      }
      this.form = {
        coding: row.coding,
        name: row.name,
        sort: row.sort,
        id: row._id
      }
    },
    onDeleteCategory(row, index) {
      // 删除
      this.$axios.delete(`/api/category/delete/${row._id}`).then(res => {
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