import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  // {
  //   path: "/admin",
  //   name: "admin",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
  //   children: [
  //     {
  //       path: "/admin/detail/:id",
  //       name: "qdetail",
  //       component: () =>
  //         import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  //     }
  //   ],
  //   meta: {
  //     auth: true
  //   },
  //   beforeEnter(to, from, next) {
  //     if (window.isLogin) {
  //       return next();
  //     }
  //     return next(`/login?redirect=${to.fullPath}`);
  //   }
  // },
  {
    path: "/detail/:id",
    name: "detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  },
  {
    path: "*",
    name: "tong",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 全局守卫
router.beforeEach((to, from, next) => {
  if (store.state.user.isLogin) {
    if (to.path === "/login") {
      return next("/");
    }
    return next();
  }
  if (to.path == "/login") {
    return next();
  }
  return next(`/login?redirect=${to.fullPath}`);
});

export default router;
