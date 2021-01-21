<template>
  <div class="CategoryNavBar">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="navbar-item"
      :class="{ active: currentItem === index }"
      @click="itemClick(index)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryNavBar",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentItem: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentItem = index;
      const maitKey = this.list[index].maitKey;
      const miniWallkey = this.list[index].miniWallkey;
      this.$emit("itemClick", maitKey, miniWallkey);
    },
  },
};
</script>

<style  scoped>
.CategoryNavBar {
  background-color: #f6f6f6;
}
.navbar-item {
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}
.active {
  background-color: #fff;
  color: var(--color-high-text);
  font-weight: 700;
  border-left: 3px solid var(--color-high-text);
}
</style>