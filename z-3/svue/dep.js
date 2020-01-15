/**
 * 依赖收集(聚合观察者)
 *
 * @class Dep
 */
class Dep {
  /**
   * 保存观察者
   *
   * @memberof Dep
   */
  deps = [];

  /**
   * 注入观察者
   *
   * @param {*} w
   * @memberof Dep
   */
  addDep(w) {
    this.deps.push(w);
  }

  /**
   * 通知更新
   *
   * @memberof Dep
   */
  notify() {
    this.deps.map(dep => dep.update());
  }
}