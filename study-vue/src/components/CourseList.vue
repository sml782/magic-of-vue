<template>
  <ul>
    <li
      v-for="(item, index) in courses"
      :key="index"
      :class="{ active: selectedCourse === item.id }"
      @click="selectedCourse = item.id"
    >
      <router-link :style="{ display: 'block' }" :to="`/detail/${item.id}`">
        {{ item.name }} - {{ item.price | currency("aaa", "bbb") }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CourseList",
  // 组件这里必须是函数 func, 因为组件里需要独立维护数据
  data() {
    return {
      selectedCourse: ""
    };
  },
  // props: ['courses'], // 这种方式不能限制类型
  props: {
    courses: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  // 局部过滤器
  filters: {
    currency(value, symbol = "$", a) {
      return `${symbol} ${a} ${value || 0}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
  background-color: #dddddd;
  border: 1px solid #000000;
}
</style>
