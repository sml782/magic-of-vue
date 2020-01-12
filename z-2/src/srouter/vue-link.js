'use strict';

export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    }
  },
  render(h) {
    return h('a', { attrs: { href: `#${this.to}` }}, this.$slots.default);
  }
};