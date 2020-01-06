import Vue from "vue";
import App from "./App.vue";
import directive from "./direcvtive";

Vue.config.productionTip = false;

// 添加事件总线
Vue.prototype.$bus = new Vue();

directive(Vue);

new Vue({
  render: h => h(App)
}).$mount("#app");
