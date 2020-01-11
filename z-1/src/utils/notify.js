import Vue from 'vue';
import Notice from '@/components/Notice1';

function notify(options) {
  const Ctro = Vue.extend(Notice);
  const instance = new Ctro({
    data: options,
  });

  instance.$mount();

  // 获取真实dom
  document.body.appendChild(instance.$el);
}

export default notify