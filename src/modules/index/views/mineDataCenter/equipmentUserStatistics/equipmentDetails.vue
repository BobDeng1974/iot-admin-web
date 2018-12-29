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
          <el-button @click="checkTokenClick" size="medium" type="primary">导出统计结果</el-button>
          <!-- <el-button @click="checkTokenClick" size="medium" type="primary"><a :disabled="disabled" style="color:#fff" :target="_blank" :href="ExportUrl">导出统计结果</a></el-button> -->

        </div>
        <!--profile属性列表-->
        <div class="table-wrapper">
          <el-table class="table" :data="tableData2" style="width: 100%">
            <el-table-column prop="applianceId" label="设备id" align="center" show-overflow-tooltip width="70"></el-table-column>
            <el-table-column prop="applianceType" label="品类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sn8" label="型号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sn" label="设备SN" show-overflow-tooltip></el-table-column>
            <el-table-column prop="code" label="设备一维码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="province" label="所在省" show-overflow-tooltip></el-table-column>
            <el-table-column prop="city" label="所在市" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="status" label="绑定状态" show-overflow-tooltip></el-table-column> -->
            <el-table-column label="绑定状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.status===1?'已绑定':'未绑定'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="registerTime" label="注册时间" show-overflow-tooltip></el-table-column>
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
import ls from '@/utils/storage/local_storage';
  import { getToken } from '@/utils/auth';
const {
  MJAPP_NAME
} = window.environment.iotserver;
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
        groupIddepartMentName: '开发组',
        applianceType: '品类',
        // sn8: '型号码',
        provinces: '省',
        endTime: '统计时间'
      },
      tableData1: {},
      tableData2: [],
      status: '',

      isAccessToken: true,
      ExportUrl: '',
      _blank: '',
      disabled: true
    };
  },
  methods: {
    checkTokenClick() {
      let params = {
        accesstoken: getToken()
      };
      if (this.tableData2.length === 0) {
        this.$message({
          type: 'info',
          message: '数据为空'
        });
        return;
      }
      debugger;
      API.checktoken(params).then((res) => {
        debugger;

        if (res.code === 0) {
          let link = document.createElement('a');
          link.style.height = '0px';
          link.target = '_blank';
          link.href = `${MJAPP_NAME}/statistics/devicesexport?groupId=${this.tableData1.groupId ? this.tableData1.groupId : ''}&endTime=${this.$route.params.endTime}&applianceType=${this.tableData1.applianceTypeType ? this.tableData1.applianceTypeType : ''}&provinces=${this.tableData1.provincesId ? this.tableData1.provincesId : ''}&cities=${this.tableLabel.citiesId ? this.tableLabel.citiesId : ''}&accessToken=${getToken()}`;
          // link.setAttribute('download', link.href);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          // this.isAccessToken = true;
        } else {
        this.$message({
          type: 'warning',
          message: 'accesstoken失效'
        });
          // this.isAccessToken = false;
        }
      });
    },
    // devicesExport() {
    //     let params = {
    //       groupId: this.$route.params.groupId,
    //       endTime: this.$route.params.endTime,
    //       applianceType: this.tableData1.applianceTypeId,
    //       provinces: this.tableData1.provincesId,
    //       cities: this.tableLabel.citiesId
    //     };
    //     // this.ExportUrl = API.devicesexport ? 'groupId' = this.$route.params.groupId&'endTime'= this.$route.params.endTime;
    //   API.devicesexport(params).then((response) => {
    //     debugger;
    //     console.log(response.headers['Content-disposition']);
    //     let tempNameStr = response.headers['Content-disposition'].split(';')[1];
    //     let fileName = tempNameStr.split('=')[1];
    //     let blob = new Blob([response.data]);
    //     let objectUrl = URL.createObjectURL(blob);
    //     let link = document.createElement('a');
    //     link.style.display = 'none';
    //     link.href = objectUrl;
    //     link.setAttribute('download', fileName);
    //     document.body.appendChild(link);
    //     link.click();
    //   });
    // },
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
          applianceType: this.tableData1.applianceTypeType ? [this.tableData1.applianceTypeType] : [0],
        // typeCode: this.typeCode,
          provinces: this.tableData1.provincesId ? [this.tableData1.provincesId] : [0],
          cities: this.tableData1.citiesId ? [this.tableData1.citiesId] : [0],
          groupId: this.tableData1.groupId || 0,
          endTime: this.$route.params.endTime,
          curPage: this.currentPage || 1,
          pageSize: this.pageSize || 5
        };
        console.log(params);
        API.devicelist(params).then(res => {
          console.log(res);
          if (res.code === 0 && res.result) {
            this.total = res.result ? res.result.totalCount : 0;

            this.status = res.result.status;
            this.tableData2 = res.result.data || [];
            // this.tableData1 = res.result;
          } else {
            // this.tableData1 = {};
            this.tableData2 = [];
            this.total = 0;
          }
        });
      }
    }
  },
 watch: {
  //   isAccessToken: {
  //   deep: true,
  //   // immediate: true,
  //   handler: function (val, oldVal) {
  //     debugger;
  //     this._blank = '_blank';
  //     this.ExportUrl = `${MJAPP_NAME}/statistics/devicesexport?groupId=${this.tableData1.groupId ? this.tableData1.groupId : ''}&endTime=${this.$route.params.endTime}&applianceType=${this.tableData1.applianceTypeType ? this.tableData1.applianceTypeType : ''}&provinces=${this.tableData1.provincesId ? this.tableData1.provincesId : ''}&cities=${this.tableLabel.citiesId ? this.tableLabel.citiesId : ''}&accessToken=${getToken()}`;
  //   }
  // }
 },
  // computed: {
  //   ExportUrl() {
  //     // return `${MJAPP_NAME}/statistics/devicesexport?endTime=${this.$route.params.endTime}&applianceType=${this.tableData1.applianceTypeType ? this.tableData1.applianceTypeType : ''}&provinces=${this.tableData1.provincesId ? this.tableData1.provincesId : ''}&cities=${this.tableLabel.citiesId ? this.tableLabel.citiesId : ''}&accessToken=${getToken()}`;

  //     return `${MJAPP_NAME}/statistics/devicesexport?groupId=${this.tableData1.groupId ? this.tableData1.groupId : ''}&endTime=${this.$route.params.endTime}&applianceType=${this.tableData1.applianceTypeType ? this.tableData1.applianceTypeType : ''}&provinces=${this.tableData1.provincesId ? this.tableData1.provincesId : ''}&cities=${this.tableLabel.citiesId ? this.tableLabel.citiesId : ''}&accessToken=${getToken()}`;
  //   }
  // },
  mounted() {
        //       groupId: this.$route.params.groupId,
    //       endTime: this.$route.params.endTime,
    //       applianceType: this.tableData1.applianceTypeId,
    //       provinces: this.tableData1.provincesId,
    //       cities: this.tableLabel.citiesId
    this.$route.params;
    console.log(ls.getObject('equipmentUserStatistics'));
        debugger;
    this.tableData1 = {
      ...ls.getObject('equipmentUserStatistics'),
      endTime: this.$route.params.endTime
    };

    // this.ExportUrl = `${MJAPP_NAME}/statistics/devicesexport?groupId=${this.tableData1.groupId}&endTime=${this.$route.params.endTime}&applianceType=${this.tableData1.applianceTypeType ? this.tableData1.applianceTypeType : ''}&provinces=${this.tableData1.provincesId ? this.tableData1.provincesId : ''}&cities=${this.tableLabel.citiesId ? this.tableLabel.citiesId : ''}&accessToken=${getToken()}`;
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
