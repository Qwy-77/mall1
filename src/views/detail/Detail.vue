<template>
  <div class="detail">
    <DetailBar></DetailBar>
    <DetailSwiper :topImages="topImages"></DetailSwiper>
  </div>
</template>

<script>
import DetailBar from "./childrenComp/DetailBar";
import DetailSwiper from "./childrenComp/DetailSwiper";

import { getDetail } from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  created() {
    // 注意 这里的 params.id 后面的 id 要跟 detail 配置的路由后面的 参数一样
    this.iid = this.$route.params.iid;

    // 根据 iid 发送网络请求
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 拿出 轮播图的 数据 tomImages
      this.topImages = res.data.result.itemInfo.topImages;
    });
  },
};
</script>

<style  scoped>
</style>