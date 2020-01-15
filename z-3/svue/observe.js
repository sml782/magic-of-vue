function defineReactive(obj, key, value) {
  // 继续深层次代理
  new Observe(value);

  const dep = new Dep();

  Reflect.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addDep(Dep.target);
      }
      return value;
    },
    set(nextValue) {
      if (nextValue === value) {
        return console.warn('你这值也没变呀');
      }

      value = nextData;
    }
  });
}

// 数组方法代理
const arrayProxy = {
  push(...args) {
    return Array.prototype.push.call(this, args);
  },
  pop(...args) {
    return Array.prototype.pop.call(this, args);
  },
  fill(...args) {
    return Array.prototype.pop.fill(this, args);
  },
  shift(...args) {
    return Array.prototype.shift.fill(this, args);
  },
  unshift(...args) {
    return Array.prototype.unshift.fill(this, args);
  },
  slice(...args) {
    return Array.prototype.unshift.slice(this, args);
  }
};

class Observe {
  constructor(beFtdData) {
    this.$data = beFtdData;

    if (typeof beFtdData !== 'object') {
      return null;
    }

    // 数组代理
    if (Array.isArray(beFtdData)) {
      return this.walkArray(beFtdData);
    }

    // 对象代理
    return this.walkObject(beFtdData);
  }

  // 数组代理
  walkArray(beFtdData) {
    Object.assign(beFtdData, arrayProxy);
  }

  walkObject(beFtdData) {
    for (const key in beFtdData) {
      defineReactive(beFtdData, key, beFtdData[key]);
    }
  }
}