<template>
  <div class="Cart">
    <NavBar class="cart-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>

    <Scroll class="content" ref="scroll">
      <CartList></CartList>
    </Scroll>

    <CartBottonBar></CartBottonBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import CartList from "./childrenComp/CartList";
import CartBottonBar from "./childrenComp/CartBottonBar";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottonBar,
  },
  computed: {
    cartLength() {
      return this.$store.getters.cartLength;
    },
  },
  mounted() {
    // 每次添加购物车就 刷新一下 scroll的可滚动距离
    this.$refs.scroll.refresh();
  },
};
</script>

<style  scoped>
.Cart {
  height: 100vh;
  position: relative;
}
.cart-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
  /* position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0; */
  overflow: hidden;
  background-color: #fff;
}
</style>