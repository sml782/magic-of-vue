import Vue from "vue";
import Vuex from "vuex";
import presist from "./plugins/presist";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  // ! 严格模式，防止用户非调用式更改，更改会报错
  strict: true,
  modules: {
    user
  },
  plugins: [presist]
});
