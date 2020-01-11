<template>
  <div>
    <slot />
  </div>
</template>

<script>

export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate() {

    }
  }
};
</script>

<style scoped>
</style>