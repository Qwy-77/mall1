<template>
  <div class="CheckButton" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.CheckButton {
  border-radius: 50%;
  border: 2px solid #aaaaaa;
}
.CheckButton img {
  width: 15px;
  height: 15px;
}
.check {
  background-color: red;
  border-color: red;
}
</style>