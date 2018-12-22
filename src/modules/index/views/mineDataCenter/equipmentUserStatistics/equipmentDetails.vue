<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="设备明细"></con-header>
      <div class="page-main-wrapper">
        <div class="details-table">
          <table class="table-detail" border="1" bordercolor="#ebeef5">
            <tbody>
              <tr v-for="(val, key) in tableLabel" :key="key">
                <td class="col-label">
                  <span>{{val}}</span>
                </td>
                <td class="col-content">
                  <span>{{tableData1[key]}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="export">
          <el-button size="medium" @click="devicesExport" type="primary">导出统计结果</el-button>
        </div>
        <!--profile属性列表-->
        <div class="table-wrapper">
          <el-table class="table" :data="tableData2" style="width: 100%">
            <el-table-column prop="applianceId" label="设备id" align="center" show-overflow-tooltip width="70"></el-table-column>
            <el-table-column prop="applianceType" label="品类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="propertyName" label="型号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sn" label="设备SN" show-overflow-tooltip></el-table-column>
            <el-table-column prop="code" label="设备一维码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="province" label="所在省" show-overflow-tooltip></el-table-column>
            <el-table-column prop="city" label="所在市" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="绑定状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="boundTime" label="绑定时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="activeTime" label="激活时间" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="myPagination">
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter';
export default {
  components: {
    'con-header': conHeader
  },
  data() {
    return {
            // 分页
      currentPage: 1,
      total: 0,
      pageSize: 5,

      titleIcon1: '/static/img/title_05@2x.png',
      tableLabel: {
        name: '开发组',
        applianceType: '品类',
        sn8: '型号码',
        province: '省',
        boundTime: '首次绑定时间'
      },
      tableData1: {},
      tableData2: [],
      status: ''
    };
  },
  methods: {
    devicesExport() {
        let params = {
          groupId: this.$route.params.groupId,
          endTime: this.$route.params.endTime,
          applianceType: this.tableData1.applianceType,
          provinces: this.tableData1.province
          // cities: this.tableLabel.citie
        };
      API.devicesexport(params).then((res) => {

      });
    },
          // 改变currentPage
    handleCurrentChange(val) {
      // this.pageObj.pageNo = val;
      this.getDevicelistDetail();
    },
    // 获取详情数据
    getDevicelistDetail() {
      let id = this.$route.params.endTime;
      // debugger;
      if (typeof id !== 'undefined') {
        let params = {
          groupId: Number(this.$route.params.groupId),
          endTime: this.$route.params.endTime,
          curPage: this.currentPage || 1,
          pageSize: this.pageSize || 5
        };
        console.log(params);
        API.devicelist(params).then(res => {
          console.log(res);
          if (res.code === 0 && res.result) {
            this.total = res.result ? res.result.totalPage : 0;

            this.status = res.result.status;
            this.tableData2 = res.result.data || [];
            this.tableData1 = res.result;
          } else {
            this.tableData1 = {};
            this.tableData2 = [];
            this.total = 0;
          }
        });
      }
    }
  },
  mounted() {
    this.$route.params;
    debugger;
    // this.getProfileDetail();
    this.getDevicelistDetail();
  }
};
</script>

<style lang="less" scoped>
// @import '../agreement.less';
.details-table{
  margin-top: 24px;
}
.export{
  width: 100%;
      margin: 10px 0px 24px;
    display: flex;
    justify-content: flex-end;
}
</style>
