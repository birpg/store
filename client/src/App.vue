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
    if (localStorage.storeToken) {
      const decoded = jwt_decode(localStorage.storeToken)
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
    }
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
</style>
