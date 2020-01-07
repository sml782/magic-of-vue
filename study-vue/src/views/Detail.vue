<template>
  <div>
    <h2>detail page</h2>
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: "Detail",
  // 路由刚进入
  beforeRouteEnter(to, from, next) {
    console.log("detail 路由 进入", { to, from, next });
    next(vm => {
      vm;
    });
    // getPost(to.params.id, post => {
    //   next(vm => vm.setData(post))
    // });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("detail 路由 更新", { to, from, next });
    next();
    // this.post = null;
    // getPost(to.params.id, post => {
    //   this.setData(post)
    //   next();
    // });
  },
  created() {
    console.log("detail 实例创建");
    // this.fetchData();
  }
  // watch: {
  //   $route: "fetchData"
  // }
};
</script>
