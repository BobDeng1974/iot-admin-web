<template>
  <div>
    <!-- <con-header :title-icon="hardwareSDKIcon" title="下载中心" :hasBottomBorder="false"></con-header>
    <div class="title">硬件SDK下载</div>
    <div class="line"></div>
    <download-list :hardwareSDKData="hardwareSDKData"></download-list>
    <div class="title">软件SDK下载</div>
    <div class="line"></div>
    <download-list :hardwareSDKData="softwareSDKData"></download-list> -->
    <!-- <el-button @click="test"></el-button> -->
    <div v-html="content" class='tableConten'></div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import downloadList from './../../components/download/downloadList';
import API from '@/modules/index/api/myProductsData';
export default {
  components: { conHeader, downloadList },
  data() {
    return {
      content: '',
      hardwareSDKIcon: '/static/img/title_11@2x.png',
      hardwareSDKData: [
        // { hardwareSDK: 'SDK20180203' },
        // { hardwareSDK: 'SDK20180201' },
        // { hardwareSDK: 'SDK20180204' },
        // { hardwareSDK: 'SDK20180208' }
      ],
      softwareSDKData: [
        // { hardwareSDK: 'SDK20180209' },
        // { hardwareSDK: 'SDK20180201' },
        // { hardwareSDK: 'SDK20180204' },
        // { hardwareSDK: 'SDK20180208' }
      ]
    };
  },
  methods: {
    test() {
      // this.$router.push({ name: '详情', params: { id: Obj.detail.id } });
      // this.$router.push({name: 'IOS SDK', params: {id: 10}});
    },
    getDownloadList() {
      let params = {
        docType: 2
      };
      API.downloadGetall(params).then(result => {
        // debugger;
        this.content = result.result.content;
        // result.result.push(
        //   {
        //     id: 1,
        //     title: '1',
        //     sdkType: 1,
        //     sdkUrl: 'aa',
        //     icon: 'aa',
        //     docLink: 'qq'
        //   },
        //   {
        //     id: 2,
        //     title: '1',
        //     sdkType: 2,
        //     sdkUrl: 'aa',
        //     icon: 'aa',
        //     docLink: 'qq'
        //   }
        // );
        // if (result.code === 0 && result.result.length > 0) {
        //   for (let index = 0; index < result.result.length; index++) {
        //     const element = result.result[index];
        //     if (element.sdkType === 1) {
        //       this.hardwareSDKData.push(element);
        //     } else {
        //       this.softwareSDKData.push(element);
        //     }
        //   }
        // }
        // debugger;
      });
    }
  },
  created() {
    this.getDownloadList();
  }
};
</script>

<style lang="less">
.tableConten {
  table {
    background-color: #fff !important;
    border-left: 1px solid #ebeef5 !important;
    border-top: 1px solid #ebeef5 !important;
    border-right: 1px solid #ebeef5 !important;
    border-bottom: 1px solid #ebeef5 !important;
    tbody {
      tr:first-child td {
        white-space: nowrap !important;
        overflow: hidden !important;
        user-select: none !important;
        text-align: left !important;
        padding: 12px 10px !important;
        background: #f6f6f6 !important;

      }
      tr td {
        background-color: #fff !important;
        padding: 12px 10px !important;
        min-width: 0 !important;
        -webkit-box-sizing: border-box !important;
        box-sizing: border-box !important;
        text-overflow: ellipsis !important;
        vertical-align: middle !important;
      }
    }

    // background-color: red!important;
  }
  p {
    font-size: 16px;
    font-weight: 700;
    color: #303133;
  }
}
// .title {
//   font-size: 16px;
//   color: #333333;
//   height: 48px;
//   line-height: 48px;
//   font-weight: 700;
//   border-bottom: 1px solid #dedfe5;
// }
// .line {
//   width: 100%;
//   height: 1px;
//   background-color: #dedfe5;
//   margin-bottom: 24px;
// }
</style>
