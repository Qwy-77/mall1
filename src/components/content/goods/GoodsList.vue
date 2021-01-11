<template>
  <div class="goods">
    <!--把 goods 数组里面的 每条数据（对象类型） 传递给 GoodsListItem组件 由 GoodsListItem 组件来展示数据-->
    <GoodsListItem
      v-for="(item, index) in goods"
      :key="index"
      :goodItem="item"
    ></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style  scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>