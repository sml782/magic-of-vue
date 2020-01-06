export const helloMixin = {
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log("hey");
    }
  }
};
