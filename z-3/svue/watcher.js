/**
 * 观察者，用于监控值变化
 *
 * @class Watcher
 */
class Watcher {
  constructor(vm, key, updateCallback) {
    // 保存一些变量
    this.$vm = vm;
    this.$callback = updateCallback || (() => {});

    this.keyList = key.split('.');
    this.initInsert();
  }

  /**
   * 获取源数据
   *
   * @memberof Watcher
   */
  getData() {
    let curData = this.$vm;
    for (const item of this.keyList) {
      if (!curData) {
        return;
      }

      curData = curData[item];
    }
  }

  /**
   * 注册观察者
   *
   * @memberof Watcher
   */
  initInsert() {
    Dep.target = this;
    Dep.keyList = this.keyList;
    this.getData();
    Dep.target = null;
  }

  /**
   * 更新函数
   *
   * @memberof Watcher
   */
  update() {
    this.$callback.call(this.$vm, this.getData());
  }
}