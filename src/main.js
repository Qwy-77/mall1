import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;

// 让 Vue实例 等于 创建出来的 $bus  事件总线
Vue.prototype.$bus = new Vue();

// 图片懒加载
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require("assets/img/common/placeholder.png")
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
