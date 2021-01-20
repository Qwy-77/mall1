<template>
  <div class="CategoryMain">
    <Scroll class="content">
      <CategoryNavBar class="CategoryNavBar" :list="list"></CategoryNavBar>
    </Scroll>
    <Scroll class="contents">
      <CategoryParam class="CategoryParam" :subList="subList"></CategoryParam>
    </Scroll>
  </div>
</template>

<script>
import CategoryNavBar from "./CategoryNavBar";
import CategoryParam from "./CategoryParam";

import Scroll from "components/common/scroll/Scroll";

// 调用方法
import { getCategory, getSubcategory } from "network/category";
export default {
  name: "CategoryMain",
  components: {
    CategoryNavBar,
    CategoryParam,

    Scroll,
  },
  data() {
    return {
      list: [],
      maitKey: "3627",
      subList: [],
    };
  },
  created() {
    // 请求 导航模块的 数据信息
    this.getCategory();

    // 请求商品信息的数据
    this.getSubcategory(this.maitKey);
  },
  methods: {
    getCategory() {
      getCategory().then((res) => {
        console.log(res);
        const data = res.data.data.category;
        this.list = data.list;
      });
    },
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((res) => {
        console.log(res);
        this.subList = res.data.data.list;
      });
    },
  },
};
</script>

<style scoped>
.CategoryMain {
  display: flex;
  height: calc(100% - 44px - 49px);
}
.CategoryNavBar {
  width: 100px;
}
.CategoryParam {
  flex: 1;
}
.content {
  height: 100%;
  overflow: hidden;
}
.contents {
  height: 100%;
  overflow: hidden;
}
</style>