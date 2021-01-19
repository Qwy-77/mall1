<template>
  <div class="CartBottonBar">
    <div class="check-content">
      <CheckButton
        class="check-button"
        :isChecked="isSelectAll"
        @click.native="checkClick"
      ></CheckButton>
      <span>全选</span>
    </div>

    <div class="price">合计:{{ totalPrice }}</div>

    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottonBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          // 过滤掉 没有选中的商品
          .filter((item) => {
            return item.checked;
          })
          // 把选中的商品进行总和计算
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
      // return this.$store.state.cartList.some((item) => item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全部选中的时候 点击一下就 全部不选中
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        // 某些或者全部 没有选中的时候 点击一下就全部选中
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.CartBottonBar {
  height: 40px;
  background-color: #eeeeee;
  position: relative;
  display: flex;
  line-height: 40px;
  font-size: 15px;
}
.check-content {
  width: 70px;
  display: flex;
  line-height: 40px;
  margin-left: 10px;
}
.check-button {
  width: 19px;
  height: 19px;
  line-height: 19px;
  margin: auto 0;
  margin-right: 5px;
}
.price {
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>