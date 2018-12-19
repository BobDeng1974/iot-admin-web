<template>
  <div class="equipmentDetails-info-warp">

    <div class="mine-r-table">
      <div class="tip-one">
        联网设备明细
      </div>
      <div style="height: 150px;">
        <mine-table :info="info" :tabelParameter='userParameter'></mine-table>
      </div>
    </div>

    <div class="table-mine">
      <div style="text-align: right; margin-bottom: 10px;">
        <el-button type="primary" @click="downLoad">导出统计结果</el-button>
      </div>
      <div>
        <el-table :data="info.list" style="width: 100%" class='table'>
          <el-table-column prop="newUsers"  label="设备id" align="center"></el-table-column>
          <el-table-column prop="applianceType"  label="品类" align="center"></el-table-column>
          <el-table-column prop="sn8"  label="型号码" align="center"></el-table-column>
          <el-table-column prop="sn"  label="设备SN" align="center"></el-table-column>
          <el-table-column prop="code"  label="设备一维码" align="center"></el-table-column>
          <el-table-column prop="province"  label="所在省" align="center"></el-table-column>
          <el-table-column prop="city"  label="所在市" align="center"></el-table-column>
          <el-table-column prop="status"  label="绑定状态" align="center"></el-table-column>
          <el-table-column prop="boundTime"  label="绑定时间" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.boundTime | fomatDate('yyyy-MM-dd')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="activeTime"  label="激活时间" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.activeTime | fomatDate('yyyy-MM-dd')}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter.js';
import mineTable from './mine-table';
import { format } from '@/modules/index/api/system/common.js';
export default {
  components: {
    conHeader,
    mineTable
  },
  created () {
    this.getInfo();
  },
  data() {
    return {
      userParameter: [
        { head: '用户id', body: 'id' },
        { head: '用户手机号', body: 'mobile' },
        { head: '昵称', body: 'nickName' },
        { head: '注册时间', body: 'registerTime' },
        { head: '邮箱', body: 'email' }
      ],
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        userId: '',
        mobile: ''
      },
      info: {
        list: []
      }
    };
  },
  methods: {
    downLoad () {},
    // 查询方法
    getInfo() {
      const query = {
        ...this.formInline
      };
      API.getSmartUserInfo(query)
        .then(res => {
          if (res.code === 0) {
            this.info = res.result;
          } else {
            this.info = {};
          }
        })
        .catch(() => {
          this.info = {};
        });
    }
  },
  filters: {
    fomatDate(val, type) {
      if (!val) return '';
      return format(val, type);
    }
  }
};
</script>

<style lang="less">
.equipmentDetails-info-warp {
  .table-mine{
    margin-top: 35px;
    border-top: 1px solid #ebeef5;
    padding-top: 24px;
  }
  .tip-one {
    // margin-top: 24px;
    line-height: 70px;
    font-size: 20px;
    font-weight: 700;
  }
  .hasBorder {
    border-bottom: 1px solid #333333;
  }
}
</style>
