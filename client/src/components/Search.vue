<!-- 搜索组件 -->
<template>
  <div class="search">
    <el-input
      style="width: 250px"
      v-model="search"
      clearable
      placeholder="请输入编码/名称"
      @keyup.enter.native="onSearch()"
      @clear="clearInput"
    >
      <el-button @click="onSearch()" slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    allTableData: Array
  },
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search () {
      // 搜索框为空时触发
      if (!this.search) return this.clearInput()
    }
  },
  methods: {
    // 搜索
    onSearch () {
      let items = this.allTableData.find(
        item => item.coding == this.search || item.name == this.search
      )
      if (!items) return this.$message.warning('没有该数据')
      this.$emit('setPagination', [items])
    },
    // 清空搜索内容时触发
    clearInput () {
      this.$emit('setPagination', this.allTableData)
    },
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.search {
  display: inline-block;
}
</style>