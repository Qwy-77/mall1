import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import modulesA from "./modules/modulesA";

// 1. 安装插件
Vue.use(Vuex);

// 2.创建对象
const state = {
  cartList: []
};
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    a: modulesA
  }
});

// 3.导出插件
export default store;

// new Vue({});
