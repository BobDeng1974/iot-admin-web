<template>
  <div class="page-wrapper center-wrapper">
      <div class="page-main">
        <div v-if="isShowLeft!=='/downloadCenter'" class="page-left-menu" style="width: 200px;">
          <side-bar  v-show="isShowLeft!=='/developGuideTop'"></side-bar>
        </div>
        <div :class="['page-right-container']" ref="pageRight">
          <breadcrumb v-if="isShowLeft!=='/downloadCenter'" v-show="isShowLeft!=='/developGuideTop'"></breadcrumb>
          <transition name="fadePage" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
  </div>
</template>

<script>
import sideBar from '../awesome/Leftmenu/index';
import breadcrumb from '../awesome/breadcrumb/index';
export default {
  props: {
    isShowLeft: {
      type: String
    }

  },
  name: 'Layout',
  components: {
    'side-bar': sideBar,
    breadcrumb
  },
  watch: {
    // '$refs.pageRight.clientHeight': (oldVal, newVal) => {
    //   console.log(oldVal);
    //   console.log(oldVal);
    //   debugger;
    // }
  },
  mounted() {
    // console.log(this.$refs);
    // console.log(this.$refs.pageRight);
    // console.log(this.$refs.pageRight.clientHeight);
  }
};
</script>

<style lang="less" scoped>
  .page-wrapper {
    margin: 0 auto;
    padding-top: 65px;
    padding-bottom: 16px;
    position: relative;
  }
  .page-main {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    padding-top: 16px;
    box-sizing: border-box;
  }
  .page-right-container {
    width: 1080px;
    padding-left: 32px;
    box-sizing: border-box;
    margin: 0 auto;
  }
</style>
