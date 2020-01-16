/**
 * 编译器
 * 遍历 DOM 树吧咱
 * 
 * 判断 nodeType 这里先只判断 1(element) 3(text)
 * 1. 如果是文本且符合 `差值文本`, 则直接使用更新函数进行更新
 * 2. 如果是元素
 *   - 判断其属性是否是指令, 对指令进行更新
 *   - 对 `nodeChild` 进行递归编译
 * 
 * 下面咱就开始吧, 那就
 * 
 * @class Compile
 * @author 亖巠
 */
class Compiler {
  constructor(vm, el) {
    this.$el = window.document.querySelector(el);
    this.$vm = vm;

    this.initCompile(this.$el);
  }

  /**
   * 初始编译入口
   *
   * @memberof Compiler
   * 
   */
  initCompile(node) {
    if (!node) {
      return;
    }
    const childNodes = node.childNodes;
    if (!childNodes.length) {
      return;
    }

    Array.from(childNodes).map(child => {
      // 开始判断元素类型
      if (this.isDiffText(child)) {
        this.compileDiffText(child);
      } else if (this.isElement(child)) {
        this.compileElement(child);
      }

      // 继续递归查找子元素
      const childChildNode = child.childNodes;
      if (!childChildNode || !childChildNode.length) {
        return;
      }

      return this.initCompile(child);
    });
  }

  /**
   * 判断是否是差值文本
   *
   * @param {HTMLElement} node element
   * @returns {boolean} 是否是差值文本
   * @memberof Compiler
   */
  isDiffText(node) {
    if (node.nodeType !== 3) {
      return false;
    }
    const textContent = node.textContent || '';
    if (!/\{\{\s*(\w*)\s*\}\}/.test(textContent)) {
      return false;
    }
    return true;
  }

  /**
   * 判断是否是元素
   *
   * @param {HTMLElement} node element
   * @returns {boolean} 是否是元素
   * @memberof Compiler
   */
  isElement(node) {
    if (node.nodeType !== 1) {
      return false;
    }
    return true;
  }

  /**
   * 判断是否是指令
   *
   * @param {string} [name=''] 属性 name
   * @returns {boolean} 是否是指令
   * @memberof Compiler
   */
  isDirective(name = '') {
    return name.startsWith('s-');
  }

  /**
   * 编译差值文本
   *
   * @param {HTMLElement} node element
   * @memberof Compiler
   */
  compileDiffText(node) {
    return this.update(node, RegExp.$1, 'text');
  }

  /**
   * 编译元素
   * 只需编译指令就可
   *
   * @param {HTMLElement} node element
   * @memberof Compiler
   */
  compileElement(node) {
    const nodeAttrs = node.attributes;
    if (!nodeAttrs.length) {
      return;
    }

    Array.from(nodeAttrs).map(attr => {
      const { name: attrName = '', value: attrValue = '' } = attr;
      if (!this.isDirective(attrName)) {
        return;
      }

      if (!attrValue) {
        return;
      }

      const dirKey = attrName.slice(2);
      if (!this[dirKey]) {
        return;
      }
      return this[dirKey](node, attrValue);
    });
  }

  /**
   * 编译 `text` 指令
   *
   * @param {HTMLElement} node element
   * @param {string} [attrValue=''] 指令值
   * @memberof Compiler
   */
  text(node, attrValue = '') {
    // 开始注册编译更新函数
    this.update(node, attrValue, 'text');
  }

  /**
   * 编译 `html` 指令
   *
   * @param {HTMLElement} node element
   * @param {string} [attrValue=''] 指令值
   * @memberof Compiler
   */
  html(node, attrValue = '') {
    // 开始注册编译更新函数
    this.update(node, attrValue, 'html');
  }

  /**
   * 派发更新函数
   *
   * @param {HTMLElement} node element
   * @param {string} [attrValue=''] 指令值
   * @param {string} [dirType=''] 指令类型
   * @memberof Compiler
   */
  update(node, attrValue, dirType) {
    if (!attrValue || !dirType) {
      return;
    }

    const dirCallback = this[`${dirType}Update`];
    if (!dirCallback) {
      return;
    }

    // 初始花渲染一次
    dirCallback(node, this.$vm[attrValue]);

    return new Watcher(this.$vm, attrValue, (newValue) => {
      return dirCallback(node, newValue);
    });
  }

  /**
   *  更新文本
   *
   * @param {HTMLElement} node element
   * @param {string} value 新值
   * @memberof Compiler
   */
  textUpdate(node, value = '') {
    node.textContent = value
  }

  /**
   *  更新html
   *
   * @param {HTMLElement} node element
   * @param {string} value 新值
   * @memberof Compiler
   */
  htmlUpdate(node, value = '') {
    node.innerHTML = value;
  }
}