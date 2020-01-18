
// 把值直接代理到 Vue 上
function proxy(target, name) {
  const data = target[name];
  for (const key in data) {
    Reflect.defineProperty(target, key, {
      get() {
        return data[key];
      },
      set(newValue) {
        data[key] = newValue;
      }
    });
  }
}

// Vue 实例
class SVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data || {};

    new Observe(this.$data);

    proxy(this, '$data');

    new Compiler(this, options.el);
  }
}