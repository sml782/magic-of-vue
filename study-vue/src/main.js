import Vue from "vue";
import App from "./App.vue";
import Router from "@/router";
import directive from "./direcvtive";

Vue.config.productionTip = false;

// 添加事件总线
Vue.prototype.$bus = new Vue();

directive(Vue);

new Vue({
  router: Router,
  render: h => h(App)
}).$mount("#app");
