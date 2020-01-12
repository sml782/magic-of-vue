'use strict';

let Vue;

class Store {
  constructor(options) {
    this.$options = options;

    const { state, mutations, actions } = options;
    this._mutations = mutations;
    this._actions = actions;

    Vue.util.defineReactive(this, 'state', state);
  }

  get state() {
    return this.state;
  }

  set state(a) {
    console.error('你造吗？你这样不好！', a);
  }

  commit = (type, ...playload) => {
    const m = this._mutations[type];
    return m.call(this, this.state, ...playload);
  }

  dispatch = (type, ...playload) => {
    const m = this._actions[type];
    return m.call(this, this, ...playload);
  }
}

export default {
  install(_vue) {
    Vue = _vue;

    Vue.mixin({
      beforeCreate() {
        Vue.prototype.$store = this.$options.store;
      }
    });
  },
  Store,
};