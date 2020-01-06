export const getCourses = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 0, name: "web全栈" },
        { id: 1, name: "web高级" }
      ]);
    }, 2000);
  });
};
