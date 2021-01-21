<template>
  <div class="good-item" @click="itemClick">
    <img v-lazy="getImg" alt="" @load="imgLoad" :key="getImg" />
    <div class="goods-info">
      <p>{{ goodItem.title }}</p>
      <span class="price">￥{{ goodItem.price }}</span>
      <span class="cfav">{{ goodItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      // 图片每加载完毕一张就 发射一次 事件出去
      if (this.$route.path.indexOf("/home")) {
        this.$bus.$emit("itemIamageLoad");
      } else if (this.$route.path.indexOf("/detail")) {
        this.$bus.$emit("itemIamageLoad");
      }
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodItem.iid);
    },
  },
  computed: {
    getImg() {
      // 为了拿到不同 数据下的 名称不一样的图片
      return this.goodItem.img || this.goodItem.image || this.goodItem.show.img;
    },
  },
};
</script>

<style scoped>
.good-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.good-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 13px;
}
.goods-info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price {
  color: var(--color-high-text);
  margin-right: 18px;
}
.cfav {
  position: relative;
}
.cfav::after {
  content: "";
  position: absolute;
  left: -14px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>