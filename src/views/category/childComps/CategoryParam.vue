<template>
  <div class="CategoryParam">
    <CategoryParamItem
      v-for="(item, index) in subList"
      :key="index"
      :subListItem="item"
    ></CategoryParamItem>
  </div>
</template>

<script>
import CategoryParamItem from "./CategoryParamItem";
export default {
  name: "CategoryParam",
  props: {
    subList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CategoryParamItem,
  },
};
</script>

<style  scoped>
.CategoryParam {
  display: flex;
  flex-flow: wrap;
}
</style>