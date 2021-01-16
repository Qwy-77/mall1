<template>
  <div class="DetailParamInfo" v-if="Object.keys(itemParams).length !== 0">
    <table class="info-sizes">
      <tr v-for="(item, index) in itemParams.sizes[0]" :key="index">
        <td v-for="(item, index) in item" :key="index">{{ item }}</td>
      </tr>
    </table>
    <table class="info-set">
      <tr v-for="(item, index) in itemParams.infos" :key="index">
        <td class="info-key">{{ item.key }}</td>
        <td class="info-value">{{ item.value }}</td>
      </tr>
    </table>
    <div class="info-img" v-if="itemParams.image.length !== 0">
      <img :src="itemParams.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    itemParams: {
      type: Object,
    },
  },
};
</script>

<style  scoped>
.DetailParamInfo {
  padding: 20px 15px;
  border-top: 5px solid rgba(100, 100, 100, 0.08);
  border-bottom: 5px solid #f2f5f8;
}
.info-sizes,
.info-set {
  border-collapse: collapse;
  font-size: 14px;
}
.info-sizes tr,
.info-set tr {
  border-bottom: 1px solid rgba(100, 100, 100, 0.08);
  height: 42px;
}
.info-sizes tr:nth-of-type(4) {
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.info-sizes td {
  padding: 10px 13px;
}
.info-sizes td:nth-of-type(1) {
  padding: 10px 70px 10px 0;
}
.info-sizes td:nth-of-type(2) {
  padding: 10px 25px;
}
.info-set .info-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}
.info-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>