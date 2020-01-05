
// heading 插件
const myPlugin = {
  install(Vue, options) {
    Vue.component('heading', {
      props: {
        level: {
          type: String,
          required: true,
          default: '1',
        },
        aaaa: String,
      },
      render(h) {
        // 返会 createElement 构造的VNode
        return h(
          `h${this.level}`, // 参数1: tagName
          // 参数2: 传递数据
          this.$slots.default, // 参数3: childern
        );
      }
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  // Vue.use(plugin, options)
  window.Vue.use(myPlugin);
}