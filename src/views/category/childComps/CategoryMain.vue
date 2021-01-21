<template>
  <div class="CategoryMain">
    <Scroll class="content">
      <CategoryNavBar
        class="CategoryNavBar"
        :list="list"
        @itemClick="itemClick"
      ></CategoryNavBar>
    </Scroll>
    <Scroll class="contents" ref="scroll">
      <CategoryParam
        class="CategoryParam"
        :subList="subList"
        ref="cateParam"
      ></CategoryParam>
      <TabControl
        :titles="titles"
        class="tab-control"
        @tabClick="tabClick"
      ></TabControl>
      <GoodsList :goods="goodsList" class="goodsList"></GoodsList>
    </Scroll>
  </div>
</template>

<script>
import CategoryNavBar from "./CategoryNavBar";
import CategoryParam from "./CategoryParam";

import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

// 调用方法
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
export default {
  name: "CategoryMain",
  components: {
    CategoryNavBar,
    CategoryParam,

    Scroll,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      list: [],
      maitKey: "",
      miniWallkey: "",
      type: "pop",
      subList: [],
      titles: ["综合", "新品", "销量"],
      goodsList: [],
    };
  },
  created() {
    // 请求 导航模块的 数据信息
    this.getCategory();

    // 请求商品信息的数据
    this.getSubcategory("3627");

    //请求更多商品的数据
    this.getCategoryDetail("10062603", "pop");
    this.getCategoryDetail("10062603", "new");
    this.getCategoryDetail("10062603", "sell");
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.type = "pop";
          break;
        case 1:
          this.type = "new";
          break;
        case 2:
          this.type = "sell";
          break;
      }
    },

    // 接收 点击某个导航模块发送过来的 maitKey 值 来进行 对应的数据请求
    itemClick(maitKey, miniWallkey) {
      this.maitKey = maitKey;
      this.miniWallkey = miniWallkey;
      this.getSubcategory(this.maitKey);
      this.getCategoryDetail(this.miniWallkey, this.type);
      this.$refs.scroll.scrollTo(0, 0);
    },

    // 请求 导航类别的数据
    getCategory() {
      getCategory().then((res) => {
        // console.log(res);
        const data = res.data.data.category;
        this.list = data.list;
      });
    },
    // 请求 对应导航类别的对应数据
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((res) => {
        // console.log(res);
        this.subList = res.data.data.list;
        this.$refs.scroll.refresh();
      });
    },
    // 请求更多商品的数据
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then((res) => {
        // console.log(res);
        this.goodsList = res.data;
        this.$refs.scroll.refresh();
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
  padding: 8px 0;
}
.content {
  height: 100%;
  overflow: hidden;
}
.contents {
  height: 100%;
  overflow: hidden;
  width: calc(100% - 100px);
}
.tab-control {
  padding: 15px 0 8px;
}
.goodsList {
  margin-top: 20px;
}
</style>