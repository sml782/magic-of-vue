<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      |
      <router-link to="/admin">管理</router-link>
    </nav>
    <!-- 路由出口 -->
    <keep-alive include="admin" max="10">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app",
  watch: {
    immediate: true,
    $route: {
      handler(newRoute, oldRoute) {
        // console.log("$route change", this);
        console.log({ newRoute, oldRoute });
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
