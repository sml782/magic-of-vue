<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      |
      <router-link to="/admin">管理</router-link>
    </nav>

    <div v-if="isLogin">
      {{ welcome }}
      <button @click="logout">注销</button>
    </div>

    <!-- 路由出口 -->
    <keep-alive include="admin" max="10">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

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
  },
  computed: {
    ...mapState("user", ["isLogin"]),
    ...mapGetters("user", ["welcome"])
  },
  methods: {
    logout() {
      // 提交 mutation 出发更改状态
      // this.$store.commit("logout");
      // 提交 action
      // this.$store.dispatch("user/logout");
      this["user/logout"]();
      this.$router.push("/login");
    },
    ...mapActions(["user/logout"])
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
