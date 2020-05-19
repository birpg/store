<template>
  <div class="notfound">
    <img src="../assets/404.gif" />
    <router-link to="/index">返回首页</router-link>
  </div>
</template>

<style lang="scss" scoped>
.notfound {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #f1f4f8;
  text-align: center;

  img {
    height: 100%;
  }
  a {
    position: absolute;
    bottom: 8%;
    left: 44.8%;
    width: 172px;
    height: 42px;
    line-height: 42px;
    border-radius: 5px;
    background-color: #01b39b;
    cursor: pointer;
    text-decoration: none;
    color: #f6fbfa;
    font-size: 100%;
  }
}
</style>