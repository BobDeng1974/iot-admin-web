<template>
  <div class="page">
    <div class="card-container" v-for="(item, index) in  hardwareSDKData" :key="index">
      <div class="left">
        <div v-if="item.icon" class="img"><img :src="item.icon" alt=""></div>
        <div v-else class="img"><img src="./../../img/filetype_sdk@2x.png" alt=""></div>
        <div>{{item.title}}</div>
      </div>
      <div class="right">
        <div class="guide">
          <a target="_Blank" :href="'http://'+item.docLink">查看指引</a>
        </div>
        <el-button class="download" size="small">
          <a style="border: none" class="download" :href="item.sdkUrl">下载</a>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hardwareSDKData: {
      type: Array
    }
  },
  name: 'downloadList'
};
</script>
<style lang="less" scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  height: 64px;
  /* border: 1px solid; */
  background: #ffffff;
  border: 1px solid #dedfe5;
  border-radius: 1px;
  margin-top: 16px;
  .left {
    display: flex;
    align-items: center;
    padding-left: 24px;
    .img {
      width: 28px;
      height: 28px;
      padding-right: 8px;
      img{
        width: 100%;
        display: inline-block;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    padding-right: 24px;
    .guide {
      padding-right: 16px;
      a {
        font-size: 12px;
        color: #5667ff;
        text-align: center;
      }
    }
    .download {
      font-size: 12px;
      color: #5667ff;
      border: 1px solid #5667ff;
      border-radius: 1px;
    }
  }
  &:hover {
    border: 1px solid #5667ff;
    box-shadow: 0 4px 11px 0 rgba(0, 0, 0, 0.1);
    border-radius: 1px;
  }
}
</style>

