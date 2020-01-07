<template>
  <div class="admin">
    <CSSModule />

    <Heading level="1">
      {{ title }}
    </Heading>

    <!-- 清空消息 -->
    <div class="toolbar" v-permission:foo.a.b="'admin'">
      <button @click="$bus.$emit('message-close')">清空消息</button>
    </div>

    <!-- 添加课程 -->
    <CourseAdd v-model="course" @add-course="addCourse"></CourseAdd>

    <!-- 课程列表 -->
    <CourseList :courses="courses" />

    <!-- 总数 -->
    <p>课程总数: {{ total }}</p>

    <!-- 成功消息 -->
    <message ref="success-message" :show.sync="showSuccess" class="success">
      <!-- 默认命名 v-slot:default -->
      <template>
        这里是默认插槽
      </template>

      <!-- 具名插槽 -->
      <template v-slot:title>
        <h2>恭喜 {{ title }}</h2>
      </template>
      <template v-slot:description>
        新增课程成功!
      </template>

      <!-- 作用域插槽 -->
      <template v-slot:tttt="sl">
        {{ sl.tttt }}
      </template>
    </message>

    <!-- 失败消息 -->
    <message ref="error-message" :show.sync="showError" class="error">
      <!-- 具名插槽 -->
      <template v-slot:title>
        <h2>警告</h2>
      </template>
      <template v-slot:description>
        请输入课程名称!
      </template>
    </message>

    <router-view />
  </div>
</template>

<script>
import Heading from "@/components/Heading";
import CourseList from "@/components/CourseList";
import Message from "@/components/Message";
import CourseAdd from "@/components/CourseAdd";
import CSSModule from "@/components/CSSModule";
import { getCourses } from "@/api/course";

export default {
  name: "admin",
  components: {
    Heading,
    CourseList,
    Message,
    CourseAdd,
    CSSModule
  },
  data() {
    return {
      title: "hello, VUE!",
      course: "",
      courses: [],
      selectedNum: "",
      totalCourse: 0,
      showSuccess: false,
      showError: false,
      price: 0
    };
  },
  methods: {
    addCourse() {
      if (!this.course) {
        // 显示错误信息
        this.course = "";
        this.showError = true;
        return;
      }

      const len = this.courses.length;
      this.courses.push({ id: len, name: this.course });
      // 显示正确信息
      this.course = "";
      this.showSuccess = true;
    },
    batchUpdatePrice() {
      this.courses.map(item => {
        // Vue.set(item, 'price', this.price);
        this.$set(item, "price", this.price);
      });
    }
  },

  // 生命周期
  // 组件实例已创建
  async created() {
    const courses = await getCourses();
    this.courses = courses;
  },

  // 组件已挂载
  mounted() {
    console.log(this.$refs);
  },

  // 计算属性
  computed: {
    // 计算属性有缓存，值发生变化才重新渲染
    total() {
      return this.courses.length + " ye";
    }

    // getter / setter
    // fullName: {
    //   // getter
    //   get: function () {
    //     return this.firstName + ' ' + this.lastName
    //   },
    //   // setter
    //   set: function (newValue) {
    //     var names = newValue.split(' ')
    //     this.firstName = names[0]
    //     this.lastName = names[names.length - 1]
    //   }
    // }
  }

  // 监听器
  // watch: {
  //   // 初始化不执行
  //   // courses(newValue, oldValue) {
  //   //   totalCourse = newValue.length;
  //   // },

  //   courses: {
  //     immediate: true, // 初始化立即执行一次
  //     deep: true,
  //     handler(newValue, oldValue) {
  //       totalCourse = newValue.length;
  //     }
  //   }
  // },

  // beforeRouteEnter(to, from, next) {
  //   if (window.isLogin) {
  //     return next();
  //   }
  //   return next(`/login?redirect=${to.fullPath}`);
  // }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.message-box {
  width: 500px;
  padding: 10px 20px;
  background: $success-color;
  border: 5px solid #cccccc;
  border-radius: 6px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.message-box.success {
  background: $success-color;
}
.message-box.error {
  background: $error-color;
}
.message-box-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

/* 动画相关 */
/* to 为最后一帧, 不带为初始帧 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* 可省略 */
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

/* 深度选择器 */
// 只有 css 生效, scss|less 不生效
// .admin >>> p {
//   background-color: red;
// }

/* sass 深度选择器 */
// .admin /deep/ p {
//   background-color: blue;
// }
// .admin ::v-deep p {
//   background-color: blue;
// }
</style>
