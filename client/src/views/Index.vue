<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <router-view />
    </div>
  </div>
</template>

<script>
const HeadNav = () => import("@/components/HeadNav")
const LeftMenu = () => import("@/components/LeftMenu")
export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu,
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;

  .rightContainer {
    position: relative;
    top: 50px;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 50px);
  }
}
</style>
