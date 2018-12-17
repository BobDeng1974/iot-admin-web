<template>
    <div class="page-container">
      <div class="page-main-con">
        <con-header :titleIcon="titleIcon1" title="首页"></con-header>
        <div class="page-main-wrapper">
          <div class="home-top">
            <div class="home-top-left">
              <img :src="userInfo.profilePicUrl" alt="">
              <div class="user-name">{{userInfo.roleName}}</div>
            </div>
            <div class="home-top-right">
              <div ><span>姓名</span>{{userInfo.realName}}</div>
              <div ><span>mip账号</span>{{userInfo.account}}</div>
              <!-- <div ><span></span>{{userInfo.}}</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        titleIcon1: '/static/img/title_07@2x.png',
        userInfo: ''
    };
  },
  created() {
    // 获取4a登录信息
    this.$store.dispatch('get4AUserInfo').then((res) => {
      this.userInfo = res.result;
    });
  }
};
</script>
<style lang="less" scoped>
.home-top{
  display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding-left: 40px;
  height: 160px;
  background-image: linear-gradient(40deg, #5667FF 0%, #88BFFF 100%);
  .home-top-left{
        padding-right: 32px;
    img{
      width: 80px;
      height: 80px;
      display: inline-block;
    }
    .user-name{
    text-align: center;
    padding-top: 10px;
    }
  }
  .home-top-right{
    >div{
          height: 32px;
    line-height: 32px;
    >span{
      padding-right: 24px;
    }
    }
  }
}
</style>

