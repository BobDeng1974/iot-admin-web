<template>
  <div>
    <con-header :title-icon="hardwareSDKIcon" title="下载中心" :hasBottomBorder="false"></con-header>
    <div class="title">硬件SDK下载</div>
    <div class="line"></div>
    <download-list :hardwareSDKData="hardwareSDKData"></download-list>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import downloadList from './../../../components/download/downloadList';
export default {
  components: { conHeader, downloadList },
  data() {
    return {
      hardwareSDKIcon: '/static/img/title_11@2x.png',
      hardwareSDKData: [
        { hardwareSDK: 'SDK20180203' },
        { hardwareSDK: 'SDK20180201' },
        { hardwareSDK: 'SDK20180204' },
        { hardwareSDK: 'SDK20180208' }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  color: #333333;
  height: 48px;
  line-height: 48px;
  font-weight: 700;
  border-bottom: 1px solid #dedfe5;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #dedfe5;
  margin-bottom: 24px;
}
</style>
