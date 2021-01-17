<template>
  <div class="DetailRecommendInfo">
    <div class="info-header">热门推荐</div>
    <GoodsList :goods="recommendList"></GoodsList>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
export default {
  name: "DetailRecommendInfo",
  props: {
    recommendList: {
      type: Array,
    },
  },
  components: {
    GoodsList,
  },
};
</script>

<style  scoped>
.DetailRecommendInfo {
  padding: 5px;
}
.info-header {
  line-height: 30px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>