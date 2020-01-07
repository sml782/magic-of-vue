export default {
  namespaced: true,
  state: {
    isLogin: false,
    username: ""
  },
  mutations: {
    login(state, username) {
      state.isLogin = true;
      state.username = username;
    },
    logout(state) {
      state.isLogin = false;
    }
  },
  actions: {
    login({ commit }, username) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin") {
            commit("login", "admin");
            return resolve();
          }
          return reject();
        }, 1000);
      });
    },
    logout({ commit }) {
      commit("logout");
    }
  },
  getters: {
    welcome(state) {
      return `${state.username}, 欢迎回来!`;
    }
  }
};
