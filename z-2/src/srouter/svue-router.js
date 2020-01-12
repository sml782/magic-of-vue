'use strict';
import SRoutes from './sroutes';
import View from './vue-view';
import Link from './vue-link';

let Vue = null;

class SVueRouter {
  /**
   * mode: 'history',
   * base: process.env.BASE_URL,
   * routes
   * @param {*} options 
   */
  constructor(options = {}) {
    this.$options = options;
    const { routes } = options;
    
    this.routes = new SRoutes(routes);

    this.initParams();
    this.initRegisterEvent();
  }

  // 初始花参数
  initParams() {
    Vue.util.defineReactive(this, 'current', this.getCurrentPath());
  }

  // 初始花注册事件
  initRegisterEvent() {
    const { mode = 'hash' } = this.$options;

    // 初始花hash
    window.addEventListener('load',  this.onHashChange);

    let changeEvent = 'hashchange';
    if (mode === 'history') {
      changeEvent = 'popstate';
    }

    // 更新hash
    window.addEventListener(changeEvent, this.onHashChange);
  }

  // 获取当前path
  getCurrentPath() {
    const { mode = 'hash', base = '/' } = this.$options;

    if (mode === 'hash') {
      return window.location.hash.slice(1);
    }

    const path = window.location.pathname;

    // 初始路径从头开始
    if (base === '/') {
      return path;
    }

    return path.slice(base.length);
  }

  formatOptions() {
    
  }

  // 路由变化
  onHashChange = () => {
    this.current = this.getCurrentPath();
  }
}

// 插件挂载
SVueRouter.install = (_Vue) => {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      // 确保根实例的时候才执行
      if (!this.$options.router) {
        return;
      }
      Vue.prototype.$router = this.$options.router;
      Vue.prototype.$route = this.$options.router.routes.routes;
    }
  });


  // 任务2：实现两个全局组件router-link和router-view
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
}

export default SVueRouter;