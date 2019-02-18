<template>
  <div class="module-sdk">
    <con-header
      :titleIcon="titleIcon1"
      title="模块SDK发布管理"
    ></con-header>
    <div class="query-wrapper clearfix">
      <el-form
        class="query-form demo-ruleForm"
        ref="query-form"
        ide-required-asterisk="true"
        :model="queryFormData"
        :inline="true"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="SDK版本" prop="version" >
              <el-input v-model.trim="queryFormData.version" clearable></el-input>
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
                  v-for="(item, index) in chipModelList"
                  :key="index"
                  :label="item.name"
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
          <el-col v-authority="'moduleSDKManagement_list'" :span="24">
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
          <el-button type="primary" v-authority="'moduleSDKManagement_create'"   @click="addSdk">新增模块SDK</el-button>
        </span>
      </div>
    </div>
      <!--Lua协议列表-->
    <div class="table-wrapper">
      <el-table v-loading="loading" class="table" :data="dataList" style="width: 100%">
        <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
        <el-table-column prop="name" label="SDK名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="version" label="版本号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="chipName" label="芯片信息" show-overflow-tooltip></el-table-column>
        <el-table-column prop="description" label="功能描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip align="left">
          <template slot-scope="scope">
            <div>
              <span  v-if="scope.row.status === 0">编辑</span>
              <span  v-if="scope.row.status === 1">待审核</span>
              <span  v-if="scope.row.status === 2">审核通过</span>
              <span  v-if="scope.row.status === 3">审核失败</span>
              <span  v-if="scope.row.status === 4">已发布</span>
              <span  v-if="scope.row.status === 99">已删除</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="activeTime" label="生效时间" show-overflow-tooltip></el-table-column>
        <el-table-column  label="提交人" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.creatorName|filtersCreatorName(noticeMipAccountsListArr)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column  label="审核人" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.auditorName|filtersAuditorName(noticeMipAccountsListArr)}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <!-- v-authority="" -->
            <el-button v-if="scope.row.status!==3" type="text" size="small" v-authority="'moduleSDKManagement_get'" @click="detailSdk(scope.row)">详情</el-button>
            <el-button  v-if="scope.row.status===2" type="text" size="small" v-authority="'moduleSDKManagement_publish'"  class="opt-btn"  @click="issueSdk(scope.row)">发布</el-button>
            <el-button  v-if="scope.row.status===3" class="" type="text" size="small" v-authority="'moduleSDKManagement_get'"  @click="editSdk(scope.row)">详情</el-button>
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
          <add-dialog  :flag="flag" :noticeMipAccountsList="noticeMipAccountsListArr" @close="close" @handleSave="addHandleSave"></add-dialog>
        </div>
        <div slot="option" v-else-if="isEdit">
          <div v-if="status!==1">
          <!-- <div v-if="!isDetails"> -->
            <edit-dialog :noticeMipAccountsList="noticeMipAccountsListArr" :flag="flag" :editDetailData="editDetailData" :sdkId="sdkId" :isDetails="isDetails" @close="close"  @handleSave="handleSaveEdit"></edit-dialog>
          </div>
          <div v-else >
            <detail-dialog :noticeMipAccountsList="noticeMipAccountsListArr" :flag="flag" :editDetailData="editDetailData" :sdkId="sdkId" :isDetails="isDetails" @close="close" @handleSave="addHandleSave"></detail-dialog>
            <!-- <div v-if="status===1">
              <detail-dialog  :flag="flag" :editDetailData="editDetailData" :sdkId="sdkId" :isDetails="isDetails" @close="close" @handleSave="addHandleSave"></detail-dialog>
            </div>
            <div v-else>
              <edit-dialog :flag="flag" :editDetailData="editDetailData" :sdkId="sdkId" :isDetails="!isDetails" @close="close"  @handleSave="handleSaveEdit"></edit-dialog>
            </div> -->
          </div>
        </div>
        <div slot="option" v-else>
          <issue-dialog :sdkId="sdkId" @close="close" @handleSave="issueHandleSave"></issue-dialog>
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
import detailDialog from './detailDialog';
import issueDialog from './issueDialog';
import moduleSdkApi from '@/modules/index/api/myProductsData/moduleSdk';
import commonFun from '@/common/js/func';
import { moduleSdkMixin } from '@/common/js/validation';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
export default {
  mixins: [moduleSdkMixin, dropDownTranslation],
  components: {conHeader, mineDialog, addDialog, editDialog, issueDialog, detailDialog},
  data() {
    return {
      // 弹框的参数开始
      dialogWidth: '45%',
      isDetails: false,
      isAdd: false,
      isEdit: false,
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      // 弹框的参数结束
      sdkId: '',
      titleIcon1: '/static/img/title_07@2x.png',
      queryFormData: {
        version: '',
        chip: '',
        status: ''
      },
      // chipModelList: [{ value: 1, id: 1 }],
      statusList: [
        { value: '编辑', id: 0 },
        { value: '待审核', id: 1 },
        { value: '审核通过', id: 2 },
        { value: '审核失败', id: 3 },
        { value: '已发布', id: 4 }
        ],
      dataList: [
        // {id: 1, name: '0', version: '0.0', chip: '0', description: '0', compileChain: 'compileChain', activeTime: '2019-12-11', sdkUrl: 'sdkUrl', reportUrl: 'reportUrl', auditMipAccounts: 'auditMipAccounts', noticeMipAccounts: 'noticeMipAccounts', publisherName: 'publisherName', auditorName: 'auditorName', status: 0},
        // // {id: 2, name: '1', status: 1},
        // {id: 2, name: '1', version: '0.0', chip: '0', description: '0', compileChain: 'compileChain', activeTime: '2019-12-11', sdkUrl: 'sdkUrl', reportUrl: 'reportUrl', auditMipAccounts: 'auditMipAccounts', noticeMipAccounts: 'noticeMipAccounts', publisherName: 'publisherName', auditorName: 'auditorName', status: 1},

        // {id: 3, name: '2', status: 2},
        // {id: 4, name: '3', status: 3},
        // {id: 4, name: '3', version: '0.0', chip: '0', description: '0', compileChain: 'compileChain', activeTime: '2019-12-11', sdkUrl: 'sdkUrl', reportUrl: 'reportUrl', auditMipAccounts: 'auditMipAccounts', noticeMipAccounts: 'noticeMipAccounts', publisherName: 'publisherName', auditorName: 'auditorName', status: 3},
        // {id: 5, name: '4', status: 4}
      ],
            // 分页
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: false,
      rules: {
        version: { required: true, validator: this.checkVersion, trigger: 'blur' }
      },
      editDetailData: {},
      status: ''
    };
  },
  beforeCreate() {

  },
  created() {
    this.moduleSDKManagementNoticeMip();
    this.$router;
    this.$route;
    console.log(this.$route, 'moduleSDKManagement');
    console.log(this.$router.currentRoute, 'moduleSDKManagement');
    // this.noticeMipAccountsListArr;
    this.getChipModelJson();
    this.initListData(true);
  },
  filters: {
    filtersCreatorName(val, noticeMipAccountsListArr) {
       let account = commonFun.fetchWord(
              val,
              'name',
              noticeMipAccountsListArr,
              'account'
            );
      return `${val}${account ? '(' : ''}${account} ${account ? ')' : ''}`;
    },
    filtersAuditorName(val, noticeMipAccountsListArr) {
      if (!val) {
        return '';
      }
          let account = commonFun.fetchWord(
              val,
              'name',
              noticeMipAccountsListArr,
              'account'
            );
      return `${val}${account ? '(' : ''}${account} ${account ? ')' : ''}`;
    }
  },
  methods: {
    initListData(flag) {
      this.loading = true;
      if (flag) {
        this.currentPage = 1;
      }
      let params = {
        ...this.queryFormData,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      console.log(params, '参数');

      moduleSdkApi.sdkpackageinfoList(params).then((res) => {
        // debugger;
        this.loading = false;
        if (res.code === 0) {
          if (res.result.total !== 0 && res.result.data.length === 0) {
            this.initListData(true);
          }
          this.total = res.result ? res.result.total : 0;
          this.dataList = res.result ? this.initTableData(res.result.data) : [];
        } else {
          this.dataList = [];
          this.total = 0;
        }
      }).catch(() => {
          // this.initTableData(this.dataList);
          this.dataList = [];
          this.total = 0;
          this.loading = false;
      });
    },
    // 弹框函数开始
    close(val) {
      this.flag = val;
    },
    addHandleSave(val) {
      commonFun.restData(this.queryFormData);
      this.flag = val;
      this.initListData(true);
    },
    handleSaveEdit(val) {
      commonFun.restData(this.queryFormData);
      this.flag = val;
      this.initListData(true);
    },
    issueHandleSave(val) {
      commonFun.restData(this.queryFormData);
      this.flag = val;
      this.initListData(true);
    },
    // 弹框的函数结束
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
        // 给请求回来的表格数据新增index属性（序号）
    initTableData (val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = ((this.currentPage - 1) * this.pageSize) + i + 1;
      }
      return val;
    },
        // 改变pageSize
    handleSizeChange(val) {
      debugger;
      this.pageSize = val;
      this.initListData(true);
    },
    // 改变currentPage
    handleCurrentChange(val) {
      debugger;
      this.initListData(false);
    },
    handleQuery() {
      this.initListData(true);
    },
    clear() {
      commonFun.restData(this.queryFormData);
      // this.chipModelList = [];
      // this.statusList = [];
      this.initListData(true);
    },
    addSdk() {
      this.isAdd = true;
      this.isEdit = false;
      this.flag = true;
      this.title = '上传SDK';
    },
    editSdk(val) {
      debugger;
      this.sdkId = val.id;
      this.isAdd = false;
      this.isEdit = true;
      this.isDetails = true;
      this.flag = true;
      this.title = val.name;
      this.editDetailData = val;
      this.status = val.status;
    },
    detailSdk(val) {
      debugger;
      this.sdkId = val.id;
      this.isAdd = false;
      this.isEdit = true;
      this.isDetails = true;
      this.flag = true;
      this.title = val.name;
      this.editDetailData = val;
      this.status = val.status;
    },
    issueSdk(val) {
      this.sdkId = val.id;
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

