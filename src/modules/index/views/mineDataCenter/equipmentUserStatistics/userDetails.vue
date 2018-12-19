<template>
  <div class="user-details-info-warp">

    <div class="mine-r-table">
      <div class="tip-one">
          用户明细
      </div>
      <div style="height: 150px;">
        <mine-table :info="info" :tabelParameter='userParameter'></mine-table>
      </div>
    </div>

    <div class="table-mine">
      <div>
        <el-table :data="info.list" style="width: 100%" class='table'>
          <el-table-column prop="uid"  label="用户id" align="center"></el-table-column>
          <el-table-column prop="nickName"  label="昵称" align="center"></el-table-column>
          <el-table-column prop="email"  label="邮箱" align="center"></el-table-column>
          <el-table-column prop="mobile"  label="手机号" align="center"></el-table-column>
          <el-table-column prop="registerTime"  label="注册时间" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.registerTime | fomatDate('yyyy-MM-dd')}}</div>
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
.user-details-info-warp {
  .tip-one {
    // margin-top: 24px;
    line-height: 70px;
    font-size: 20px;
    font-weight: 700;
  }
  .hasBorder {
    border-bottom: 1px solid #333333;
  }
  .table-mine{
    margin-top: 35px;
    border-top: 1px solid #ebeef5;
    padding-top: 24px;
  }
}
</style>
