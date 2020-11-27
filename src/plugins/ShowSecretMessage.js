const ShowSecretMessage = {
  // 인자로 Vue 인스턴스와 옵션 객체를 받는다
  install(Vue, options) {
    Vue.prototype.$secret = "오늘 저녁은 치킨이닭 꺄륵꺄륵";
  },
};

export default ShowSecretMessage;
