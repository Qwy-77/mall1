<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>

    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop";

// 业务组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currenType: "pop",
      isShowBackTop: false,
    };
  },
  created() {
    // 请求多个数据
    this.getHomeMultidatas();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // 接收 GoodsListItem 里面发送的 图片加载完毕 事件
    this.$bus.$on("itemIamageLoad", () => {
      this.$refs.scroll.refresh();
    });
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currenType = "pop";
          break;
        case 1:
          this.currenType = "new";
          break;
        case 2:
          this.currenType = "sell";
          break;
      }
    },

    backClick() {
      // 当点击 BackTop 组件时 通过 scroll组件的 ref 属性拿到该组件 并使用该组件里面的 scroll.scrollTo() 方法实现返回顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    contentScroll(position) {
      // 如果  -position.y 的值(纵坐标) 大于 1000   this.isShowBackTop 就位 ture  则就让 返回按钮显示 否则就隐藏
      this.isShowBackTop = -position.y > 1000;
    },

    loadMore() {
      // 能够监听到上拉加载更多事件后 就再向服务器请求 当前点击的类型款数据 里面的 第二页数据 以此类推
      this.getHomeGoods(this.currenType);
    },

    // 网络请求相关方法
    getHomeMultidatas() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // type 动态获取 请求的数据是哪个类型的
      const page = this.goods[type].page + 1; // 到时候改变 goods 里面的 page 就能请求到多页的数据
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data.data.list);
        // 利用 数组解构方法 把数组里面的每一条数据 添加到 list数组里面的去
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // 此方法可以继续触发 加载事件
        this.$refs.scroll.finishPullUps();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currenType].list;
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  /* height: 10000px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 99;
}
.content {
  /* height: 1000px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 计算高度方法 */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>