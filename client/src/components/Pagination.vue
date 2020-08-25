<!-- 分页组件 -->
<template>
  <div class="pagination">
    <el-pagination
      :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size"
      :layout="paginations.layout"
      :total="paginations.total"
      :current-page.sync="paginations.page_index"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {
      allTableData: [],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper', // 翻页属性
      },
    }
  },
  methods: {
    // 当前页数改变时
    handleCurrentChange (page) {
      let sortnum = this.paginations.page_size * (page - 1)
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum
      })
      // 设置默认分页数据
      let tableData = table.filter((item, index) => {
        return index < this.paginations.page_size
      })
      this.$emit('updata', tableData)
    },
    // 每页显示条目个数改变时
    handleSizeChange (page_size) {
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      let tableData = this.allTableData.filter((item, index) => {
        return index < page_size
      })
      this.$emit('updata', tableData)

    },
    // 设置分页
    setPaginations (val) {
      this.allTableData = val
      // 总页数
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 设置默认分页数据
      let tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
      this.$emit('updata', tableData)
    }
  },
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.pagination {
  float: left;
  margin: 20px 0;
}
</style>
