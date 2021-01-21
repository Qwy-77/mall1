<template>
  <div class="Profile">
    <NavBar class="profile-navbar">
      <div slot="center">小码哥商城</div>
    </NavBar>

    <ProfileUser></ProfileUser>

    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <ProfileList :list-data="orderList" class="order-list"></ProfileList>
    <ProfileList :list-data="serviceList" class="service-list"></ProfileList>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ProfileUser from "./childrenComps/ProfileUser";
import ProfileList from "./childrenComps/ProfileList";
export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileUser,
    ProfileList,
  },
  data() {
    return {
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#point", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#vip", iconColor: "#ffc636", info: "会员卡" },
      ],
      serviceList: [
        { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#download", iconColor: "#ff8198", info: "下载购物APP" },
      ],
    };
  },
};
</script>

<style scoped>
.Profile {
  background-color: #f2f2f2;
}
.profile-navbar {
  background-color: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
}
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>