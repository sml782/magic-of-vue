export default Vue => {
  Vue.directive("permission", {
    inserted(el, binding, vnode) {
      console.log(binding, vnode);
      if (binding.value !== "admin") {
        el.parentElement.removeChild(el);
      }
    }
  });
};
