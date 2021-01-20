<template>
  <div class="CategoryParamItem">
    <div class="ParamItem">
      <img :src="subListItem.image" alt="" />
      <div class="ParamItem-title">{{ subListItem.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryParamItem",
  props: {
    subListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.CategoryParamItem {
  flex: 1;
  margin: 15px 10px 0;
}
.ParamItem {
  font-size: 12px;
  text-align: center;
}
.ParamItem img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}
</style>