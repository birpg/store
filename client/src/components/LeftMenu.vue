<!-- 左侧菜单组件 -->
<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu mode="vertical" unique-opened background-color="#274461" text-color="#fff" active-text-color="#409eff" class="el-menu-vertical-demo" :default-active="defaultActive">
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <font-awesome-icon :icon="item.icon" size="lg" fixed-width />
              <span slot="title">{{ item.name }}</span>
            </template>

            <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'leftmenu',
  data () {
    return {
      items: [
        {
          icon: 'archive',
          name: '商品',
          path: 'commodity',
          children: [
            { path: '/category', name: '商品类别' },
            { path: '/brand', name: '商品品牌' },
            { path: '/file', name: '商品档案' },
            { path: '/unit', name: '商品单位' }
          ]
        },
        {
          icon: 'shopping-cart',
          name: '采购',
          path: 'purchase',
          children: [
            { path: '/supplier', name: '供货商信息' },
            { path: '/purchase', name: '采购单' }
          ]
        },
        {
          icon: 'calculator',
          name: '库存',
          path: 'inventory',
          children: [
            { path: '/storage', name: '商品入库' },
            { path: '/outbound', name: '商品出库' }
          ]
        },
        {
          icon: 'chart-area',
          name: '促销',
          path: 'promotion',
          children: [
            { path: '/order', name: '订单促销' }
          ]
        },
        {
          icon: 'user',
          name: '账号',
          path: 'account',
          children: [
            { path: '/personal', name: '个人信息' },
            { path: '/changePwd', name: '修改密码' },
            { path: '/department', name: '部门设置' },
            { path: '/account', name: '员工账号' },
            { path: '/identity', name: '身份管理' }
          ]
        }
      ]
    }
  },
  computed: {
    defaultActive () {
      let str = this.$route.path
      str = str.substr(0, str.indexOf('/', 1))
      if (!str) {
        return this.$route.path
      }
      return str
    }
  }
}
</script>
<style lang="scss" scoped>
.menu_page {
  position: fixed;
  top: 51px;
  left: 0;
  min-height: 100%;
  background-color: #274461;
  z-index: 99;

  .el-menu-vertical-demo {
    width: 35px;
    &:not(.el-menu--collapse) {
      width: 180px;
      min-height: 400px;
    }

    .el-submenu {
      a {
        text-decoration: none;

        .el-menu-item {
          min-width: 180px;
        }
      }
    }
  }
}
</style>
