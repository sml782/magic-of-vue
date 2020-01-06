<template>
  <div>
    <a :class="$style.red">awesome-vue</a>
    <a :class="{ [$style.red]: isRed }">awesome-vue</a>
    <a :class="[$style.red, $style.bold]">awesome-vue</a>
  </div>
</template>

<script>
export default {
  name: "CSSModule",
  data() {
    return {
      isRed: true
    };
  }
};
</script>

<style module>
.red {
  color: #f00;
}
.bold {
  font-weight: bold;
}
</style>
