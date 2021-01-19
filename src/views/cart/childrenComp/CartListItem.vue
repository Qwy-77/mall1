<template>
  <div class="CartListItem">
    <div class="item-selector">
      <CheckButton
        :isChecked="product.checked"
        @click.native="checkClick"
      ></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="item-bottom">
        <div class="item-price">￥{{ product.price }}</div>
        <div class="item-count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      // 修改模型 state 里面的数据 实现 页面响应式改变
      this.product.checked = !this.product.checked;
    },
  },
};
</script>

<style  scoped>
.CartListItem {
  border-bottom: 1px solid #cccccc;
  display: flex;
  padding: 5px;
  font-size: 0;
}
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-title,
.item-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.item-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 2px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
}
.item-bottom .item-price {
  color: orangered;
}
</style>