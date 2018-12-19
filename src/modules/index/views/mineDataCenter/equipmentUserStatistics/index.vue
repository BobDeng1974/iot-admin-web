<template>
  <div class="equipment-user-statistics-application-warp">
    <div class="title-mip">
      <con-header :title-icon="addProductsIcon" title="产品数据统计" :hasBottomBorder="true"></con-header>
    </div>
    <!-- 查询部分 -->
    <div class="mip-check">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="开发组">
              <el-select v-model="formInline.groupId" placeholder="请选择" >
                <el-option v-for="item in deparmentList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品类">
              <el-select v-model="formInline.applianceType" placeholder="请选择" @change="applianChange" clearable>
                <el-option v-for="item in applianList" :key="item.id" :label="item.nameZh" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="型号码">
              <el-select v-model="sn8" placeholder="请选择" multiple>
                <el-option v-for="item in sn8List" :key="item.id" :label="item.sn8" :value="item.sn8">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间">
              <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地区">
              <v-distpicker :province="formInline.provinces" hide-area :city="formInline.cities"  @province='one' @city="two"></v-distpicker>
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
        <el-table-column prop="nickName"  label="时间" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.nickName | fomatDate('yyyy-MM-dd')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="newUsers"  label="新增用户（人）" align="center"></el-table-column>
        <el-table-column prop="activeDevices"  label="联网总数" align="center"></el-table-column>
        <el-table-column prop="newDevices"  label="新增联网" align="center"></el-table-column>
        <el-table-column prop="newActives"  label="新增激活" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
              <span @click="toUserList(scope.row)" >用户明细</span>
              <span style="color: #DEDFE5;">|</span>
              <span @click="toEquipmentList(scope.row)">设备明细</span>
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
import VDistpicker from 'v-distpicker';
export default {
  components: {
    conHeader,
    VDistpicker
  },
  mixins: [dictMixin],
  data() {
    return {
      loading: false,
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        typeCode: '',
        groupId: '',
        applianceType: '',
        time: [],
        endTime: '',
        startTime: '',
        provinces: '',
        cities: ''
      },
      sn8: [],
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
    toUserList(val) {
      this.$router.push({name: '用户明细'});
    },
    toEquipmentList(val) {
      this.$router.push({name: '设备明细'});
    },
    initAddres(val) {
      if (val.value === '省' || val.value === '市' || val.value === '区') {
        return '';
      } else {
        return val.value;
      }
    },
    one(val) {
      this.formInline.provinces = this.initAddres(val);
    },
    two(val) {
      this.formInline.cities = this.initAddres(val);
    },
    // 获取所有下拉字典
    getDict() {
      this.getAlldeparment();
      this.getApplianList();
      this.getApply();
    },
    applianChange(val) {
      this.sn8 = [];
      this.formInline.typeCode = '';
      if (val) {
        this.getSn8List(val);
      } else {
        this.sn8List = [];
      }
    },
    handleCurrentChange(val) {
      this.getList(false);
    },
    getList(flag) {
      // 时间处理
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.startTime = format(
          this.formInline.time[0],
          'yyyy-MM-dd HH:mm:ss'
        );
        this.formInline.endTime = moment(this.formInline.time[1]).format(
          'YYYY-MM-DD 23:59:59'
        );
      } else {
        this.formInline.startTime = '';
        this.formInline.endTime = '';
      }
      // 新号码处理
      if (this.sn8.length) {
        this.formInline.typeCode = this.sn8.join(',');
        // for (var i = 0; i < this.sn8.length; i++) {
        //   this.formInline.typeCode += this.sn8[i];
        // }
      }
      if (flag) {
        this.currentPage = 1;
      }
      this.loading = true;
      const params = {
        ...this.formInline,
        curPage: this.currentPage,
        pageSize: this.pageSize
      };
      API.getStatisticsInfo(params)
        .then(res => {
          console.log(res, '获取列表');
          this.loading = false;
          if (res.code === 0) {
            this.total = res.result ? res.result.total : 0;
            this.tableData = res.result
              ? res.result.data
              : [];
          } else {
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(() => {
          this.tableData = [{newActives: 1}];
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
    }
  }
};
</script>

<style lang="less" scoped>
.equipment-user-statistics-application-warp {
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
