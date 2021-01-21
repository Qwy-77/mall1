<template>
  <div class="ProfileUser">
    <div class="user-info">
      <div class="info-img">
        <img src="~assets/img/common/user.jpg" alt="" />
      </div>
      <div class="info-title">
        <div class="info-sp">登录/注册</div>
        <div class="info-other">
          <div class="info-icon"></div>
          <div class="info-phone">暂无绑定手机号</div>
        </div>
      </div>
      <div class="info-right">
        <i class="arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUser",
};
</script>

<style  scoped>
.user-info {
  display: flex;
  padding: 15px;
  background-color: var(--color-tint);
  color: #ffffff;
}
.info-img {
  width: 60px;
  height: 60px;
  margin-right: 12px;
}
.info-img img {
  width: 100%;
  height: 100%;
}
.info-title {
  flex: 1;
  margin-top: 5px;
}
.info-other {
  display: flex;
  font-size: 13px;
  margin-top: 3px;
}
.info-other .info-icon {
  font-family: "icomoon";
  font-size: 17px;
  margin-top: 5px;
}
.info-right {
  width: 13px;
  height: 13px;
  margin-top: 16px;
}
</style>