<template>
  <div class="applicationManagement-warp">
    <div class="title-mip">
      <con-header :title-icon="addProductsIcon" title="liences列表" :hasBottomBorder="true"></con-header>
    </div>
    <!-- 查询部分 -->
    <div class="mip-check">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="模组厂商">
              <el-select  v-model="formInline.supplyId" placeholder="请选择" clearable>
                <el-option v-for="item in applyList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select filterable @change="deparmentListChange" v-model="formInline.departId" placeholder="请选择" clearable>
                <el-option v-for="item in deparmentList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品类">
              <el-select filterable v-model="formInline.applianceType" placeholder="请选择" @change="applianChange" clearable>
                <el-option v-for="item in applianList" :key="item.id" :label="item.nameZh" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="型号码">
              <el-select filterable v-model="formInline.sn8" placeholder="请选择" clearable>
                <el-option v-for="item in sn8List" :key="item.id" :label="item.sn8" :value="item.sn8">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="formInline.status1" placeholder="请选择" clearable>
                <el-option v-for="item in statusList" :key="item.status" :label="item.statusLabel" :value="item.status">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请时间">
              <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>

        <el-row class="applicationManagement-row" style="display: flex; justify-content: flex-end;">
          <span class="btn-select-right" v-authority="'b1_applyListTag'">
            <el-button type="primary" @click="getList(true)">筛 选</el-button>
            <el-button @click="clear">清 除</el-button>
          </span>
        </el-row>
        <el-row>
          <span class="btn-select">
            <el-button type="primary" @click="eidtApplication" v-authority="'b1_doApplyTag'">新增申请</el-button>
          </span>
        </el-row>

      </div>
    </div>
    <!-- 表格部分 -->
    <div class="table-breadcrumb" v-loading="loading">
      <el-table :data="tableData" style="width: 100%" class='table'>
        <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
        <el-table-column prop="supplyName" width="150" label="申请厂商" align="center"></el-table-column>
        <el-table-column prop="preApplyId" width="150" label="对应预申请单" align="center"></el-table-column>
        <el-table-column prop="departName" width="150" label="所属事业部" align="center"></el-table-column>
        <el-table-column prop="applianceType" width="150" label="品类" align="center"></el-table-column>
        <el-table-column prop="sn8" width="150" label="型号码" align="center"></el-table-column>
        <el-table-column prop="nums" width="150" label="申请数量" align="center"></el-table-column>
        <!-- <el-table-column prop="type" width="150" label="申请类型" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.type === 0 ? 'license' : 'mac'}}</div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="sdkName" width="150" label="SDK名称" align="center"></el-table-column> -->
        <!-- <el-table-column prop="chipShow" width="150" label="芯片厂商" align="center"></el-table-column> -->
        <el-table-column prop="applyTime" width="150" label="申请时间" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.applyTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="applyUserName" width="150" label="处理人" align="center"></el-table-column>
        <el-table-column label="状态" width="150" align="left">
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
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <span class="operate" @click="toInfo(scope.row)" v-authority="'b1_applyGetTag'">详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <mine-dialog :dialogFormVisible='flag' :width='width' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
      <info slot="option" :applyInfoId="applyInfoId" @close="close" @requestTable="requestList"></info>
    </mine-dialog>
  </div>
</template>
<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/system/system.js';
import mineDialog from '@/modules/index/components/mine-dialog';
import info from './info';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import moment from 'moment';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
export default {
  components: {
    conHeader,
    mineDialog,
    info
  },
  mixins: [dictMixin, dropDownTranslation],
  data() {
    return {
      statusList: [
        { statusLabel: '待审核', status: 0 },
        { statusLabel: '审核通过', status: 1 },
        { statusLabel: '拒绝', status: 2 }
      ],
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
        sn8: '',
        supplyId: '',
        departId: '',
        applianceType: '',
        time: [],
        applyEndTime: '',
        applyStartTime: '',
        status1: ''
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      applyInfoId: 1
    };
  },
  created() {
    this.getDict();
    this.getChipBrandJson();
    this.getList(true);
  },
  methods: {
        // 三级联动
    deparmentListChange(val) {
      this.formInline.applianceType = '';
      this.sn8List = [];
      this.formInline.sn8 = '';
      if (val) {
        this.getApplianList(val);
      } else {
        // this.deparmentList = [];
      }
    },
    applianChange(val) {
      this.formInline.sn8 = '';
      if (val) {
        this.getSn8List(val);
      } else {
        // this.sn8List = [];
      }
    },
    // 获取所有下拉字典
    getDict() {
      this.getAlldeparment();
      // this.getApplianList();
      this.getApply();
    },
    // applianChange(val) {
    //   this.formInline.sn8 = '';
    //   if (val) {
    //     this.getSn8List(val);
    //   } else {
    //     this.sn8List = [];
    //   }
    // },
    eidtApplication() {
      this.$router.push({ name: 'eidtApplication' });
    },
    requestList() {
      this.getList(false);
    },
    handleCurrentChange(val) {
      this.getList(false);
    },
    // 翻译芯片厂商
    fetchChipBrand(val) {
      var str = '';
      for (var i = 0; i < this.chipBrandList.length; i++) {
        if (Number(val) === this.chipBrandList[i].id) {
          str = this.chipBrandList[i].name;
        }
      }
      return str;
    },
    // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
        val[i].chipShow = this.fetchChipBrand(val[i].chip);
      }
      return val;
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    // 打开详情弹框
    toInfo(val) {
      this.flag = true;
      this.applyInfoId = val.id;
    },
    // 弹框关闭
    close(val) {
      this.flag = val;
      this.applyInfoId = '';
    },
    getList(flag) {
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.applyStartTime = format(
          this.formInline.time[0],
          'yyyy-MM-dd HH:mm:ss'
        );
        this.formInline.applyEndTime = moment(this.formInline.time[1]).format(
          'YYYY-MM-DD 23:59:59'
        );
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
        pageSize: this.pageSize,
        status:
          this.formInline.status1 || this.formInline.status1 === 0
            ? this.formInline.status1
            : 9999
      };
      API.getLicApplyList(params)
        .then(res => {
          console.log(res, '获取列表');
          this.loading = false;
          if (res.code === 0) {
            this.total = res.result ? res.result.total : 0;
            this.tableData = res.result
              ? this.initTableData(res.result.data)
              : [];
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
    clear() {
      restData(this.formInline);
      this.getList(true);
    }
  },
  filters: {
    fomatDate(val, type) {
      if (!val) return '';
      return format(val, type);
    },
    fomatType(val) {
      if (!val) return '';
      return val === 0 ? 'license' : 'mac';
    }
  }
};
</script>

<style lang="less" scoped>
.applicationManagement-warp {
  .mip-check {
    margin-top: 24px;
  }
  .commerStyle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-bottom: 2px;
  }
  .fenye {
    text-align: right;
    margin-top: 16px;
  }
  .green {
    background-color: green;
  }
  .darkgray {
    background-color: darkgray;
  }
  .blue {
    background-color: blue;
  }
  .yellow {
    background-color: yellow;
  }
  .el-input {
    width: 230px;
  }
  .btn-select {
    // text-align: right;
    margin-top: 24px;
  }
  .btn-select-right {
    // text-align: right;
    margin-left: 775px;
    // margin-top: 24px;
  }
  .table-breadcrumb {
    margin-top: 24px;
    td {
      .operate {
        padding: 0 2px;
      }
      .operate:hover {
        cursor: pointer;
        color: #5667ff;
      }
    }
  }
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
}
</style>

