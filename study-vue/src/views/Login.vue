<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  methods: {
    login() {
      // window.isLogin = true;
      // 提交 mutation 触发更改状态
      // this.$store.commit("login");
      // 提交 action
      // this.$store.dispatch("user/login", "admin").then(() => {
      this["user/login"]("admin").then(() => {
        // 动态添加路由
        console.log(this.$router);
        this.$router.addRoutes([
          {
            path: "/admin",
            name: "admin",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
              import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
            children: [
              {
                path: "/admin/detail/:id",
                name: "qdetail",
                component: () =>
                  import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
              }
            ]
          }
        ]);

        this.$router.push(this.$route.query.redirect || "/");
      });
    },

    ...mapActions(["user/login"])
  }
};
</script>

<style></style>
