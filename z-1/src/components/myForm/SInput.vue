<template>
  <div>
    <input
      v-bind="$attrs"
      :value="value"
      @input="onChange"
      @keydown.enter="onEnter"
    />
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  model: {
    props: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  methods: {
    onChange(e) {
      this.$emit('input', e.target.value);
    },
    onEnter() {
      this.$notify({
        title: '自定义位置',
        message: '左下角弹出的消息',
        position: 'bottom-left'
      })
    }
  }
};
</script>

<style scoped>
</style>