<template>
  <div class="DetailBaseInfo" v-if="Object.keys(goods).length !== 0">
    <div class="title">
      {{ goods.title }}
    </div>

    <div class="price">
      <span class="newPrice">{{ goods.newPrice }}</span>
      <span class="oldPrice">{{ goods.oldPrice }}</span>
      <span
        class="discount"
        :style="{ backgroundColor: goods.discountBgColor }"
        >{{ goods.discount }}</span
      >
    </div>

    <div class="columns">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>

    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.DetailBaseInfo {
  padding: 10px 7px;
}
.title {
  color: black;
}
.price {
  position: relative;
  margin-top: 15px;
}
.newPrice {
  color: var(--color-high-text);
  font-size: 23px;
}
.oldPrice {
  text-decoration: line-through;
  font-size: 13px;
  margin: 0 4px;
}
.discount {
  position: absolute;
  transform: translateY(-1px);
  color: #ffffff;
  font-size: 13px;
  padding: 2px 4px;
  border-radius: 9px;
}
.columns {
  display: flex;
  text-align: center;
  margin-top: 18px;
  justify-content: space-between;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
  padding-bottom: 8px;
  font-size: 13px;
}

.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.info-service-item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>