<script>
export default {
  name: "Heading",
  functional: true,
  props: {
    level: {
      type: String,
      required: true,
      default: "1"
    },
    aaaa: String
  },
  render(h, context) {
    // console.log("函数式组件的上下文", context, context.slots());
    // context.slots() 相当于 this.$slots

    const {
      props: { level },
      children
    } = context;

    // snabbdom
    // 返会 createElement 构造的VNode
    return h(
      `h${level}`, // 参数1: tagName
      // 参数2: 传递数据
      children // 参数3: childern
    );
  }
};
</script>
