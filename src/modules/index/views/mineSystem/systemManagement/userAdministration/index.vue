<template>
    <div class="user-administration-warp">
        <div class="title-account">
            <con-header :title-icon="addProductsIcon" title="用户管理" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="account-check">
           <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" :rules="rules">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="用户昵称" >
                    <el-input v-model="formInline.nickName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户手机号" prop="account" >
                      <el-input v-model="formInline.account" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="事业部">
                      <el-select v-model="formInline.departmentId" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in deparmentList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="创建时间">
                <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
           </el-form>
           <div class="btn-select" v-authority="'b1_userListTag'">
              <el-button type="primary" @click="selectSerch(true)">筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <!-- 表格部分 -->
        <div class="table-account" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <!-- <el-table-column prop="uid" label="用户id" align="center"></el-table-column> -->
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="nickName" label="用户昵称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="account" label="用户手机号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="realName" label="用户姓名" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="departmentName" label="所在事业部" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="认证状态" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.isMipAuth ? '已认证' : '未认证'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip width="150">
              <template slot-scope="scope">
                <div>{{scope.row.registerTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width='180'>
              <template slot-scope="scope">
                <div v-if="scope.row.status === 0">
                  <span @click="forbidRole(scope.row)" v-authority="'b1_userForbidTag'">禁用</span>
                  <span style="color: #DEDFE5;">|</span>
                  <span @click="authorizedAccess(scope.row)" v-if="!scope.row.isContacter" v-authority="'b1_userSetContactsTag'">授权对接人</span>
                  <span @click="forbidden(scope.row)" v-if="scope.row.isContacter" v-authority="'b1_userDisContactsTag'">取消对接人</span>
                </div>
                <div v-if="scope.row.status === 1">
                  <span @click="userRecover(scope.row)" v-authority="'b1_userRecoverTag'">启用</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
           <mine-pagination
           @numberChange="numberChange"
           :total="total"
           :pageSizes="[5, 10, 20, 50]"
           :page-size="pageSize"
           :current-page="currentPage"
           :layout="'total, prev, pager, next'">
           </mine-pagination>
        </div>
        <!-- 弹框 -->
        <!-- <mine-dialog :dialogFormVisible='flag' :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <div slot="option">
            <account-info :info='info' :isAdd="isAdd" @close='close' @requesTab="selectSerch(false)"></account-info>
          </div>
        </mine-dialog> -->
    </div>
</template>
<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import _ from 'lodash';
import minePagination from '@/modules/index/components/mine-pagination';
import { authenticationManagementMixin } from '@/modules/index/views/mineSystem/mixin';
import moment from 'moment';
export default {
  components: {
    conHeader,
    minePagination
  },
  mixins: [ dictMixin, authenticationManagementMixin ],
  data () {
    return {
      rules: {
        account: { required: true, validator: this.checkMobile, trigger: 'change' }
      },
      loading: false,
      isAdd: false,
      info: {},
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,
      title: '',
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        nickName: '',
        departmentId: '',
        account: '',
        time: [],
        startTime: '',
        endTime: ''
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5
    };
  },
  mounted () {
    this.getAlldeparment();
    this.selectSerch(true);
  },
  methods: {
    close (val) {
      this.flag = val;
    },
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.pageSize = val.pageSize;
          this.selectSerch(false);
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.selectSerch(false);
          break;
        default:
          break;
      }
    },
    selectSerch (flag) {
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.startTime = format(this.formInline.time[0], 'yyyy-MM-dd');
        this.formInline.endTime = format(this.formInline.time[1], 'yyyy-MM-dd');
      } else {
        this.formInline.startTime = '';
        this.formInline.endTime = '';
      }
      // if (this.formInline.time && this.formInline.time.length) {
      //   this.formInline.startTime = format(
      //     this.formInline.time[0],
      //     'yyyy-MM-dd HH:mm:ss'
      //   );
      //   this.formInline.endTime = moment(this.formInline.time[1]).format(
      //     'YYYY-MM-DD 23:59:59'
      //   );
      // } else {
      //   this.formInline.startTime = '';
      //   this.formInline.endTime = '';
      // }
      if (flag) {
        this.currentPage = 1;
      }
      this.loading = true;
      const params = {
        ...this.formInline,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      API.getUserListUcenter(params)
      .then(res => {
        console.log(res, '获取用户列表');
        this.loading = false;
        if (res.code === 0) {
          this.total = res.result ? res.result.total : 0;
          this.tableData = res.result ? this.initTableData(res.result.data) : [];
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
      .catch(() => {
          this.tableData = [];
          this.total = 0;
          this.loading = false;
      });
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '序号')]);
    },
    // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
      }
      return val;
    },
    clear () {
      restData(this.formInline);
      this.selectSerch(true);
    },
    // 授权对接人
    authorizedAccess (val) {
      this.$confirm('此操作将授权对接人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {uid: val.uid, type: 0};
        API.userSetContacts(params)
        .then(res => {
          this.selectSerch(false);
        });
        this.$message({
          type: 'success',
          message: '授权成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消授权'
        });
      });
    },
    // 取消对接人
    forbidden (val) {
      this.$confirm('此操作将取消对接人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {uid: val.uid, type: 0};
        API.disContactsUcenter(params)
        .then(res => {
          this.selectSerch(false);
        });
        this.$message({
          type: 'success',
          message: '取消对接人成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 禁用
    forbidRole (val) {
      this.$confirm('此操作将禁用该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {uid: val.uid};
        API.forbidUserUcenter(params)
        .then(res => {
          console.log(res, '禁用用户');
          this.selectSerch(false);
        });
        this.$message({
          type: 'success',
          message: '禁用成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        });
      });
    },
    // 启用
    userRecover (val) {
      this.$confirm('此操作将启用该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      const params = {uid: val.uid};
      API.recoverUserUcenter(params)
      .then(res => {
        console.log(res, '启用用户');
        this.$message({
          type: 'success',
          message: res.message
        });
        this.selectSerch(false);
      });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        });
      });

      // const params = {uid: val.uid};
      // API.recoverUser(params)
      // .then(res => {
      //   console.log(res, '启用用户');
      //   this.selectSerch(false);
      // });
    }
  },
  filters: {
    fomatDate (val, type) {
      if (!val) return '';
      return format(val, type);
    }
  }
};
</script>

<style lang="less">
.user-administration-warp{
  .account-check{
    margin-top: 24px;
    .is-required{
      .el-form-item__label:before{
        content: '' !important;
      }
    }
    .el-input{
      width: 230px;
    }
  }
  //  .fenye{
  //   text-align: right;
  //   margin-top: 16px;
  //  }
  .btn-select{
    text-align: right;
    // margin-top: 24px;
  }
  .table-account{
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #DEDFE5;
    td {
      span{
        padding: 0 2px;
        color: #5667FF;
      }
      span:hover{
        cursor: pointer;
        // color: #5667FF;
      }
    }
  }
}
</style>

