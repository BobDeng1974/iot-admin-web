<template>
  <div class="hardware-application-totle-list-warp">
    <div class="title-mip">
      <con-header :title-icon="addProductsIcon" title="硬件申请列表" :hasBottomBorder="true"></con-header>
    </div>
    <!-- 查询部分 -->
    <div class="mip-check">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select v-model="formInline.departmentId" placeholder="请选择" @change="departMentChange" clearable>
                <el-option v-for="item in deparmentList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品类">
              <el-select v-model="formInline.applianTypeId" placeholder="请选择" @change="applianChange" clearable>
                <el-option v-for="item in applianList" :key="item.id" :label="item.nameZh" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="型号码">
              <el-select v-model="formInline.sn8" placeholder="请选择" clearable>
                <el-option v-for="item in sn8List" :key="item.id" :label="item.sn8" :value="item.sn8">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-row class="applicationManagement-row" style="display: flex; justify-content: flex-end;">
          <span class="btn-select-right">
            <el-button type="primary" @click="getList(true)">查 找</el-button>
            <el-button @click="clear">清 除</el-button>
          </span>
        </el-row>
      </div>
    </div>
    <!-- 表格部分 -->
    <div class="table-breadcrumb" v-loading="loading">
      <el-table :data="tableData" style="width: 100%" class='table'>
        <el-table-column prop="index"  align="center" :render-header="renderIndex"></el-table-column>
        <el-table-column prop="applianceType"  label="品类" align="center"></el-table-column>
        <el-table-column prop="sn8"  label="型号码" align="center"></el-table-column>
        <el-table-column prop="departmentName"  label="所属事业部" align="center"></el-table-column>
        <el-table-column prop="cName"  label="创建人" align="center"></el-table-column>
        <el-table-column prop="applyTime"  label="创建时间" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.applyTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="状态" align="center">
          <template slot-scope="scope">
            <div>
                <span :class="[{green: scope.row.publicStatus === 10},{darkgray: scope.row.publicStatus === 20},{blue: scope.row.publicStatus === 31},{yellow: scope.row.publicStatus === 41}, 'commerStyle']">
                </span>
                <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 10">{{'待审核'}}</span>
                <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 20">{{'待开发'}}</span>
                <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 31">{{'申请试产中'}}</span>
                <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 41">{{'申请上线中'}}</span>
                <!-- <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 5">{{'开发完成'}}</span> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import moment from 'moment';
export default {
  components: {
    conHeader
  },
  mixins: [dictMixin],
  data() {
    return {
      loading: false,
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        sn8: '',
        supplyId: '',
        departmentId: '',
        applianTypeId: '',
        time: [],
        applyEndTime: '',
        applyStartTime: ''
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
    this.getList(true);
  },
  methods: {
    // 获取所有下拉字典
    getDict() {
      this.getAlldeparment();
      // this.getApplianList();
    },
    // 三级联动
    departMentChange (val) {
      this.formInline.sn8 = '';
      this.formInline.applianTypeId = '';
      if (val) {
        this.getApplianListAsDpartId(val);
      } else {
        this.applianList = [];
        this.sn8List = [];
      }
    },
    applianChange(val) {
      this.formInline.sn8 = '';
      if (val) {
        this.getSn8List(val);
      } else {
        this.sn8List = [];
      }
    },
    eidtApplication() {
      this.$router.push({ name: 'eidtApplication' });
    },
    requestList() {
      this.getList(false);
    },
    handleCurrentChange(val) {
      this.getList(false);
    },
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
        pageSize: this.pageSize
      };
      API.getHardwareListInfo(params)
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
      this.applianList = [];
      this.sn8List = [];
      this.getList(true);
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

<style lang="less" scoped>
.hardware-application-totle-list-warp {
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

