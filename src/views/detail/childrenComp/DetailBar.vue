<template>
  <div class="detailBar">
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="titles">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          :class="{ active: currentItem === index }"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentItem: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currenItem = index;
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style  scoped>
.titles {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>