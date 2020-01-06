<template>
  <p>
    <input
      type="text"
      :value="value"
      @input="onInput"
      ref="addInput"
      v-on:keydown.enter="addCourse"
    />
    <button v-on:click="addCourse">增加</button>
  </p>
</template>

<script>
export default {
  name: "CourseAdd",
  props: ["value"],
  mounted() {
    this.$refs.addInput.focus();
  },
  methods: {
    addCourse() {
      // 派发事件, 这里不再传值
      this.$emit("add-course");
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
