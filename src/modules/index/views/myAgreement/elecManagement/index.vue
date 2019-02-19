<template>
    <div class="page-container">
      <div class="page-main-con">
        <con-header :titleIcon="titleIcon1" title="首页"></con-header>
        <div class="page-main-wrapper">
          <div class="user-title">个人信息</div>
          <div class="home-top">
            <div class="home-top-left">
              <img :src="userInfo.profilePicUrl" alt="">
              <div class="user-name">{{userInfo.roleName}}</div>
            </div>
            <div class="line"></div>
            <div class="home-top-right">
              <div ><span>姓名</span>{{userInfo.realName}}</div>
              <div ><span>mip账号</span>{{userInfo.account}}</div>
              <div ><span>邮箱</span>{{userInfo.email}}</div>
              <!-- <div ><span></span>{{userInfo.}}</div> -->
            </div>
          </div>
          <div class="user-title">登录记录</div>
            <!--Lua协议列表-->
        <div class="table-wrapper">
          <el-table  class="table" :data="userInfo.loginRecords" style="width: 100%">
            <el-table-column prop="id" label="id" show-overflow-tooltip></el-table-column>
            <el-table-column prop="loginTime" label="登录时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="loginIp" label="登录ip"  show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
export default {
    components: {
    'con-header': conHeader
  },
  data() {
    return {
        titleIcon1: '/static/img/title_04@2x.png',
        userInfo: ''
    };
  },
  created() {
    // 获取4a登录信息
    this.$store.dispatch('get4AUserInfo').then((res) => {
      this.userInfo = res.result;
      this.$store.dispatch('getMeauAuthed', {uid: this.userInfo.account}).then(res => {
      });
    });
  }
};
</script>
<style lang="less" scoped>
.user-title{
  font-size: 16px;
color: #333333;
font-weight: 700;
    height: 44px;
    padding-top: 24px;
    line-height: 44px;
}
.home-top{
  .line{
    width: 1px;
    height: 80px;
    background-color: #DEDFE5;
    margin-right: 31px;
  }
  display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding-left: 40px;
  height: 160px;
  // background-image: linear-gradient(40deg, #5667FF 0%, #88BFFF 100%);
      // background-image: linear-gradient(40deg, #5667FF14, #88BFFF14);
  background-image: linear-gradient(40deg,  hsla(212, 100%, 77%, 0.078), hsla(234, 100%, 67%, 0.078));
  .home-top-left{
        padding-right: 32px;
    img{
      width: 80px;
      height: 80px;
      display: inline-block;
    }
    .user-name{
    text-align: center;
    padding-top: 12px;
    font-weight: 700;
    }
  }
  .home-top-right{
    >div{
          height: 32px;
    line-height: 32px;
    >span{
      padding-right: 24px;
          width: 70px;
    display: inline-block;
    }
    }
  }
}
</style>

