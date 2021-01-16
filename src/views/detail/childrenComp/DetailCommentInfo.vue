<template>
  <div class="DetailCommentInfo" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="info-conten">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="data">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img
          :src="item"
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
    },
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style  scoped>
.DetailCommentInfo {
  padding: 10px 13px 22px;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  padding: 10px 0 14px;
  overflow: hidden;
  border-bottom: 2px solid #f2f5f8;
  font-size: 15px;
  color: #333;
}
.header-title {
  float: left;
}
.header-more {
  float: right;
  margin-right: 10px;
}
.info-user {
  margin: 10px 0;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  vertical-align: middle;
}
.info-user span {
  font-size: 16px;
  color: #333;
  margin-left: 10px;
}
.info-conten p {
  font-size: 14px;
  padding-bottom: 10px;
}
.info-other {
  font-size: 10px;
  color: #999;
}
.data {
  margin-right: 8px;
}

.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>