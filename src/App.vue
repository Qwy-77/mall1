<template>
  <div id="app">
    <router-view></router-view>
    <Main-tab-bar class="main-tab-bar"></Main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
.main-tab-bar {
  z-index: 99;
}
</style>
