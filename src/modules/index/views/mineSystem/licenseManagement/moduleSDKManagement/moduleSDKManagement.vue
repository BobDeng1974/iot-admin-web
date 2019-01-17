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
              <el-input v-model.trim="queryFormData.version"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="芯片信息">
              <el-select
                filterable
                clearable
                v-model.trim="queryFormData.chip"
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
          <el-col :span="24">
            <el-button
              class="pull-right query-btn"
              @click="clear"
            >清除</el-button>
            <el-button
              class="pull-right query-btn"
              type="primary"
              @click="handleQuery"
            >查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class='sdk-add-btn'>
        <span class="btn-select">
          <el-button type="primary"  @click="addSdk">新增模块SDK</el-button>
        </span>
      </div>
    </div>
      <!--Lua协议列表-->
    <div class="table-wrapper">
      <el-table v-loading="loading" class="table" :data="dataList" style="width: 100%">
        <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
        <el-table-column prop="name" label="SDK名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="version" label="版本号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="chip" label="芯片信息" show-overflow-tooltip></el-table-column>
        <el-table-column prop="desc" label="功能描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip align="left">
          <template slot-scope="scope">
            <div>
              <span  v-if="scope.row.status === 0">草稿</span>
              <span  v-if="scope.row.status === 1">待审核</span>
              <span  v-if="scope.row.status === 2">审核通过</span>
              <span  v-if="scope.row.status === 3">审核失败</span>
              <span  v-if="scope.row.status === 4">已发布</span>
              <span  v-if="scope.row.status === 99">已删除</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="activeTime" label="生效时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="publisherName" label="提交人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="auditorName" label="审核人" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- v-authority="" -->
            <el-button  type="text" size="small" @click="detailSdk(scope.row)">详情</el-button>
            <el-button  v-if="scope.row.status===2" type="text" size="small" class="opt-btn"  @click="issueSdk(scope.row)">发布</el-button>
            <el-button  v-if="scope.row.status===1" class="opt-btn" type="text" size="small" @click="editSdk(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="myPagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 弹框 -->
    <div>
      <mine-dialog :dialogFormVisible='flag' :width='dialogWidth' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
        <div slot="option" v-if="isAdd">
          <add-dialog @close="close" @handleSave="addHandleSave"></add-dialog>
        </div>
        <div slot="option" v-else-if="isEdit">
          <edit-dialog :flag="flag" :isDetails="isDetails" @close="close" :editDataId="editDataId" @handleSave="handleSaveEdit"></edit-dialog>
        </div>
        <div slot="option" v-else>
          <issue-dialog @close="close" @handleSave="issueHandleSave"></issue-dialog>
        </div>
      </mine-dialog>
    </div>
  </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
import mineDialog from '@/modules/index/components/mine-dialog';
import addDialog from './addDialog';
import editDialog from './editDialog';
import issueDialog from './issueDialog';
export default {
  components: {conHeader, mineDialog, addDialog, editDialog, issueDialog},
  data() {
    return {
      // 弹框的参数开始
      dialogWidth: '45%',
      isDetails: false,
      isAdd: false,
      isEdit: false,
      editDataId: '',
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      // 弹框的参数结束

      titleIcon1: '/static/img/title_07@2x.png',
      queryFormData: {
        version: '',
        chip: '',
        status: ''
      },
      userInfoList: [{ value: 1, id: 1 }],
      statusList: [{ value: 1, id: 1 }],
      dataList: [
        {name: 0, status: 0},
        {name: 1, status: 1},
        {name: 2, status: 2},
        {name: 3, status: 3},
        {name: 4, status: 4}
      ],
            // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: false
    };
  },
  methods: {
    // 弹框函数开始
    close(val) {
      this.flag = val;
    },
    addHandleSave() {},
    handleSaveEdit() {},
    issueHandleSave() {},
    // 弹框的函数结束
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
    addSdk() {
      this.isAdd = true;
      this.isEdit = false;
      this.flag = true;
      this.title = '上传SDK';
    },
    editSdk() {
      this.isAdd = false;
      this.isEdit = true;
      this.flag = true;
      this.title = '编辑SDK';
    },
    detailSdk() {},
    issueSdk() {
      this.isAdd = false;
      this.isEdit = false;
      this.flag = true;
      this.title = '确认发布';
    }
  }
};
</script>
<style lang="less" scoped>
@import "./moduleSDKManagement.less";
</style>

