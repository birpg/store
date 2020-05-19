<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="title">
        <span>超市后台管理系统</span>
      </el-col>
      <el-col :span="6" class="info">
        <span class="user" title="个人中心" @click="showInfoList()">
          <font-awesome-icon icon="user-circle" fixed-width size="lg" />
          <span>{{ user.name }}</span>
        </span>

        <span class="home" title="系统首页" @click="jump()">
          <font-awesome-icon icon="home" fixed-width size="lg" />
        </span>

        <span class="out" title="退出登录" @click="logout()">
          <font-awesome-icon icon="power-off" fixed-width size="lg" />
        </span>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: 'head-nav',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    showInfoList () {
      // 个人信息
      this.$router.push('/personal')
    },
    jump () {
      this.$router.push('/home')
    },
    logout () {
      // 清除token
      localStorage.removeItem('storeToken')
      this.$store.dispatch('clearCurrentState')

      // 页面跳转
      this.$router.push('/login')
      this.$message({
        message: '退出成功!',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped >
.head-nav {
  position: fixed;
  overflow: hidden;
  z-index: 999;
  width: 100%;
  height: 50px;
  line-height: 50px;
  min-width: 600px;
  background: #274461;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;

  .title {
    width: 300px;
    font-size: 22px;
    font-family: 'Microsoft YaHei';
    padding-left: 20px;
    letter-spacing: 3px;
  }

  .info {
    width: 300px;
    height: 50px;
    float: right;
    padding-right: 20px;
    text-align: center;

    .user,
    .home,
    .out {
      float: left;
      width: 80px;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
