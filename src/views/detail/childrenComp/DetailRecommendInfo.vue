<template>
  <div class="DetailRecommendInfo">
    <div class="info-header">热门推荐</div>
    <GridView>
      <GoodsListItem
        v-for="(item, index) in recommendList"
        :key="index"
        :goodItem="item"
      ></GoodsListItem>
    </GridView>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  name: "DetailRecommendInfo",
  props: {
    recommendList: {
      type: Array,
    },
  },
  components: {
    GridView,
    GoodsListItem,
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