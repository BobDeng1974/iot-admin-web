<template>
    <div class="account-warp">
        <div class="title-account">
            <con-header :title-icon="addProductsIcon" title="账户管理" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="account-check">
           <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" :rules="rules">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="用户账户" prop="account">
                    <el-input v-model="formInline.account" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="事业部">
                      <el-input v-model="formInline.departmentName" clearable></el-input>
                      <!-- <el-select v-model="formInline.departmentId" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in deparmentList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                      </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="角色">
                      <el-select v-model="formInline.roleId" placeholder="请选择" clearable>
                          <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="授权时间">
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
            <!-- <el-table-column prop="account" label="用户id" align="center"></el-table-column> -->
            <el-table-column prop="account" label="账户" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="realName" label="用户姓名" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="departmentName" label="所在事业部" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="showName" label="角色" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="discription" label="说明" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creator" label="创建人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="授权时间" align="center" show-overflow-tooltip width="150">
              <template slot-scope="scope">
                <div>{{scope.row.urdate | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width='180'>
              <template slot-scope="scope">
                <div v-if="scope.row.status === 0">
                  <span @click="changeRole(scope.row)" v-authority="'b1_userAuthTag'">修改角色</span>
                  <span style="color: #DEDFE5;">|</span>
                  <span @click="forbidRole(scope.row)" v-authority="'b1_userforbidTag'">禁用</span>
                </div>
                <div v-if="scope.row.status === 1">
                  <span @click="userRecover(scope.row)" v-authority="'b1_userRecoverTag'">启用</span>
                </div>
                <!-- <span @click="changeRole(scope.row)">修改角色</span> -->
                <!-- <span style="color: #DEDFE5;">|</span>
                <span @click="deleteRole(scope.row)">删除</span> -->
                <!-- <span style="color: #DEDFE5;">|</span> -->
                <!-- <span @click="forbidRole(scope.row)">{{'禁用'}}</span> -->
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
            <!-- <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="total">
            </el-pagination> -->
        </div>
         <!-- <el-button @click="addRole">新增用户</el-button> -->
        <!-- 弹框 -->
        <mine-dialog :dialogFormVisible='flag' :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <div slot="option">
            <account-info :info='info' :isAdd="isAdd" @close='close' @requesTab="selectSerch(false)"></account-info>
          </div>
        </mine-dialog>
        <!-- <mine-echarts></mine-echarts> -->
    </div>
</template>
<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
import accountInfo from './accountInfo';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import _ from 'lodash';
import minePagination from '@/modules/index/components/mine-pagination';
import { accountMixin } from '@/modules/index/views/mineSystem/mixin';
// import mineEcharts from '@/modules/index/components/echarts/test';
export default {
  components: {
    conHeader,
    mineDialog,
    accountInfo,
    minePagination
    // mineEcharts
  },
  mixins: [ dictMixin, accountMixin ],
  data () {
    return {
      rules: {
        account: { required: true, validator: this.checkAccount, trigger: 'change' }
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
        account: '',
        departmentName: '',
        roleName: '',
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
    this.getAllrole();
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
    // handleCurrentChange(val) {
    //   this.selectSerch(false);
    // },
    selectSerch (flag) {
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.startTime = format(this.formInline.time[0], 'yyyy-MM-dd');
        this.formInline.endTime = format(this.formInline.time[1], 'yyyy-MM-dd');
      } else {
        this.formInline.startTime = '';
        this.formInline.endTime = '';
      }
      if (flag) {
        this.currentPage = 1;
      }
      this.loading = true;
      const params = {
        ...this.formInline,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      API.getUserList(params)
      .then(res => {
        console.log(res, '获取用户列表');
        this.loading = false;
        if (res.code === 0) {
          this.total = res.result ? res.result.total : 0;
          this.tableData = res.result ? this.initTable(res.result.data) : [];
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
    // 处理请求回来的表格数据
    initTable (val) {
      if (!val || !val.length) return [];
      for (let i = 0; i < val.length; i++) {
        let roleList = _.cloneDeep(val[i].name);
        let fectchList = this.fetchRole(roleList);
        val[i].showName = fectchList.join('-');
        // 处理角色数组为空的时候后段返回会把null筛入数组中
        if (val[i].name.indexOf(null) > -1) {
          val[i].name = [];
        }
      }
      return val;
    },
    // 翻译角色
    fetchRole (val) {
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < this.roleList.length; j++) {
          if (this.roleList[j].id === val[i]) {
            val[i] = this.roleList[j].name;
          }
        }
      }
      return val;
    },
    clear () {
      restData(this.formInline);
      this.selectSerch(true);
    },
    // addRole () {
    //   this.flag = true;
    //   this.showClose = true;
    //   this.title = '新增用户';
    //   this.isAdd = true;
    //   this.info = {};
    // },
    // deleteRole (val) {
    //   console.log(val);
    //   const params = {uid: val.uid, account: val.account};
    //   API.deleteUser(params)
    //   .then(res => {
    //     console.log(res, '删除用户');
    //     this.selectSerch(true);
    //   });
    // },
    // 修改角色
    changeRole (val) {
      this.flag = true;
      this.showClose = true;
      this.title = '修改角色';
      this.isAdd = false;
      this.info = {...val};
    },
    // 禁用
    forbidRole (val) {
      this.$confirm('此操作将禁用该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {uid: val.uid};
        API.forbidUser(params)
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
      API.recoverUser(params)
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
          message: '已取消禁用'
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
.account-warp{
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
