<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'app',
  componets: {},
  created() {
    if (sessionStorage.storeToken) {
      const decoded = jwt_decode(sessionStorage.storeToken)
      // token存储到vuex中
      this.$store.dispatch('setIsAuthenticated', !this.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    },
  },
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  background-color: #f2f2f2;
}

// 面包屑
.breadcrumb {
  padding: 20px;
  background-color: #fff;

  .title {
    border-left: 3px solid $title-color;
    padding-left: 10px;
  }
}

hr {
  background-color: #e4e4e4;
  height: 2px;
  border: none;
  margin: 20px auto;
}

.box-card {
  margin: 20px;

  .ser_add {
    overflow: hidden;
    margin-bottom: 20px;
    width: 100%;

    .btnRight {
      float: right;
    }
  }
}
</style>
