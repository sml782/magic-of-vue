<template>
  <div>
    <s-input
      type="text"
      placeholder="请输入用户名"
      v-model="userInfo.username"
    />
    {{ userInfo.username }}
  </div>
</template>

<script>
import SInput from "@/components/myForm/SInput.vue";

export default {
  data() {
    return {
      userInfo: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    SInput,
  },
  methods: {
    login() {
      // this.$refs["loginForm"].validate(valid => {
      //   const notice = this.$create(Notice, {
      //     title: "社会你杨哥喊你来搬砖",
      //     message: valid ? "请求登录!" : "校验失败!",
      //     duration: 2000
      //   });
      //   notice.show();
      //   // if (valid) {
      //   //   alert("submit");
      //   // } else {
      //   //   console.log("error submit!");
      //   //   return false;
      //   // }
      // });
    }
  }
};
</script>

<style scoped>
</style>