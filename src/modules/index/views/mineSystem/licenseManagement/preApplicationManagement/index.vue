
<template>
    <div class="preApplicationManagement-warp">
        <div class="title-mip">
            <con-header :title-icon="addProductsIcon" title="license预申请列表" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="mip-check">
           <el-form :inline="true" :model="formInline"  label-width="180px" class="demo-form-inline" >
            <el-row>
                <el-col :span="12">
                  <el-form-item label="模组厂商">
                      <el-select v-model="formInline.supplyId" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in applyList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="创建时间">
                    <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           <div class="applicationManagement-row">
            <span class="btn-select-right" v-authority="'b1_preApplyListTag'">
              <el-button type="primary" @click="getList(true)" >筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
            </span>
           </div>
           <div>
            <!-- <span class="btn-select">
              <el-button type="primary" @click="eidtPreApplication" v-authority="'b1_doPreApplyTag'">新增预申请</el-button>
            </span> -->

           </div>

        </div>
        <!-- 表格部分 -->
        <div class="table-breadcrumb" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"   class='table'>
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="supplyName" label="申请厂商" align="center"></el-table-column>
            <el-table-column prop="departName" label="所属事业部" align="center"></el-table-column>
            <el-table-column prop="nums" label="数量" align="center"></el-table-column>
             <el-table-column width="150" prop="applyStartDateStr" label="申请时间" align="center">
               <!-- <template slot-scope="scope">
                  <div>{{scope.row.applyStartDateStr | fomatDate('yyyy-MM-dd HH:mm')}}</div>
                </template> -->
             </el-table-column>
            <el-table-column prop="applyUserName" label="申请人" align="center"></el-table-column>
            <el-table-column prop="createTime"  width="150" label="创建时间" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.createTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="acount" label="申请人手机号" align="center"></el-table-column>
            <el-table-column prop="auditTime" label="处理时间" align="center"></el-table-column>
            <el-table-column  label="状态" align="left">
              <template slot-scope="scope">
                <div>
                    <span :class="[{darkgray: scope.row.status === 0},{green: scope.row.status === 1},{yellow: scope.row.status === 2}, 'commerStyle']">
                    </span>
                    <span style="margin-left: 3px;" v-if="scope.row.status === 0">{{'待审核'}}</span>
                    <span style="margin-left: 3px;" v-if="scope.row.status === 1">{{'审核通过'}}</span>
                    <span style="margin-left: 3px;" v-if="scope.row.status === 2">{{'拒绝'}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <span class="operate" @click="toInfo(scope.row)" v-authority="'b1_preApplyGetTag'">详情</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fenye">
            <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="total">
            </el-pagination>
        </div>
        <mine-dialog :dialogFormVisible='flag' :width='width' :modalFlag="modalFlag" @close="close"  :title="title" :showClose="showClose">
          <info @close="close" slot="option" :preApplyInfoId="preApplyInfoId" @requestTable="requestList"></info>
        </mine-dialog>
    </div>
</template>
<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/system/system.js';
import mineDialog from '@/modules/index/components/mine-dialog';
import info from './info';
import moment from 'moment';
export default {
  components: {
    conHeader,
    mineDialog,
    info
  },
  data () {
    return {
      width: '70%',
      loading: false,
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '详情',
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        supplyId: '',
        time: [],
        applyStartTime: '',
        applyEndTime: ''
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      preApplyInfoId: '',
      applyList: []
    };
  },
  created () {
    this.getList(true);
    this.getApply();
  },
  methods: {
    // 获取模组厂商下拉列表
    getApply () {
      API.getSupplyList()
      .then(res => {
        if (res.code === 0) {
          this.applyList = res.result;
        } else {
          this.applyList = [];
        }
      })
      .catch(() => {
        this.applyList = [];
      });
    },
    eidtPreApplication () {
      this.$router.push({name: 'eidtPreApplication'});
    },
    handleCurrentChange(val) {
      this.getList(false);
    },
    requestList () {
      this.getList(false);
    },
    // 给请求回来的表格数据新增index属性（序号）
    initTableData (val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = ((this.currentPage - 1) * this.pageSize) + i + 1;
      }
      return val;
    },
    renderIndex (h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    // 打开详情弹框
    toInfo (val) {
      this.flag = true;
      this.preApplyInfoId = val.id;
    },
    // 弹框关闭
    close (val) {
      this.flag = val;
      this.preApplyInfoId = '';
    },
    getList (flag) {
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.applyStartTime = format(this.formInline.time[0], 'yyyy-MM-dd HH:mm:ss');
        this.formInline.applyEndTime = moment(this.formInline.time[1]).format('YYYY-MM-DD 23:59:59');
      } else {
        this.formInline.applyStartTime = '';
        this.formInline.applyEndTime = '';
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
      API.getLicPreApplyList(params)
      .then(res => {
        console.log(res, '获取预申请列表');
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
    clear () {
      restData(this.formInline);
      this.getList(true);
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

<style lang="less" scoped>
.preApplicationManagement-warp{
    .applicationManagement-row {
    .btn-select-right{

    }
    display: flex;
    justify-content: flex-end;
    /* border-bottom: 1px solid #eee; */
    border-bottom: 1px solid #dedfe5;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  .mip-check{
    margin-top: 24px;
  }
    .commerStyle{
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-bottom: 2px;
    }
   .fenye{
    text-align: right;
    margin-top: 16px;
   }
    .green{
      // background-color:green;
      background-color: #3DC930;
    }
    .darkgray{
      background-color:darkgray;
    }
    .blue{
      background-color:blue;
    }
    .yellow{
      background-color:yellow;
    }
  .el-input{
    width: 230px;
  }
  .btn-select{
    // text-align: right;
    margin-top: 24px;
  }
  .btn-select-right{
    // text-align: right;
    margin-left: 760px;
    // margin-top: 24px;
  }
  .table-breadcrumb{
    margin-top: 24px;
    td {
      .operate{
        padding: 0 2px;
      }
      .operate:hover{
        cursor: pointer;
        color: #5667FF;
      }
    }
  }
}
</style>
