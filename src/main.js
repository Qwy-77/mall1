import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

Vue.config.productionTip = false;

// 让 Vue实例 等于 创建出来的 $bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
