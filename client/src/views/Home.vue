<template>
  <div class="home">
    <div class="breadcrumb">
      <span>首页</span>
    </div>
    <div class="container">
      <div class="welcome">
        <div>欢迎您!</div>
        <div>
          <span class="name">{{ user.name }}</span>

          <span class="time">
            <font-awesome-icon icon="calendar-alt" fixed-width size="lg" />
            {{ date | dateFormat }}
          </span>
        </div>
      </div>
      <div class="quick">
        <h2>快捷菜单</h2>
        <router-link v-for="(item, index) in quick" :to="item.path" :key="index">
          <div class="quick-item" :index="item.path">{{ item.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      date: new Date(),
      quick: [
        { path: '/purchase', name: '采购单' },
        { path: '/storage', name: '商品入库' },
        { path: '/outbound', name: '商品出库' },
        { path: '/order', name: '订单促销' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include breadcrumb;

  .container {
    margin: 10px 100px;
    height: 550px;
    background-color: #fff;
    overflow: hidden;

    .welcome {
      border: 1px solid #e4e4e4;
      margin: 10px 20px;
      font-size: 18px;

      div {
        padding: 10px 20px;
        overflow: hidden;
        .name {
          float: left;
          color: $title-color;
        }
        .time {
          float: right;
          color: #666;
        }
      }
    }
    .quick {
      border: 1px solid #e4e4e4;
      margin: 10px 20px;
      overflow: hidden;

      h2 {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin: 20px;
      }
      a {
        float: left;
        font-size: 14px;
        text-decoration: none;
        color: #333;
        &:hover {
          color: $title-color;
        }
      }
      .quick-item {
        margin: 0 0 20px 25px;
      }
    }
  }
}
</style>