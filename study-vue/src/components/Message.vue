<template>
  <transition name="fade">
    <div class="message-box" v-if="show">
      <!-- 具名插槽 -->
      <slot name="title"></slot>
      <slot name="description"></slot>
      <!-- 默认插槽 -->
      <slot></slot>
      <!-- 作用域插槽 -->
      <slot name="tttt" tttt="来自作用域插槽"></slot>
      <span class="message-box-close" @click="$emit('update:show', false)">
        X
      </span>
    </div>
  </transition>
</template>

<script>
import { helloMixin } from "../mixin/hello";

export default {
  name: "Message",
  mixins: [helloMixin],
  props: ["show"],
  mounted() {
    this.$bus.$on("message-close", () => {
      this.$emit("update:show", false);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a {
  bottom: 1;
}
</style>
