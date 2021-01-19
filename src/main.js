import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import VueLazyLoad from "vue-lazyload";
import FastClick from "fastclick";

Vue.config.productionTip = false;

// 让 Vue实例 等于 创建出来的 $bus  事件总线
Vue.prototype.$bus = new Vue();

// 图片懒加载
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require("assets/img/common/placeholder.png")
});

//解决移动端300ms 的延迟问题
FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
