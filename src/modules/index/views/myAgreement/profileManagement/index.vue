<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="profile管理"></con-header>
      <div class="page-main-wrapper">
        <!--操作按钮-->
        <div class="operator-wrapper">
          <!-- <el-button class="icon-btn" type="primary" size="small"><i class="icon-download"></i>批量下载</el-button> -->
          <el-button size="small" @click="profileManageCancel">取消</el-button>
          <el-button v-authority="'b1_addProfileTag'" class="icon-btn" type="primary" size="small" @click="addprofile"><i class="icon-add"></i>新增profile文件</el-button>
          <el-button size="small" @click="checkMyUploads">查看我上传的</el-button>
        </div>

        <!--profile列表-->
        <div class="table-wrapper">
          <el-table class="table" :data="dataList" style="width: 100%">
            <!-- <el-table-column prop="id" label="编号" align="center" show-overflow-tooltip width="55"></el-table-column> -->
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="nameZh" label="品类" width="100" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="applianceType" label="品类" width="100" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="sn8" label="型号码" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="Profile名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="状态" width="100" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.releaseStatus===0?'未发布':'已发布' }}</template>
            </el-table-column>
            <el-table-column prop="cdate" label="上传时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mdate" label="更新时间" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="cuid" label="上传人" width="100" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="cName" label="上传人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-authority="'b1_profileGetTag'" type="text" size="small" @click="goToProDetail(scope.row)">详情</el-button>
                <el-button v-authority="'b1_profileUpdateTag'" v-if="scope.row.releaseStatus===0" class="opt-btn" type="text" @click="goToEdit(scope.row)" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--分页查询-->
        <!-- <pagination :currentPage="pageObj.pageNo" :pageSize="pageObj.pageSize" :total="pageObj.total" @pageSize-change="handleSizeChange" @currentPage-change="handleCurrentChange">
        </pagination> -->
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
import pagination from '@/components/awesome/pagination/main';
import { getProfileList } from '../../../api/myAgreement/index';
export default {
  components: {
    'con-header': conHeader,
    pagination
  },
  data() {
    return {
      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 5,

      titleIcon1: '/static/img/title_07@2x.png',
      departmentId: '1',
      // pageObj: {
      //   pageNo: 1,
      //   pageSize: 10,
      //   total: 0
      // },
      dataList: [],
      myCuid: ''
    };
  },
  methods: {
    // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
      }
      return val;
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },

    // 取消按钮
    profileManageCancel() {
      this.myCuid = '';
      this.getProfileDataList();
    },
    // 查看我的上传
    checkMyUploads() {
      this.myCuid =
        this.$store.getters.userInfo.uid ||
        JSON.parse(localStorage.getItem('userInfo')).uid;
      this.getProfileDataList();
    },
    // 获取profile数据列表
    async getProfileDataList() {
      // {"departmentId":"1","pageNo":1,"pageSize":10}
      let params = {
        departmentId:
          this.$store.getters.userInfo.departmentId ||
          JSON.parse(localStorage.getItem('userInfo')).departmentId,
        // pageNo: this.pageObj.pageNo || 1,
        // pageSize: this.pageObj.pageSize || 10,
        pageNo: this.currentPage || 1,
        pageSize: this.pageSize || 5,
        cuid: this.myCuid || ''
      };
      await getProfileList(params).then(res => {
        // console.log(res);
        if (res.code === 0) {
          //   this.dataList = res.result.data || [];
          //   this.pageObj.total = res.result.total;
          // }
          this.total = res.result ? res.result.total : 0;
          this.dataList = res.result ? this.initTableData(res.result.data) : [];
        } else {
          this.dataList = [];
          this.total = 0;
        }
      });
    },
    // 新增profile
    addprofile() {
      this.$router.push({ name: 'AddProfile' });
    },
    // 编辑
    goToEdit(detail) {
      this.$router.push({ name: 'profile编辑', params: { id: detail.id } });
    },
    // 改变pageSize
    // handleSizeChange(val) {
    //   this.pageObj.pageSize = val;
    //   this.getProfileDataList();
    // },

    // 改变currentPage
    handleCurrentChange(val) {
      // this.pageObj.pageNo = val;
      this.getProfileDataList();
    },

    // 跳转详情页
    goToProDetail(row) {
      let id = row.id;
      this.$router.push({ name: 'ProfileDetail', params: { id: id } });
    }
  },
  mounted() {
    this.getProfileDataList();
  }
};
</script>

<style lang="less" scoped>
@import '../agreement.less';
</style>
