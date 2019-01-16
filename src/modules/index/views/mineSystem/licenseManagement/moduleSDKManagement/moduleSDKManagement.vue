<template>
  <div class="module-sdk">
    <con-header
      :titleIcon="titleIcon1"
      title="模块SDK发布管理"
    ></con-header>
    <div class="query-wrapper clearfix">
      <el-form
        class="query-form"
        ref="query-form"
        :model="queryFormData"
        :inline="true"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="SDK版本">
              <el-input v-model.trim="queryFormData.sdkVerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="芯片信息">
              <el-select
                filterable
                clearable
                v-model.trim="queryFormData.userInfo"
              >
                <el-option
                  v-for="(item, index) in userInfoList"
                  :key="index"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                filterable
                clearable
                v-model.trim="queryFormData.status"
              >
                <el-option
                  v-for="(item, index) in statusList"
                  :key="index"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              class="pull-right query-btn"
              size="medium"
              @click="clear"
            >清除</el-button>
            <el-button
              class="pull-right query-btn"
              type="primary"
              size="medium"
              @click="handleQuery"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
        <!--Lua协议列表-->
        <div class="table-wrapper">
          <el-table v-loading="loading" class="table" :data="dataList" style="width: 100%">
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="name" label="SDK名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="版本号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="芯片信息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="功能描述" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="生效时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="提交人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="审核人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-authority="" type="text" size="small" @click="detailSdk(scope.row)">详情</el-button>
                <el-button v-authority="" type="text" size="small" @click="issueSdk(scope.row)">发布</el-button>
                <el-button v-authority="" v-if="scope.row.publicStatus===1" class="opt-btn" type="text" size="small" @click="editSdk(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="myPagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
  </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
export default {
  components: { conHeader },
  data() {
    return {
      titleIcon1: '/static/img/title_07@2x.png',
      queryFormData: {
        sdkVerson: '',
        userInfo: '',
        stauts: ''
      },
      userInfoList: [{ value: 1, id: 1 }],
      statusList: [{ value: 1, id: 1 }],
      dataList: [],
            // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: false
    };
  },
  methods: {
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
        // 改变pageSize
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 改变currentPage
    handleCurrentChange(val) {

    },
    handleQuery() {},
    clear() {},
    detailSdk() {},
    editSdk() {},
    issueSdk() {}
  }
};
</script>
<style lang="less" scoped>
@import "./moduleSDKManagement.less";
</style>

