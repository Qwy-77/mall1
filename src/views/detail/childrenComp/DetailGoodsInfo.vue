<template>
  <div class="DetailGoodsInfo" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc">
      <div class="info-left"></div>
      <div class="desc">
        {{ detailInfo.desc }}
      </div>
      <div class="info-right"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLenth: 0,
    };
  },
  methods: {
    imageLoad() {
      //  解决发送次数过多 每加载一次图片 让counter 加1
      // 判断 所有图片都加载完了 就进行一个回调就可以
      if (++this.counter === this.imagesLenth) {
        this.$emit("imageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      // 获取图片的个数 与 counter 对比 只要detailInfo 值发生变化 就执行下面的函数
      this.imagesLenth = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style  scoped>
.DetailGoodsInfo {
  padding: 20px 0;
}
.info-desc {
  margin: 0 15px;
}

.info-desc .desc {
  padding: 14px 0;
  font-size: 13px;
}

.info-left,
.info-right {
  position: relative;
  width: 100px;
  height: 1px;
  border-bottom: 1px solid #cccccc;
}

.info-left {
  float: left;
}

.info-right {
  float: right;
}

.info-left::after,
.info-right::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  background-color: #333;
}

.info-right::after {
  right: 0;
}

.info-key {
  margin: 10px 0 10px 15px;
  font-size: 15px;
  color: #333;
}

.info-list img {
  width: 100%;
}
</style>