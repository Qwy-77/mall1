<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <Main-tab-bar class="main-tab-bar"></Main-tab-bar>
    <Icon></Icon>
    <SvgIcon></SvgIcon>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
import Icon from "components/content/Icon/Icon.vue";
import SvgIcon from "components/content/Icon/svg.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon,
  },
};
</script>

<style>
@import "assets/css/base.css";
.main-tab-bar {
  z-index: 99;
  position: relative;
}
</style>
