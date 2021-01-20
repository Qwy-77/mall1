<template>
  <div class="Category">
    <NavBar class="navbar">
      <div slot="center" class="navbar-center">商品分类</div>
    </NavBar>
    <CategoryMain></CategoryMain>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CategoryMain from "./childComps/CategoryMain";
export default {
  name: "Category",
  components: {
    NavBar,
    CategoryMain,
  },
};
</script>

<style scoped>
.Category {
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: #ffffff;
  position: relative;
}
</style>