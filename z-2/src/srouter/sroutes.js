'use strict';

import Vue from 'vue';

class Routes {
  constructor(rs) {
    Vue.util.defineReactive(this, 'routes', {});

    // 初始化添加
    this.runAdd(rs);
  }

  get routes() {
    const values = Object.values(this.routes);
    return values;
  }

  runAdd(rs) {
    rs.map(r => {
      this.routes[r.path] = r;
    });
  }

  addRoutes(rs) {
    this.runAdd(rs);
  }

  getInstance(path) {
    return this.routes[path];
  }
}

export default Routes;