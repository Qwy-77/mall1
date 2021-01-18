<template>
  <div class="Cart">
    <NavBar class="cart-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>

    <Scroll class="content">
      <CartList></CartList>
    </Scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import CartList from "./childrenComp/CartList";
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
  },
  computed: {
    cartLength() {
      return this.$store.getters.cartLength;
    },
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
  /* height: calc(100% - 44px - 49px); */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
}
</style>