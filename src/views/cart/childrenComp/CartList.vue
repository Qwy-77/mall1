<template>
  <div class="CartList">
    <CartListItem
      v-for="(item, index) in cartList"
      :key="index"
      :product="item"
    ></CartListItem>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters({
      //  vuex 里面的Getters 里面的 cartList 映射到 cartList上面 这个组件就能使用里面的数据了
      cartList: "cartList",
    }),
  },
};
</script>

<style  scoped>
</style>