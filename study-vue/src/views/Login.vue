<template>
  <div>
    <button @click="login" v-if="isLogin">登录</button>
    <button @click="logout" v-else>注销</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    isLogin() {
      return !window.isLogin;
    }
  },
  methods: {
    login() {
      window.isLogin = true;

      // 动态添加路由
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
          ],
          meta: {
            auth: true
          },
          beforeEnter(to, from, next) {
            if (window.isLogin) {
              return next();
            }
            return next(`/login?redirect=${to.fullPath}`);
          }
        }
      ]);

      this.$router.push(this.$route.query.redirect);
    },
    logout() {
      window.isLogin = false;
    }
  }
};
</script>

<style></style>
