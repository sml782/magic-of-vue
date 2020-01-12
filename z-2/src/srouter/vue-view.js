'use strict';

export default {
  render(h) {
    // this.$vnode.data.routerview = true;
    const { routes, current } = this.$router;
    return h(routes.getInstance(current).component);
  }
};